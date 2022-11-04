import React from 'react'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import login from '../img/login.png'
import axios from 'axios';

const DownloadDoc = () => {


  const openFile = async() =>{
    await axios.get(`getshell`);
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
          <h1>Download Document</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Download Document</li>
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
        Akses Download Document dengan menekan tombol di bawah ini :
        </strong>
        </h5>
        </label>
    <br/>
    <br/>
    
    </div>
    <a href='file:///\\FEBRIANAPASONAN\Users\tes'  target='_blank' >tes</a>
    <button type="button" class="btn btn-danger" style={{width:'15%', marginLeft:'40%', alignItems:'center', marginBottom:'1%'}} onClick={openFile}>Download Document</button>
    
    <section class="side-warehouse">
        <div className='notes-warehouse' >
            <h2>Notes</h2>
            <ul className='warehouse-notes' style={{listStyleType:'disc'}}>
  <li className='warehouse-notes'>Hanya bisa dibuka via Intranet</li>
  <li className='warehouse-notes'>Searching by Nodin No di Folder Proses</li>
  <li className='warehouse-notes'>Please DO NOT EDIT folder JUST DOWNLOAD</li>
</ul>

        </div>
            
            <img src={login} style={{width:'30%', float:'right', marginLeft:'40%'}} className="image-warehouse" alt=""/>
        </section>
    </div>
    </div>
    </div>
    </div>
  </section>
</div>
    </div>
  )
}

export default DownloadDoc