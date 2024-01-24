import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import './Minegame.css';
import Bom from "./boom.png";
import axios from 'axios'
const MiniGame = () => {
  const navigate=useNavigate();
    const generateEmptyTable = () => {
        const data = [];
        for (let i = 0; i < 9; i++) {
          const row = [];
          for (let j = 0; j < 9; j++) {
            row.push(null);
          }
          data.push(row);
        }
        return data;
      };
    
      const generateRandomData = () => {
        const data = [];
        const bombs=[];
        for (let k=0;k<3;k++){
          bombs.push(Math.floor(Math.random() * 10))
        }
        for (let i = 0; i < 9; i++) {
          const row = [];

          for (let j = 0; j < 9; j++) {
            row.push(Math.floor(Math.random() * 100) + 1);
          }
          for (let k=0;k<3;k++){
            row[Math.floor(Math.random() * 10)]=<img src={Bom}  height="25px" width="25px" />;
          }
          data.push(row);
        }
        return data;
      };
  const [emptyTableData, setEmptyTableData] = useState(generateEmptyTable());
  const [originalTableData,setOriginalTableData] = useState(generateRandomData());
  const [score, setScore] = useState(0);
  const [users,setUsers]=useState([])
  const [clickCount, setClickCount] = useState(0);
  const [end,setEnd]=useState("")
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();
  const name = location.state ? location.state.name : "";
  const handleEmptyTableClick = (row, col) => {
    if (!disabled && emptyTableData[row][col] === null) {
      setClickCount(clickCount + 1);
      const value = originalTableData[row][col];
      if (!(value>0)){
        setClickCount(10)
        setEnd("Game ended! your score is:"+score)
      }
      else{
      setScore(score + value);
      }
      setEmptyTableData((prevData) => {
        const newData = [...prevData];
        newData[row][col] = value;
        return newData;
      });
    }
  };

 useEffect(()=>{
  if(end!==""){
  setDisabled(true)
  console.log(name)
  console.log(users)
  let isN=users.some(user => user.name === name);
  if (isN===true){
    if (users[users.findIndex(user=>user.name===name)].minescore>score){
      isN=false;
    }
  }
  axios.post("http://localhost:3001/MineGame",{
    name:name,
    score:score,
    upd:isN,
  }).then(()=>{
    console.log("success");
  })
  }
 },[end])
useEffect(()=>{
  axios.get("http://localhost:3001/MScore").then((response)=>{
    const sortedUsers = response.data.sort((a, b) => b.minescore - a.minescore);
    setUsers(sortedUsers);  
  })  
},[end])
  return ( 
    <div className="grid-container">
      
    <div style={{display:"flex",flexDirection:"row"}}>
        <div style={{display:"grid",placeItems:"center",marginRight:"5vw"}}>
      <div style={{flexGrow:1,width:"5vw"}} className="score">Score: {score}</div></div>
      <div style={{disabled:disabled===true?"true":"false"}}><div className="nm">{name}</div><table className="mtable">
        <tbody style={{opacity:disabled===true?0.5:1}}>
          {emptyTableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => {
                const isEvenRow = rowIndex % 2 === 0;
                const cellStyle = {
                  backgroundColor: (isEvenRow && colIndex % 2 === 0) || (!isEvenRow && colIndex % 2 !== 0)
                    ? "#FEF8DD"
                    : "#F7D8BA"
                    ,
                    color:"black",
                    alignItems:"center",justifyContent:"center",textAlign:"center",
                };

                return (
                  <td
                    key={colIndex}
                    style={cellStyle}
                    onClick={() => handleEmptyTableClick(rowIndex, colIndex)}
                  >
                    {value !== null ? value : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="start" onClick={()=>{
        setDisabled(false);
        setEmptyTableData(generateEmptyTable())
        setScore(0)
        setOriginalTableData(generateRandomData())
        setEnd("")
      }}>Start</div>
      </div><div className="lb">LeaderBoard:</div> <table className="table2">
        
  <tbody>
    {users.slice(0, 10).map((user, index) => (
      <tr key={index}>
        <td>{`${user.name}:${user.minescore}`}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
   <div className="end">{end} <div className="retrn" onClick={()=>navigate("/LandingPage",{state:{name}})} style={{display:end?"block":"none"}}> Go Back To Landing Page</div></div> </div>
  );
};

export default MiniGame;