import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartComponent = ({ data, handleChangeIndex }) => {
  const handleMouseOver = (index) => {
    handleChangeIndex(index);
  };

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: data.title, 
    },
    xAxis: {
      categories: [], 
    },
    yAxis: {
      title: {
        text: "Значение",
      },
    },
    series: [
      {
        name: "Значения",
        data: data.values,
      },
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function () {
              handleMouseOver(this.index);
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartComponent;
