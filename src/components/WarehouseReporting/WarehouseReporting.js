import React, {Component} from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import login from '../img/login.png'
import axios from 'axios';

class WarehouseReporting extends Component{

   openFile = async() =>{
    await axios.get(`getshell`);
  }

  state = {
    selectedFile: null,
    filename: ''
}


fileSelectedHandler = (event) => {
  let file = event.target.files[0].name;
  this.setState({
      selectedFile: event.target.files[0],
      filename: document.getElementById('file').value
  })
  console.log(file);
}

fileUploadHandler = (event) => {

  event.preventDefault();

  let formData = new FormData();

  formData.append('filename', this.state.filename);
  formData.append('file', this.state.selectedFile);

  const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }

  axios.post(`upload`, formData, config)
  .then (res => {
      console.log(res.data);
      console.log(this.state.filename);
      console.log(formData);
  })
}

  render(){
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
    <button type="button" class="btn btn-danger" style={{width:'15%', marginLeft:'1%', alignItems:'center', marginBottom:'1%', marginTop:'-2%'}} onClick={this.openFile}>Download Document</button>
    
    
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

        {/* upload file */}

        <div>
        <label className="col-sm-10 col-form-label" style={{marginLeft:'1%'}}>
        <h5><strong>
        Import/Update Data :
        </strong>
        </h5>
        </label>

          <form className='updatedata' style={{backgroundColor:'white'}} encType="multipart/form">
          <input style={{ width:'30%', marginLeft:'1%', backgroundColor:'white'}}
                        type="file" 
                        name="file" 
                        id="file" 
                        placeholder="Upload your file" 
                        onChange={this.fileSelectedHandler}
                    />
                    <br></br>
                     <button className="btn btn-danger" style={{marginLeft:'5.5%', width:'7%', marginBottom:'1%'}} type="submit" onClick={this.fileUploadHandler}>Update</button>
          </form>
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
}

export default WarehouseReporting