import ReactECharts from "echarts-for-react";

function RevenueChart({ data = [] }) {

  const option = {

    tooltip: {
      trigger: "axis"
    },

    xAxis: {
      type: "category",

      data: data.map(item =>item.date)},

    yAxis: {
      type: "value"
    },

    series: [
      {
        data:
          data.map(item => item.revenue),
          type: "line",
          smooth: true
      }
    ]

  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: 350
      }}
    />
  );

}

export default RevenueChart;