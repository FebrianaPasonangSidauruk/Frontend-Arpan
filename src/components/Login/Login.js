import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './Login.css';
import {FaLock, FaUserAlt} from 'react-icons/fa';
import loginPic from '../img/login-left.svg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('loginAccount', {
                username: username,
                password: password
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div className='login-body-container'>
        <section class="side">
            <img src={loginPic} className="image-auth" alt=""/>
        </section>

        <section className="main">
            <p className='telkomsel-login'>Telkomsel</p>
                <div className="login-container">
                    <h1 className='login-title'>ARPAN</h1>
                    <p className="title">Welcome back</p>
                    <div className="separator"></div>
                        <p className="welcome-message">Please, provide login credential to proceed and have access to all our services</p>
                        <p className="welcome-message">{msg}</p>
                            <form onSubmit={Auth} className="login-form">
                                <div className="form-control-login">
                                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                    <i className="fa-user-login"><FaUserAlt/></i>
                                </div>
                                <div class="form-control-login">
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <i className="fa-lock-login"><FaLock/></i>
                                </div>
                                <button className="submit">Login</button>
                            </form>
                </div>
        </section>
    </div>
  )
}

export default Login
