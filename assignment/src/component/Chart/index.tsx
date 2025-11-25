import { useRef } from "react";
import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import type { Projection } from "../../types/projections";

const options = (data: Projection[]): Highcharts.Options => ({
  title: {
    text: "In 30 years, your money can grow to ",
    align: "left",
  },
  subtitle: {
    text: "based on your initial investment of $1000000",
  },
  xAxis: {
    categories: data.map((d) => d.yearMonth.split("-")[0]),
    tickInterval: 12, // show unique year
    tickLength: 10,
    tickWidth: 1,
    tickPositioner: function () {
      // only show 5 year interval
      const indexPositions: number[] = [];
      const shownYears = new Set();
      data.forEach((d, index) => {
        const year = parseInt(d.yearMonth.split("-")[0]);
        if (year % 5 === 0 && !shownYears.has(year)) {
          indexPositions.push(index);
          shownYears.add(year);
        }
      });
      return indexPositions;
    },
  },
  legend: {
    enabled: false,
  },
  yAxis: {
    visible: false,
  },
  series: [
    {
      marker: {
        enabled: false,
      },
      color: "blue",
      name: "50th percentile",
      type: "line",
      data: data.map((d) => d.expectedAmounts["50"]),
    },
    {
      marker: {
        enabled: false,
      },
      color: "orange",
      name: "2.5% p.a",
      type: "line",
      data: data.map((d) => d.expectedAmounts["benchmark"]),
    },
    {
      marker: {
        enabled: false,
      },
      color: "navy",
      name: "net investments",
      type: "line",
      data: data.map((d) => d.totalDeposit),
    },
  ],
});

const Chart = ({ data, props }: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  console.log(data);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options(data)}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default Chart;
