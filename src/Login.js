    import React, { useState,useEffect   } from "react";
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import './Login.css';
    import './App.css';

    function Login() {
      const navigate = useNavigate();
      const [name, setName] = useState("");
      const [pass, setPass] = useState("");
      const [err, setErr] = useState("");
      const [users, setUsers] = useState([]);

      const checkInfo = () => {
        axios.get("http://localhost:3001/login").then((response) => {
          setUsers(response.data);

          if (response.data.some(ob => ob.name === name) && response.data.some(ob => ob.password === pass)) {
            navigate("/LandingPage",{state:{name}});
          } else {
            if (name.length === 0) {
              setErr("");
            } else {
              setErr(name + " does not exist, you can try registering an account instead.");
            }
          }
        });
      };
      return (
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
      );
    }

    export default Login;
