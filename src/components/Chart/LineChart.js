import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <div className="Line-chart">
  <Line 
  data={chartData} 
  options={{
    title:{
      display:true,
      text:'Average Rainfall per month',
      fontSize:20
    },
    legend:{
      display:true,
      position:'right'
    }
  }}
  />
  </div>
  );
}

export default LineChart;