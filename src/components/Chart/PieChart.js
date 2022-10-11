import React from "react";
import { Pie } from "react-chartjs-2";
import './PieChart.css'
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartDataPie }) {

  return (
  <div className="pie-chart">
  <Pie
   data={chartDataPie} 
  options={{
    title:{
      display:true,
      text:'Average Rainfall per month',
      fontSize:10
    },
    legend:{
      display:true,
      position:'right'
    }
  }}/>
  <br/>
  </div>
  );
}

export default PieChart;