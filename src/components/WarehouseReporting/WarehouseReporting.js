import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import login from '../img/login.png'

const WarehouseReporting = () => {
  return (
    <div>
        <Header/>
      <Sidebar/>
      <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Warehouse Reporting</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Warehouse Reporting</li>
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
    <br/>
    <br/>
    {/* <div className="col-sm-10">
        
        </div> */}
    
    </div>
    <a href='https://bit.ly/DashboardReadinessAndInspection_view' target="_blank">
    <button type="button" class="btn btn-danger" style={{width:'15%', marginLeft:'40%', alignItems:'center', marginBottom:'1%'}}>Warehouse Reporting</button>
    </a>
    <section class="side-warehouse">
        {/* <div className='notes-warehouse'>
            <h2>Notes</h2>
            <ul className='warehouse-notes' style={{listStyleType:'disc'}}>
  <li className='warehouse-notes'>Please do not edit f</li>
  <li className='warehouse-notes'>Tea</li>
  <li className='warehouse-notes'>Milk</li>
</ul>

        </div> */}
            
            <img src={login} style={{width:'30%', float:'right', marginLeft:'60%'}} className="image-warehouse" alt=""/>
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

export default WarehouseReporting