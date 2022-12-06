import React from "react";
import {Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from "chart.js";
Chart.register(ChartDataLabels);

const LineChartBasi = ({chartDataLine}) => {
  return (
    <div className="Line-chart">
  <Line 
  data={chartDataLine} 
  options={{
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: "RFS + RFI",
      padding: {
        bottom: 30
      },
      weight: "bold",
      color: "#00325c",
      font: {
        size: 13
      },
      align: "start"
    },
    datalabels: {
      display: true,
      color: "black",
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
      formatter: function (value) {
        return "\n" + value;
      }
    }
  }
}
  }
  />
  </div>
  )
}

export default LineChartBasi