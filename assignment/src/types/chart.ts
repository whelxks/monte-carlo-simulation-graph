// explicitly declare PointOptionsObject
// reference doc: https://api.highcharts.com/class-reference/Highcharts.PointOptionsObject
export type PointOptionsObject = {
  [key: string]: number | string;
};

export type tooltipLabelType = keyof typeof tooltipLabel;
export const tooltipLabel = {
  top25: "Top 25% outcome",
  medianOutcome: "Median outcome",
  bottom10: "Bottom 10% outcome",
  "2.5PA": "2.5% p.a.",
  netInvestments: "Net investments",
};
