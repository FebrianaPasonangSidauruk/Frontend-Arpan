import React from "react";
import { Pie } from "react-chartjs-2";
// import './PieChart.css'
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

function PiechartPrepaid({ chartDataPie }) {
  return (
    <div className="pie-chart" style={{height:'50%', width:'50%'}}>
  <Pie
   data={chartDataPie} 
  options={
    {
    legend:{
      display:true,
      position:'center',
      padding: {
        right: 2
      },
    }
  }}
  plugins={[ChartDataLabels]}
  />
  <br/>
  </div>
  )
}

export default PiechartPrepaid