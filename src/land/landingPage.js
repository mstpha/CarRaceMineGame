import React from 'react';
import './Landreact.css';
import { useNavigate,useLocation } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const location=useLocation();
    const name=location.state.name
    return (
        <div className='mainprt'>
            <div className='leftprt'> <div className='user'>{name}</div>
            <div className='containers1' onClick={()=>navigate("/MineGame",{state:{name}})}></div>
            <div className='min'>Mine Game.</div>
            </div>
            <div className='rightprt'>
            <div onClick={()=>navigate("/Car",{state:{name}})} className='containers2'></div>
            <div className='carr'>Car Game.</div>
        </div>
        </div>
    );
}

export default LandingPage;