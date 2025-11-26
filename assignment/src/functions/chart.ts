import { tooltipLabel, type tooltipLabelType } from "@/types/chart";
import Highcharts from "highcharts";
import dayjs from "dayjs";

export const mapNameToOrder = (name: tooltipLabelType): number | undefined => {
  switch (name) {
    case tooltipLabel["top25"]:
      return 0;
    case tooltipLabel["medianOutcome"]:
      return 1;
    case tooltipLabel["bottom10"]:
      return 2;
    case tooltipLabel["2.5PA"]:
      return 3;
    case tooltipLabel["netInvestments"]:
      return 4;
    default:
      return undefined;
  }
};

export const changeNameIfRange = (name: string, key: string) => {
  if (name === "Range" && key === "low") return tooltipLabel.bottom10;
  if (name === "Range" && key === "high") return tooltipLabel.top25;
  return name;
};

export const changeColorIfRange = (
  name: string,
  hex?: string | Highcharts.GradientColorObject | Highcharts.PatternObject
) => {
  if (name === "Range") return `${hex}1A`; // 10% opacity
  return hex;
};

export const convertNumberTo2Dp = (number?: number) => {
  return Highcharts.numberFormat(number ?? 0, 2);
}

export const calculateDiffInYr = (firstYear?: string, lastYear?: string) => {
  if (!firstYear || !lastYear) return 0;
  return dayjs(lastYear, "YYYY-MM").diff(dayjs(firstYear, "YYYY-MM"), "year") + 1;
}
