import './App.css';
import React from "react";
import Register from './Register';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Login from './Login.js';
import {motion} from "framer-motion";
import MineGame from './MineGame.js';
import Car from './Car';
import LandingPage from './land/landingPage.js';

function App() {
  return (
    <Router>
     <Routes>
      <Route path={"/"} element={<Login/>}/>
      <Route path={"/Register"} element={<Register/>}/>
      <Route path={"/MineGame"} element={<MineGame/>}/>
      <Route path={"/Car"} element={<Car/>}/>
      <Route path={"/LandingPage"} element={<LandingPage/>}/>
     </Routes>
    </Router>
  );
}

export default App;
