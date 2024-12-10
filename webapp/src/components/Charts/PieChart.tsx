import { useTheme } from "@mui/styles";
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Chart, { ChartItem } from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

export const data = [
  ["Coverage", "Type of Coverage with number"],
  ["New", 11],
  ["Old", 2],
  ["Bots", 2],
];

export const options = {
  title: "New vs Old Visitors",
};

const dayArr = [
  "Today",
  "Yesterday",
  "2 days Ago",
  "3 days Ago",
  "4 days Ago",
  "5 days Ago",
  "6 days Ago",
];

const Utils = {
  months: (params) => {
    const { count } = params;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return months.filter((item, iter) => iter < count);
  },
  days: (params) => {
    const { count } = params;
    return dayArr;
  },
};

export default function PieChart({ sessions }): JSX.Element {
  const theme = useTheme();
  const canvas = useRef<ChartItem>();
  const chart = useRef<Chart<"line", number[], number>>();
  const datasets: Array<Number> = [];

  const createDataConfig = () => {
    let dictionary = {};
    sessions.map((item) => {
      let itemDate = item._id;
      let itemCount = item.count;
      if (!dictionary[itemDate]) {
        dictionary[itemDate] = itemCount;
      }
    });

    return dictionary;
  };
  const createChartConfig = () => {
    const configData = createDataConfig();
    const daysData = dayArr;
    const oneDay = 1000 * 60 * 60 * 24;
    const today = new Date();
    const tempArr = {};
    return dayArr.map((item, itr) => {
      const oldDay = today.getTime() - itr * oneDay;
      let oldDate = new Date(oldDay).toISOString().split("T")[0];
      if (!configData[oldDate]) {
        return {
          label: item,
          value: 0,
        };
      }
      return {
        label: item,
        value: configData[oldDate],
      };
    });
  };

  const createChart = () => {
    // Chart.defaults.font.family = "Inter";
    const chartConfig = createChartConfig();
    const labels = chartConfig.map((item) => item.label);
    const values = chartConfig.map((item) => item.value);
    const maxY = [...values].sort((j, k) => k - j)[0];
    const data = {
      labels: labels, //x axis days
      datasets: [
        {
          label: "views",
          data: values, //visitors count
          fill: false,
          borderColor: theme.palette.secondary.main,
          tension: 0.1,
          backgroundColor: "red",
        },
      ],
    };
    if (!canvas.current) {
      return;
    }
    const plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#99ffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };
    chart.current = new Chart(canvas.current, {
      type: "line",
      data: data,
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);
          // Substitute the appropriate scale IDs
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: theme.palette.tertiary.main,
          },
          legend: {
            display: false,
            labels: {
              color: theme.palette.text.primary,
              font: {
                size: 18,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: theme.palette.text.primary,
            },
          },
          y: {
            grid: {
              display: false,
            },
            suggestedMin: 0,
            suggestedMax: maxY * 10 || 10,
            ticks: {
              color: theme.palette.text.primary, // not 'fontColor:' anymore
              // fontSize: 18,
            },
          },
        },
      },
      plugins: [plugin],
    });
  };
  useEffect(() => {
    if (!chart.current) {
      createChart();
    }
  }, []);
  return (
    <Box sx={{ background: theme.palette.primary.main }}>
      <canvas ref={canvas} />
    </Box>
  );
}
