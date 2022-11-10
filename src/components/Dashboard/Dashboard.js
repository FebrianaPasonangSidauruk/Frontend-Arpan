import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {SiReadthedocs} from 'react-icons/si'
import {FaShareAlt, FaBalanceScale} from 'react-icons/fa'
import PieChart from '../Chart/PieChart';
import LineChart from '../Chart/LineChart';
import './Dashboard.css'
import axios from 'axios';

const Dashboard = () => {
  const [valueReq, setValueReq] = useState({});
  const [tes, setTes] = useState([]);
  const [rfs, setRfs] = useState(0);
  const [rfi, setRfi] = useState(0);
  const [rfc, setRfc] = useState(0);
  const [itr, setItr] = useState(0);
  // const [chartDataPie, setChartDataPie] = useState({})
  
  // let coba =[]

  const [data, setData]= useState({
    datasets:[{
      data: [10, 20, 30, 40],
      backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
    },
  ],
  labels: ['Prepaid', 'Digital & VAS', 'POINTER', 'BASI']
  });

  //Line Chart
  const [linedata, setLinedata]= useState({
    datasets:[
      {
      label:'2021',
      data: [21, 35, 45, 51, 46, 49, 56, 53, 68, 75, 63, 52],
      fill: false, // for Line chart
      backgroundColor: '#f56954',
      borderColor: '#f56954' // for Line chart
    },
    {
      label: '2022',
      data: [51, 69, 63, 57, 63, 71, 54, 59, 46, 60, 52, 78],
      fill: false, // for Line chart
      backgroundColor: '#00a65a',
      borderColor: '#00a65a' // for Line chart
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


  const linechart = () =>{
    axios.get(`linechartdashboard`).then(res =>{
      const resp = res.data;
      return resp
    }).then((resp)=>{
      console.log("resss line chart", resp)
      const datas = [];
      let index = 0;
      let datasTemp = [];
      for(var i of resp) {
        for(var j of Object.values(i)){
          datasTemp.push(j)
        }
        datas.push(datasTemp);
        datasTemp = [];
        index++;
          // datas.push(i.value)
      }
      console.log("dataa", datas);
      setLinedata(
        {
          datasets:[
            {
            label:'2021',
            data: datas[1],
            fill: false, // for Line chart
            backgroundColor: '#f56954',
            borderColor: '#f56954' // for Line chart
          },
          {
            label: '2022',
            data: datas[0],
            fill: false, // for Line chart
            backgroundColor: '#00a65a',
            borderColor: '#00a65a' // for Line chart
          }
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        })
        // console.log(linedata)

        }).catch(err => {
        console.log("error", err)
      })
    }

  
  


  const fetchData = () =>  {
    axios.get(`piechartdashboard`).then(res => {
      const resp = res.data;
      return resp
    }).then((resp) => {
      console.log("resss", resp)
      const label = [];
      const datas = [];
      for(var i of resp) {
          // label.push(i.name);
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
        labels:['Prepaid', 'Digital & VAS', 'POINTER', 'BASI'], 
      }
      )
      setChartDataPie(data)
      // setChartDataPie(setData)
      console.log(data)
      // console.log(chartDataPie)

    }).catch(e => {
      console.log("error", e)
    }) 
  }

  const dboardtop = async () =>{
    const response = await axios.get(`getdboardtop`);
    setRfs(response.data.rfs);
    setRfi(response.data.rfi);
    setRfc(response.data.rfc);
    setItr(response.data.itr);
    console.log(response)
  }

  console.log('rfs', rfs)
  

  const piechart =() =>{
    let valreq = [];
      axios.get(`piechartdashboard`)
      .then(res=>{
          console.log(res)
            for (const dataObj of res.data){
              valreq.push(parseInt(dataObj.value))
            }
            
            setTes(valreq)
            setValueReq({
              labels: ['Prepaid', 'Digital & VAS', 'POINTER', 'BASI'],
              datasets:[
                {
                data: valreq,
                backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
                }
              ]
            });
            // setValueReq(res.data.value)
        })
    .catch(error=>{
      console.log(error)
    });
    console.log(valueReq)
    console.log(valreq)
    console.log(tes)
    
  }

  

  const statePieDaily = {
    labels: ['Prepaid', 'Digital & VAS', 'POINTER', 'BASI'],
    datasets:[
        {
        data: [2,6,11,8],
        backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
        }
      ]
  }
  
  const statePieWeekly = {
    labels: ['Prepaid', 'Digital & VAS', 'POINTER', 'BASI'],
    datasets:[
        {
        data: [2,4,5,8],
        backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
        }
      ]
  }

  const statePieMonth = {
    labels: ['Prepaid', 'Digital & VAS', 'POINTER', 'BASI'],
    datasets:[
        {
        data: [17,16,13,15],
        backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
        }
      ]
  }

  // setChartDataPie(setData)
  const [chartDataPie, setChartDataPie] = useState(data)
  console.log('data', data)
  console.log(valueReq)
  console.log(statePieDaily)
  console.log(chartDataPie)

  

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
        <div className="card-body-table">
        <div className="col-sm-12 filterpie">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item-">
            <div class="dropdownFilter">
              <button class="dropbtnFilter">Filter</button>
              <div class="dropdown-content-filter">
                <a onClick= {() => setData(statePieDaily)}>Daily</a>
                <a onClick= {() => setData(statePieWeekly)}>Weekly</a>
                <a onClick= {() => setData(statePieMonth)}>Monthly</a>
                <a onClick= {() => setData(data)}>Yearly</a>
              </div>
            </div>
            </li>
          </ol>
        </div>
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
            {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a> */}
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              {/* <h3>12<sup style={{fontSize: 20}}>%</sup></h3> */}
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
          {/* <div className="chart"> */}
              <LineChart chartData={linedata}/>
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