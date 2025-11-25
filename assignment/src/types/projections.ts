export type Projection = {
    chanceOfUnderPerformingBenchmark: number;
    expectedAmounts: {
        [key: string]: number;
    };
    sequence: number;
    totalDeposit: number;
    yearMonth: string
}