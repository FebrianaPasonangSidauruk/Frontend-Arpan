import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from "chart.js";
Chart.register(ChartDataLabels);

function PieChartDigitalVas({ chartDataPie }) {
  return (
    <div className="pie-chart" style={{height:'50%', width:'50%'}}>
  <Pie
   data={chartDataPie} 
  options={
    {
      plugins: {
        datalabels: {
          display: true,
          color: "white",
          align: "end",
          padding: {
            right: 2
          },
          labels: {
            padding: { top: 10 },
            title: {
              font: {
                weight: "bold"
              }
            }
          },
          formatter: (value, context) =>{
            if(value>0){console.log(context.chart.data.datasets[0].data);
            const datapoints = context.chart.data.datasets[0].data;
            function totalSum(total, datapoint){
              return total + datapoint;
            }
            const totalValue = datapoints.reduce(totalSum, 0);
            const percentageValue = (value / totalValue * 100).toFixed(1);
            const display = [`${value}`, `${percentageValue}%`]
            return display;}
            else{
              value = null
              
            }
          }
        },
        tooltip: {
          enabled: false
        }
      }
  }}
  />
  <br/>
  </div>
  )
}

export default PieChartDigitalVas