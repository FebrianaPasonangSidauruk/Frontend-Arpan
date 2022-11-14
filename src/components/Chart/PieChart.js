import React from "react";
import { Pie } from "react-chartjs-2";
import './PieChart.css'
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

function PieChart({ chartDataPie }) {

  return (
  <div className="pie-chart">
  <Pie
   data={chartDataPie} 
  options={
    {
    legend:{
      display:true,
      position:'right'
    }
  }}
  plugins={[ChartDataLabels]}
  />
  <br/>
  </div>
  );
}

export default PieChart;