
import React, { useState, useEffect } from "react";
import { motion,useInView } from "framer-motion"
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import './Login.css';


function Register() {
  const navigate=useNavigate()
  const [name,setName]=useState("")
const [pass,setPass]=useState("")
const [err,setErr]=useState("")
const [users,setUsers]=useState([])
const [nmchk,setNmchk]=useState("")
const [pschk,setPschk]=useState("")


const addInfo = () =>{
  axios.post("http://localhost:3001/Register",{
    name:name,
    pass:pass,
  }).then(()=>{
    console.log("success");
  })
}
useEffect(() =>{
  axios.get("http://localhost:3001/login").then((response)=>{
  setUsers(response.data) 


 if (response.data.some(ob=>ob.name===name)){
  setNmchk("Name already exists.")
 }
 else{
  setNmchk("")
 }
 if(response.data.some(ob=>ob.password===pass)){
  setPschk("password already exists.")
}
else{
  setPschk("")
}
})
},[name,pass])

const checkInfo =(event)=>{
  event.preventDefault();
  if (name.length<2 || /[^a-zA-Z0-9]/.test(name)){
    setErr("Name Cannot be shorter than 2 characters and cannot include special characters.")
  }
  else if(pass.length<5 || pass.includes(" ")){
    setErr("Pass Cannot include spaces and needs to be longer than 5 characters.")
  }
  else{
    addInfo();
    navigate("/LandingPage",{state:{name}});
  }
}
  return (
    <div className="grid-container">
    <div className="login-container">
    <div className='logbox'>
      <span className="log">Register:</span>
      <form className="login-form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => { setName(event.target.value) }}
        />{nmchk}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={pass}
          onChange={(event) => { setPass(event.target.value) }}
        />{pschk}
        <input type="submit" className="continue" onClick={(event)=>checkInfo(event)} value="Continue" />
      </form>
      <p className="register-link">
    Already Got An Account? <a onClick={() => { navigate('/Login') }}>Click here to Login.</a>
  </p>
      {err && <div className="error-box">{err}</div>}
    </div></div>  
    </div>

/*
<div className="grid-container">
<div className="login-container">
<div className='logbox'>
  <span className="log">Login:</span>
  <form className="login-form">
    <label htmlFor="name">Name</label>
    <input
      id="name"
      type="text"
      value={name}
      onChange={(event) => { setName(event.target.value) }}
    />
    <label htmlFor="password">Password</label>
    <input
      id="password"
      type="password"
      value={pass}
      onChange={(event) => { setPass(event.target.value) }}
    />
    <div className="continue" onClick={checkInfo}>Continue</div>
  </form>
  <p className="register-link">
    Don't have an account? <a onClick={() => { navigate('/Register') }}>Click here to register.</a>
  </p>
  {err && <div className="error-box">{err}</div>}
</div></div></div>

*/
  );
}
export default Register;
