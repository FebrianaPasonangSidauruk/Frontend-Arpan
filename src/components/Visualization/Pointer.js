import React from 'react'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Pointer = () => {
  return (
    <div>
    <Header/>
  <Sidebar/>
  <div className="content-wrapper">
<section className="content-header">
<div className="container-fluid">
  <div className="row mb-2">
    <div className="col-sm-6">
      <h1>Pointer Department</h1>
    </div>
    <div className="col-sm-6">
      <ol className="breadcrumb float-sm-right">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item active">Visualization</li>
        <li className="breadcrumb-item active">Pointer</li>
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

</div>
</div>
</div>
</div>
</section>
</div>
</div>
  )
}

export default Pointer