import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import {FaCubes, FaUserAlt, FaTools, FaUsersCog} from 'react-icons/fa'
import {HiClipboardList, HiChat, HiDocumentDownload} from 'react-icons/hi'
import {BsListCheck} from 'react-icons/bs'
import {AiOutlineLineChart} from 'react-icons/ai'
import {TbReportAnalytics} from 'react-icons/tb'
import './Sidebar.css'
import logo from '../img/logo-sidebar.png';

const Sidebar = () => {
  const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
 
    useEffect(() => {
      setUserId(localStorage.getItem("id"));
        refreshToken();
        getUsers();
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('token');
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
            const response = await axios.get('token');
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
        const response = await axiosJWT.get('users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

  return (
    <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Link to = '/dashboard'>
    <div className="brand-link">
      <img src={logo} alt="Telkomsel Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-bold">ARPAN-TSEL</span>
    </div>
    </Link>
    <div className="sidebar">
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
            <Link to= '/dashboard' className='nav-link'>
              <i className="nav-icon fas fa-chart-pie" />
              <p>
                Dashboard
              </p>
            </Link>
          </li>
          <li className="nav-item">
          <Link to= '/dashboard/projectList' className='nav-link'>
          <i className="nav-icon fas"><BsListCheck/></i>
                  <p>Project Tracking</p>
                </Link>
          </li>
          {/* <li className="nav-item menu-open">
            <a href='#' className="nav-link">
              <i className="nav-icon fas"><BsListCheck/></i>
              <p>
                Project Tracking
                <i className="fas fa-angle-left right" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
              <Link to= '/projects' className='nav-link'>
                  <i className="far fa-circle nav-icon" />
                  <p>Project List</p>
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Task Assignment</p>
                </a>
              </li>
            </ul>
          </li> */}


          {/* <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon fas"><FaCubes/> </i>
              <p>
                Product List
              </p>
            </a>
          </li> */}

          <li className="nav-item">
            <Link to= '/dashboard/audit' className='nav-link'>
              <i className="nav-icon fas"><HiClipboardList/></i>
              <p>
                Audit
              </p>
            </Link>
          </li>
          <li className="nav-item">
          <Link to= '/dashboard/downloaddoc' className='nav-link'>
          <i className="nav-icon fas"><HiDocumentDownload/></i>
                  <p>Download Document</p>
                </Link>
          </li>
          <li className="nav-item">
          <Link to= '/dashboard/visualization' className='nav-link'>
          <i className="nav-icon fas"><AiOutlineLineChart/></i>
                  <p>Visualization</p>
                </Link>
          </li>
          <li className="nav-item">
          <Link to= '/dashboard/warehouse' className='nav-link'>
          <i className="nav-icon fas"><TbReportAnalytics/></i>
                  <p>Warehouse Reporting</p>
                </Link>
          </li>

          <li className="nav-item">
              {/* <Link to='/profile' className='nav-link'> */}
              <a className='nav-link' href={`/dashboard/profile/${users.id}`}>
              <i className="nav-icon fas" ><FaUserAlt/></i>
              <p>
                User Profile
              </p>
              </a>
              {/* </Link> */}
          </li>

          <li className="nav-item">
            <br/>
            <a className='nav-link'>
            <i className="nav-icon fas" ><FaTools/></i>
              <p>
                Administrator Menu
              </p></a></li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far"><FaUsersCog/> </i>
              <p>
                User Management
              </p>
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link">
              <i className="nav-icon far"><HiChat/> </i>
              <p>
                Feedback/Report
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</div>
  )
}

export default Sidebar