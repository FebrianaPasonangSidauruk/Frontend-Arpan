import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import PieChartDigitalVas from './PieChartDigitalVas';
import LineChartDigitalVas from './LineChartDigitalVas';

const DigitalVAS = () => {
  const [data, setData]= useState({
    datasets:[{
      data: [10, 20, 30, 40],
      backgroundColor:['#f56954', '#00a65a', '#f39c12', '#00c0ef']
    },
  ],
  // labels: ['Prepaid', 'Digital & VAS', 'POINTER', 'BASI']
  });

  const [linedata, setLinedata]= useState({
    datasets:[
      {
      label:'Video Development',
      data: [21, 35, 45, 51, 46, 49, 56, 53, 68, 75, 63, 52],
      fill: false, // for Line chart
      backgroundColor: '#00c0ef',
      borderColor: '#00c0ef' // for Line chart
    },
    {
      label: 'Games Development',
      data: [51, 69, 63, 57, 63, 71, 54, 59, 46, 60, 52, 78],
      fill: false, // for Line chart
      backgroundColor: '#00a65a',
      borderColor: '#00a65a' // for Line chart
    },
    {
      label: 'Music and VAS Development',
      data: [51, 69, 63, 57, 63, 71, 54, 59, 46, 60, 52, 78],
      fill: false, // for Line chart
      backgroundColor: '#f39c12',
      borderColor: '#f39c12' // for Line chart
    },
    {
      label: 'Consumer Channel Development',
      data: [51, 69, 63, 57, 63, 71, 54, 59, 46, 60, 52, 78],
      fill: false, // for Line chart
      backgroundColor: '#f56954',
      borderColor: '#f56954' // for Line chart
    }

  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  });

  useEffect(()=>{
    fetchData();
  }, []);
  useEffect(()=>{
    linechart();
  }, [])

  const fetchData = () =>  {
    axios.get(`getpiechartdigitalvas`).then(res => {
      const resp = res.data;
      return resp
    }).then((resp) => {
      console.log("resss", resp)
      const datas = [];
      const labels =[];
      for(var i of resp) {
          datas.push(i.counter)
          labels.push(i.department)
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
        // labels:labels, 
      }
      )
      setChartDataPie(data)
      console.log(data)

    }).catch(e => {
      console.log("error", e)
    }) 
  };

  const linechart = () =>{
    axios.get(`getlinechartdigitalvas`).then(res =>{
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
              label:'Video Development',
              data: datas[0],
              fill: false, // for Line chart
              backgroundColor: '#00c0ef',
              borderColor: '#00c0ef' // for Line chart
            },
            {
              label: 'Games Development',
              data: datas[1],
              fill: false, // for Line chart
              backgroundColor: '#00a65a',
              borderColor: '#00a65a' // for Line chart
            },
            {
              label: 'Music and VAS Development',
              data: datas[2],
              fill: false, // for Line chart
              backgroundColor: '#f39c12',
              borderColor: '#f39c12' // for Line chart
            },
            {
              label: 'Consumer Channel Development',
              data: datas[3],
              fill: false, // for Line chart
              backgroundColor: '#f56954',
              borderColor: '#f56954' // for Line chart
            }
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        })
        // console.log(linedata)

        }).catch(err => {
        console.log("error", err)
      })
    }

  const [chartDataPie, setChartDataPie] = useState(data)

  return (
    <div>
    <Header/>
  <Sidebar/>
  <div className="content-wrapper">
<section className="content-header">
<div className="container-fluid">
  <div className="row mb-2">
    <div className="col-sm-6">
      <h1>Digital and VAS Department</h1>
    </div>
    <div className="col-sm-6">
      <ol className="breadcrumb float-sm-right">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item active">Visualization</li>
        <li className="breadcrumb-item active">Digital&VAS</li>
      </ol>
    </div>
  </div>
</div>
</section>

<section className="content">
<div className="container-fluid">
<div className="row">
<div className="col-12">
{/* <div className="card">

</div> */}
<div className="col-md-12">
  <div className="card card-danger">
          <div className="card-header">
            <h3 className="card-title">Request Statistics per Department (RFS +RFI)</h3>

          </div>
          <div className="card-body-table" style={{width:'60%', marginLeft:'25%'}}>
              <LineChartDigitalVas chartDataLine ={linedata}/>
          </div>
          <div className="card-body-table" style={{width:'60%', marginLeft:'25%'}}>
              <PieChartDigitalVas chartDataPie ={data}/>
          </div>
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

export default DigitalVAS