import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import ModalMessage from './ModalMessage';

const WarehouseReporting = () => {

  const [file, setFile] = useState();
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
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

  function handleChange(event) {
    setFile(event.target.files[0]);
    let filename = event.target.files[0].name;
    console.log(filename);
  }
  const refreshPage = (data)=>{
    setTimeout(function() {
      
      alert(data);
      window.location.reload();
    }, 2000);
 }

 const refreshPageError = (error)=>{
  setTimeout(function() {
    
    alert(error);
    window.location.reload();
  }, 2000);
}

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try{
      const res = await axios.post(`uploadproject`, formData, config)
      console.log("response data", res.data.message); 
        console.log("form data", formData);
        setMessage(res.data.message)
        refreshPage(res.data.message);
    } catch (error){
      refreshPageError(error);
      console.log(error)
    }
  }

  return (
    <div>
        <Header/>
      <Sidebar/>
      <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Warehouse</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Warehouse</li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section className="content">
    <div className="container-fluid">
    <div className="row">
    <div className="col-12">
    <div className="card">
    <div className="form-group row">
    <label className="col-sm-10 col-form-label" style={{marginLeft:'1%'}}>
        <h5><strong>
        Akses Warehouse Reporting dengan menekan tombol di bawah ini :
        </strong>
        </h5>
        </label>
    
    </div>
    <a href='https://bit.ly/DashboardReadinessAndInspection_view' target="_blank">
    <button type="button" class="btn btn-danger" style={{width:'15%', marginLeft:'1%', alignItems:'center', marginBottom:'1%'}}>Warehouse Reporting</button>
    </a>

    <label className="col-sm-10 col-form-label" style={{marginLeft:'1%'}}>
        <h5><strong>
        Akses Download Document dengan ikuti langkahnya melalui tombol di bawah ini :
        </strong>
        </h5>
        </label>
    <br/>
    <br/>
    
    
    <button type="button" data-toggle="modal" data-target="#modal-message" class="btn btn-danger" style={{width:'15%', marginLeft:'1%', alignItems:'center', marginBottom:'1%', marginTop:'-2%'}}>Download Document</button>
    <div class="modal fade" id="modal-message">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title">Langkah Download Dokumen RFS/RFI/RFC/ITR</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                            <ModalMessage/>
                            </div>
                            </div>

                            </div>

              </div> 
    
    <section class="side-warehouse">
        <div className='notes-warehouse' >

        </div>
            
        </section>

        {/* upload file */}

  {users && (users.role === "quality" || users.role === "admin") && (
    <div>
    <label className="col-sm-10 col-form-label" style={{marginLeft:'1%'}}>
    <h5><strong>
    Import/Update Data :
    </strong>
    </h5>
    </label>

      <form onSubmit={handleSubmit} className='updatedata' style={{backgroundColor:'white'}} encType="multipart/form">
      <input style={{ width:'30%', backgroundColor:'white'}}
                    type="file" 
                    name="file" 
                    id="file" 
                    placeholder="Upload your file" 
                    onChange={handleChange}
                />
                <br></br>
                 <button className="btn btn-danger" style={{marginLeft:'4.5%', width:'7%', marginBottom:'1%'}} type="submit" >Update</button>
                 {/* <p>{message}</p> */}
      </form>
    </div>
  )}
        
    </div>
    </div>
    </div>
    </div>
  </section>
</div>
    </div>
  )
}

export default WarehouseReporting