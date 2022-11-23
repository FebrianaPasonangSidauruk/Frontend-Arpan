import React, {Component} from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import login from '../img/login.png'
import axios from 'axios';
import { useState } from 'react';
import ModalMessage from './ModalMessage';

const WarehouseReporting = () => {

  const [file, setFile] = useState();
  const [message, setMessage] = useState('');

   const openFile = async() =>{
    await axios.get(`getshell`);
  }

  function handleChange(event) {
    setFile(event.target.files[0]);
    let filename = event.target.files[0].name;
    console.log(filename);
  }
  const refreshPage = ()=>{
    // window.location.reload();
    // console.log(message)
    setTimeout(function() {
      // Value when user clicked
      
      alert(message);
      window.location.reload();
      // Most recent value
      // alert(messageRef.current);
    }, 2000);
 }

  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(`uploadproject`, formData, config)
    .then (res => {
        console.log(res.data); // message
        console.log(formData);
        setMessage(res.data.message)
        refreshPage();
    })
    // console.log(message)

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
        Akses Download Document dengan menekan tombol di bawah ini :
        </strong>
        </h5>
        </label>
    <br/>
    <br/>
    
    
    {/* <a href='file:///\\FEBRIANAPASONAN\Users\tes'  target='_blank' >tes</a> */}
    <button type="button" class="btn btn-danger" style={{width:'15%', marginLeft:'1%', alignItems:'center', marginBottom:'1%', marginTop:'-2%'}} onClick={openFile}>Download Document</button>
    
    
    <section class="side-warehouse">
        <div className='notes-warehouse' >
            <h2>Notes</h2>
            <ul className='warehouse-notes' style={{listStyleType:'disc'}}>
  <li className='warehouse-notes'>Hanya bisa dibuka via Intranet</li>
  <li className='warehouse-notes'>Searching by Nodin No di Folder Proses</li>
  <li className='warehouse-notes'>Please DO NOT EDIT folder JUST DOWNLOAD</li>
</ul>

        </div>
            
            {/* <img src={login} style={{width:'30%', float:'right', marginLeft:'40%'}} className="image-warehouse" alt=""/> */}
        </section>

        {/* upload file */}

        <div>
        <label className="col-sm-10 col-form-label" style={{marginLeft:'1%'}}>
        <h5><strong>
        Import/Update Data :
        </strong>
        </h5>
        </label>

          <form onSubmit={handleSubmit} className='updatedata' style={{backgroundColor:'white'}} encType="multipart/form">
          <input style={{ width:'30%', marginLeft:'1%', backgroundColor:'white'}}
                        type="file" 
                        name="file" 
                        id="file" 
                        placeholder="Upload your file" 
                        // onChange={this.fileSelectedHandler}
                        onChange={handleChange}
                    />
                    <br></br>
                     <button className="btn btn-danger" style={{marginLeft:'5.5%', width:'7%', marginBottom:'1%'}} type="submit" >Update</button>
                     {/* <div class="modal fade" id="modal-message">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title">Message</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="modal-body">
                            <ModalMessage message = {message}/>
                            </div>
                            </div>

                            </div>

                            </div> */}
          </form>
          {/* <div className='modal-body'>
            <ModalMessage message = {message}/>
          </div> */}
          {/* <p>{message}</p> */}
        </div>
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