import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FiLogOut} from 'react-icons/fi';
import jwt_decode from "jwt-decode";

const Header = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('tokenAccount');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }
 
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('tokenAccount');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getUsers = async () => {
        const response = await axiosJWT.get('userAccount', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }


    const Logout = async () => {
        try {
            await axios.delete('logoutAccount');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


  return (
   <div>
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">Home</a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">

        <li className='nav-item'>
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <p>Hi,{users.name}</p> 
            </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
      <li className="nav-item">
        <button onClick={Logout} className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
        <i className="fas"><FiLogOut/> </i>
        </button>
      </li>
    </ul>
  </nav>
</div>

  )
}

export default Header