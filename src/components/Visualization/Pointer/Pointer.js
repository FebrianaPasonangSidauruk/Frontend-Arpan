import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import PieChartPointer from './PieChartPointer';

const Pointer = () => {
  const [data, setData]= useState({
    datasets:[{
      data: [10, 20, 30],
      backgroundColor:['#f56954', '#00a65a', '#f39c12']
    },
  ],
  labels: ['Prepaid', 'Digital & VAS', 'POINTER']
  });

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = () =>  {
    axios.get(`getpiechartpointer`).then(res => {
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
                '#f56954', '#00a65a', '#f39c12'
              ]
          },
        ],
        labels:labels, 
      }
      )
      setChartDataPie(data)
      console.log(data)

    }).catch(e => {
      console.log("error", e)
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
{/* <div className="card">

</div> */}
<div className="col-md-12">
  <div className="card card-danger">
          <div className="card-header">
            <h3 className="card-title">Request Statistics per Department (RFS +RFI)</h3>

          </div>
          <div className="card-body-table" style={{width:'60%', marginLeft:'25%'}}>
              <PieChartPointer chartDataPie ={data}/>
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

export default Pointer