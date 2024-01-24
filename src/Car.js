import React, { useState, useEffect } from "react";
import Cer from './car.png';
import './Car.css';
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios'

function Car() {
  const [table, setTable] = useState(Array.from({ length: 10 }, () => Array(4).fill(null)));
  const [curpos, setCurpos] = useState(2);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState('');
  const [hpbar,setHpbar]=useState(100);
  const [empnot,setEmpnot]=useState(1)
  const [start,setStart]=useState(false)
  const [end,setEnd]=useState("")
  const [users,setUsers]=useState([])
  const location = useLocation();
  const name = location.state ? location.state.name : "";

  const generateNumbers = (rowIndex) => {
    const newRow = Array(4).fill(null);
  
    if (rowIndex % 2 === 0) {
      for (let i = 0; i < 4; i++) {
        newRow[i] = Math.floor(Math.random() * 9) + 1;
      }
    }
    setTable((prevTable) => {
      const updatedTable = [...prevTable];
        if (rowIndex >= 1 && isEmpty(prevTable[rowIndex - 1])) {
        updatedTable[rowIndex - 1] = Array(4).fill(null);
      }
  
      updatedTable[rowIndex] = newRow;
      return updatedTable;
    });
  };

  const navigate=useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:3001/MScore").then((response)=>{
      const sortedUsers = response.data.sort((a, b) => b.carscore - a.carscore);
      setUsers(sortedUsers);    })  
  },[end])
  useEffect(()=>{
    if(hpbar<=0){
      setStart(false)
      setEnd("Game ended! Score:"+score+" HP:0")
      let isN=users.some(user => user.name === name);

      axios.post("http://localhost:3001/CarGame",{
        name:name,
        score:score,
        upd:isN,
      }).then(()=>{
        console.log("success");
      })
      setHpbar(100)
      setScore(0)
    }
  },[hpbar,start])
 
  
  useEffect(() => {
    const tab = [...table];
    tab[9][curpos] = <img src={Cer} alt="Car" className="carimg" />;
    setTable(tab);
  }, [curpos, direction]);


  const handleMove = () => {
    setScore(score + 1);
    if (empnot===1){
      const newRow = Array(4).fill(null);
      for (let i = 0; i < 4; i++) {
        newRow[i] = Math.floor(Math.random() * 9) + 1;
      }
      newRow[Math.floor(Math.random() * 4)]=null;
      setTable((prevTable) => [newRow, ...prevTable.slice(0, -1)]);
    } if ( isEmpty(table[0])) {
      setTable((prevTable) => [
        [...Array(4).fill(null)], 
        ...prevTable.slice(0, -1),
      ]);
    }
  };
  
  const isEmpty = (row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== null && row[i] !== "") {
        return false;
      }
    }
    return true;
  };

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
    <div style={{display:"flex",flexDirection:"row",width:"100%",margin:"auto"}}>
   <div className="flex-container"><div style={{display:"flex",flexDirection:"column"}}>
    <div className="flexer">
<div className='leftbut' style={{disabled:start===false?true:false,opacity:start===false?0.5:1}} onClick={() => {
                        if (start===false){
                          return
                        }
                        else{
                          if (curpos>=1){
                  setCurpos(curpos-1)
                  if (curpos > 0) {
                    setCurpos(curpos - 1);
                    setDirection('L');
                    handleMove();
                    const numberRegex = /^[0-9]+$/;
                    if (numberRegex.test(table[7][curpos-1])){
                      setHpbar(hpbar-parseInt(table[7][curpos-1]))
                    }
                  }
                }
                else{
                  setScore(score+1)
                  const newRow = Array(4).fill(null);
                  let carRow = Array(4).fill(null);
                  if (!(isEmpty(table[7]))){
                    carRow=table[7]
                    if (table[7][curpos]!==null){
                    setHpbar(hpbar-parseInt(table[7][curpos]))}
                  }
                  carRow[curpos] = <img src={Cer} alt="Car" className="carimg" />;
                  for (let i = 0; i < 4; i++) {
                    newRow[i] = Math.floor(Math.random() * 9) + 1;
                  }
                  newRow[Math.floor(Math.random() * 4)]=null;

                  setTable((prevTable) => [newRow, ...prevTable.slice(0, -2),carRow]);
                  setTable((prevTable) => [
                    [...Array(4).fill(null)], 
                    ...prevTable.slice(0, -2),carRow
                  ]);}
                }

      }}>L</div>
      <table  style={{disabled:start===false?true:false,opacity:start===false?0.5:1,textAlign:"center"}} className="tables">
        <tbody>
          {table.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <td className={typeof col === 'number' ? 'car' : ''}
                key={j} style={{ border: "none", padding: "10px",paddingLeft:"20px"}}>
                  {col}
                </td>
              ))}
            </tr>
          ))}
          <tr><td colSpan={2}>score:{score}</td><td colSpan={2}>HP: {hpbar}</td></tr>
        </tbody>
      </table>
 
      <div className='rightbut' style={{disabled:start===false?true:false,opacity:start===false?0.5:1}} onClick={() => {
        if (start===false){
          return
        }
        else{
        if (curpos<=2){
          setCurpos(curpos+1)
          setDirection('R');
          handleMove();
          const numberRegex = /^[0-9]+$/;
          if (numberRegex.test(table[7][curpos+1])){
            setHpbar(hpbar-parseInt(table[7][curpos+1]))
          }
        }
        else{
          setScore(score+1)
          const newRow = Array(4).fill(null);
          let carRow = Array(4).fill(null);
          if (!(isEmpty(table[7]))){
            carRow=table[7]
            if (table[7][curpos]!==null){
            setHpbar(hpbar-parseInt(table[7][curpos]))}
          }

          carRow[curpos] = <img src={Cer} alt="Car" className="carimg"/>;
          for (let i = 0; i < 4; i++) {
            newRow[i] = Math.floor(Math.random() * 9) + 1;
          }
          newRow[Math.floor(Math.random() * 4)]=null;
          setTable((prevTable) => [newRow, ...prevTable.slice(0, -2),carRow]);
          setTable((prevTable) => [
            [...Array(4).fill(null)], 
            ...prevTable.slice(0, -2),carRow
          ]);}

        }


      }}>R</div>

    </div>
     <div className="startbut" onClick={()=>{
      setStart(!start)
      setEnd("")
     }}>Start</div></div></div>
     
     <table className="table2">
     <tbody>
       {users.slice(0, 10).map((user, index) => (
         <tr key={index}>
           <td>{`${user.name}:${user.carscore}`}</td>
         </tr>
       ))}
     </tbody>
   </table></div>
   <div className="end">{end} <div className="retrn" onClick={()=>navigate("/LandingPage",{state:{name}})} style={{display:end?"block":"none"}}> Go Back To Landing Page</div></div> </div>
  );
}

export default Car;
