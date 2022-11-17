import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from "chart.js";
Chart.register(ChartDataLabels);

function LineChart({ chartData }) {
  console.log(chartData, "linecharat")
  return (
    <div className="Line-chart">
  <Line 
  data={chartData} 
  options={{
    // maintainAspectRatio: false,
  // scales: {
  //   x: {
  //     grid: {
  //       display: false
  //     }
  //   },
  //   y: {
  //     display: false,
  //     grid: {
  //       display: false
  //     }
  //   }
  // },
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: "RFC + ITR",
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
  // plugins={{
  //   datalabels: {
  //     display: true,
  //     color: "black",
  //     align: "end",
  //     padding: {
  //       right: 2
  //     },
  //     labels: {
  //       padding: { top: 10 },
  //       title: {
  //         font: {
  //           weight: "bold"
  //         }
  //       },
  //       value: {
  //         color: "green"
  //       }
  //     },
  //   }
  // }
  // }
  />
  </div>
  );
}

export default LineChart;