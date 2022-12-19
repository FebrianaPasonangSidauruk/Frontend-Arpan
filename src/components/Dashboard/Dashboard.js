import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import {SiReadthedocs} from 'react-icons/si'
import {FaShareAlt, FaBalanceScale} from 'react-icons/fa'
import PieChart from '../Chart/PieChart';
import LineChart from '../Chart/LineChart';
import './Dashboard.css'
import axios from 'axios';

const Dashboard = () => {
  const [rfs, setRfs] = useState(0);
  const [rfi, setRfi] = useState(0);
  const [rfc, setRfc] = useState(0);
  const [itr, setItr] = useState(0);

  //pie chart
  const [data, setData]= useState({
    datasets:[{
      data: [10, 20, 30, 40],
      backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
    },
  ],
  labels: ['Prepaid', 'Digital & VAS', 'BuASI', 'POINTER']
  });

  //Line Chart
  const [linedata, setLinedata]= useState({
    datasets:[
      {
      label:'2021',
      data: [21, 35, 45, 51, 46, 49, 56, 53, 68, 75, 63, 52],
      fill: false, 
      backgroundColor: '#f56954',
      borderColor: '#f56954' 
    },
    {
      label: '2022',
      data: [51, 69, 63, 57, 63, 71, 54, 59, 46, 60, 52, 78],
      fill: false, 
      backgroundColor: '#00a65a',
      borderColor: '#00a65a' 
    }
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  });

  
  useEffect(()=>{
    fetchData();
  }, [])
  useEffect(()=>{
    dboardtop();
  }, [])
  useEffect(()=>{
    linechart();
  }, [])


  //line chart
  const linechart = () =>{
    axios.get(`linechartdashboard`).then(res =>{
      const resp = res.data;
      return resp
    }).then((resp)=>{
      // console.log("resp line chart", resp)
      const datas = [];
      let datasTemp = [];
      for(var i of resp) {
        for(var [index, j] of Object.values(i).entries()){
          console.log('index', index)
          if(index === 12) continue;
          
          datasTemp.push(j)
          console.log('j' + j);
        }
        datas.push(datasTemp);
        datasTemp = [];
      }

      const labelis =[];
      for(var i of resp) {
          labelis.push(i.year)
      }

      if (typeof(labelis[1]) == "undefined"){
        labelis[1] = '2021'
      }

      console.log("dataa", datas);
      setLinedata(
        {
          datasets:[
            {
            label:labelis[1],
            data: datas[1],
            fill: false, 
            backgroundColor: '#f56954',
            borderColor: '#f56954' 
          },
          {
            label: labelis[0],
            data: datas[0],
            fill: false, 
            backgroundColor: '#00a65a',
            borderColor: '#00a65a'
          }
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        })

        }).catch(err => {
        console.log("error", err)
      })
    }

    //pie chart
  const fetchData = () =>  {
    axios.get(`piechartdashboard`).then(res => {
      const resp = res.data;
      return resp
    }).then((resp) => {
      console.log("resss", resp)
      const datas = [];
      for(var i of resp) {
          datas.push(i.value)
      }
      setData(
        {
          datasets: [{
              data:datas,
              backgroundColor:[
                '#f56954', '#00a65a', '#f39c12', '#00c0ef'
              ]
          },
        ],
        labels:['Prepaid', 'Digital & VAS', 'BuASI', 'POINTER'], 
      }
      )
      setChartDataPie(data)
      console.log(data)

    }).catch(e => {
      console.log("error", e)
    }) 
  }

  // dashboard rfs, rfi, rfc, itr
  const dboardtop = async () =>{
    const response = await axios.get(`getdboardtop`);
    setRfs(response.data.rfs);
    setRfi(response.data.rfi);
    setRfc(response.data.rfc);
    setItr(response.data.itr);
    console.log(response)
  }

  const [chartDataPie, setChartDataPie] = useState(data)
  console.log('data pie chart', chartDataPie)

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
              <h3>{rfs}</h3>
              <p>RFS</p>
            </div>
            <div className="icon">
              <i className="ion"><SiReadthedocs/> </i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>{rfi}</h3>
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
              <h3>{rfc}</h3>
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
              <h3>{itr}</h3>
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
            <h3 className="card-title">Request Statistics per Division</h3>

          </div>
          <div className="card-body-table">
              <PieChart chartDataPie ={data}/>
          </div>
        </div>
        
        </div>
        <div className="col-md-6">
        <div className="card card-danger">
        <div className="card-header">
          <h3 className="card-title">All Requests YoY</h3>
        </div>
        <div className="card-body">
              <LineChart chartData={linedata}/>
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