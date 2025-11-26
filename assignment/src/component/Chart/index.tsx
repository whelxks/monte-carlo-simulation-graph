import { useRef } from "react";
import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import type { Projection } from "@/types/projections";
import { projectionColours } from "@/constants/colours";
import "highcharts/highcharts-more";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  tooltipLabel,
  type PointOptionsObject,
  type tooltipLabelType,
} from "@/types/chart";
import {
  calculateDiffInYr,
  changeColorIfRange,
  changeNameIfRange,
  convertNumberTo2Dp,
  mapNameToOrder,
} from "@/functions/chart";

dayjs.extend(customParseFormat);

const options = (data: Projection[]): Highcharts.Options => {
  if (data.length === 0) return {};
  // assume data is in ascending yearMonth order
  const yearsDiff = calculateDiffInYr(
    data[0].yearMonth,
    data.at(-1)?.yearMonth
  );
  return {
    title: {
      text: `In ${yearsDiff} years, your money can grow to <span class="text-blue-600">
            S$${convertNumberTo2Dp(
              data.at(-1)?.expectedAmounts["50"]
            )}</span> `,
      useHTML: true,
      align: "left",
    },
    subtitle: {
      text: 'This projection is based on historical returns and not guranteed. Your investments involve risk. <span class="text-blue-600">How we calculate projections</span> ',
      useHTML: true,
    },
    xAxis: {
      categories: data.map((d) => d.yearMonth),
      tickInterval: 12, // show unique year
      tickLength: 10,
      tickWidth: 1,
      labels: {
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ) {
          return this.value.toString().split("-")[0];
        },
      },

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
      crosshair: {
        color: projectionColours["blue"],
        width: 1,
      },
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      visible: false,
    },
    chart: {
      style: {
        cursor: "crosshair",
      },
    },
    tooltip: {
      shared: true, // combined tooltip across series
      positioner: function (_labelWidth, labelHeight, point) {
        return {
          x: point.plotX + 50,
          y: point.plotY - labelHeight / 2, // center
        };
      },
      useHTML: true,
      formatter: function () {
        //return tooltip.defaultFormatter.call(this, tooltip);
        if (!this.points) return undefined;

        // seperate range into 2 points
        const allPoints = this.points
          .map((point) => {
            const optionObject = point.options as PointOptionsObject;
            const optionKeys = Object.keys(optionObject);

            return optionKeys.map((key) => {
              const newName = changeNameIfRange(point.series.name, key);
              return {
                color: changeColorIfRange(point.series.name, point.color),
                name: newName,
                y: point.y ?? 0,
                order: mapNameToOrder(newName as tooltipLabelType),
                value: optionObject[key],
              };
            });
          })
          .flat();

        // skip if order is undefined
        const sortedPoints = allPoints
          .filter((item) => item.order !== undefined)
          .sort((a, b) => a.order! - b.order!);

        // get html string
        let result = `<b class="block pb-2 mb-2 border-b border-gray-200">${dayjs(
          this.key,
          "YYYY-MM"
        ).format("MMM YYYY")}</b>`;

        // use inline styles for dynamic colours
        sortedPoints.forEach((point) => {
          result += `<div class="mb-2 font-medium flex justify-between gap-4
        
      ${
        point.order !== undefined && point.order <= 2
          ? "text-blue-600"
          : "text-gray-600"
      }">
        
        <span><span style="color:${point.color}">●</span> ${point.name}</span>
        <span class=${
          point.order !== undefined && point.order > 2 && "text-black"
        }
          >S$${convertNumberTo2Dp(point.y)}</span> 
        </div>
            `;

          // add divider
          if (point.order === 2) {
            result += `<div class="border-b border-gray-200 mb-2"></div>`;
          }
        });
        return result;
      },
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            halo: {
              size: 0,
              opacity: 0,
            },
          },
        },
        marker: {
          enabled: false,
          symbol: "circle",
          states: {
            hover: {
              animation: false,
              lineColor: undefined,
              lineWidthPlus: 0,
              radiusPlus: 1,
            },
          },
        },
      },
      arearange: {
        enableMouseTracking: true,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
        color: projectionColours["blue"],
        fillOpacity: 0.1,
      },
    },
    series: [
      {
        color: projectionColours["blue"],
        name: tooltipLabel.medianOutcome,
        id: "median",
        type: "line",
        data: data.map((d) => d.expectedAmounts["50"]),
      },
      {
        color: projectionColours["yellow"],
        name: tooltipLabel["2.5PA"],
        id: "2.5%-p.a",
        type: "line",
        data: data.map((d) => d.expectedAmounts["benchmark"]),
      },
      {
        color: projectionColours["navy"],
        name: tooltipLabel.netInvestments,
        id: "net-investments",
        type: "line",
        data: data.map((d) => d.totalDeposit),
      },
      {
        name: "Range",
        data: data.map((d) => [
          d.expectedAmounts["10"],
          d.expectedAmounts["75"],
        ]),
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":median",
      },
    ],
  };
};

const Chart = ({ data, props }: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

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
