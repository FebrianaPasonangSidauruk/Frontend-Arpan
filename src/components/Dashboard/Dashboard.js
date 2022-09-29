import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {SiReadthedocs} from 'react-icons/si'
import {FaShareAlt, FaBalanceScale} from 'react-icons/fa'
import PieChart from '../Chart/PieChart';
import LineChart from '../Chart/LineChart';
import './Dashboard.css'

const Dashboard = () => {
  const statePie = {
    labels: ['RFS', 'RFI', 'RFC', 'ITR'],
    datasets:[
        {
        data: [7,6,3,5],
        backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
        }
      ]
  }

  const stateLine = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
datasets: [
  {
    label: 'RFS',
    data: [21, 35, 75, 51, 41, 47, 56, 53, 68, 75, 63, 52],
    fill: false, // for Line chart
    backgroundColor: '#f56954',
    borderColor: '#f56954' // for Line chart
  },
  {
    label: 'RFI',
    data: [41, 79, 57, 47, 63, 71, 54, 59, 46, 60, 52, 78],
    fill: false, // for Line chart
    backgroundColor: '#00a65a',
    borderColor: '#00a65a' // for Line chart
  },
  {
    label: 'RFC',
    data: [25, 49, 61, 37, 53, 61, 33, 58, 29, 46, 59, 63],
    fill: false, // for Line chart
    backgroundColor: '#f39c12',
    borderColor: '#f39c12' // for Line chart
  },
  {
    label: 'ITR',
    data: [31, 29, 47, 67, 57, 55, 63, 73, 80, 37, 48, 67],
    fill: false, // for Line chart
    backgroundColor: '#00c0ef',
    borderColor: '#00c0ef' // for Line chart
  }
]
  }

  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>7</h3>
              <p>RFS</p>
            </div>
            <div className="icon">
              <i className="ion"><SiReadthedocs/> </i>
            </div>
            {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              {/* <h3>12<sup style={{fontSize: 20}}>%</sup></h3> */}
              <h3>6</h3>
              <p>RFI</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>3</h3>
              <p>RFC</p>
            </div>
            <div className="icon">
              <i className="ion"><FaShareAlt/> </i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>5</h3>
              <p>ITR</p>
            </div>
            <div className="icon">
              <i className="ion"><FaBalanceScale/></i>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="card card-danger">
          <div className="card-header">
            <h3 className="card-title">Pie Chart</h3>

          </div>
          <div className="card-body-table">
              <PieChart chartData ={statePie}/>
          </div>
        </div>
        
        </div>
        <div className="col-md-6">
        <div className="card card-danger">
        <div className="card-header">
          <h3 className="card-title">Line Chart</h3>
        </div>
        <div className="card-body">
          {/* <div className="chart"> */}
              <LineChart chartData={stateLine}/>
          {/* </div> */}
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

export default Dashboard