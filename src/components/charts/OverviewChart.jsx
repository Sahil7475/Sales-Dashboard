import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../../services/api.js";

const OverviewChart = React.memo(({ isDashboard = false, view = 'sales' }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetSalesQuery();

    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return [];

        const { monthlyData } = data;
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).reduce(
            (acc, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: month, y: curSales },
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: month, y: curUnits },
                ];

                return { sales: curSales, units: curUnits };
            },
            { sales: 0, units: 0 }
        );

        return [[totalSalesLine], [totalUnitsLine]];
    }, [data, theme.palette]);

    if (!data || isLoading) return "Loading...";

    return (
        <ResponsiveLine
            data={view === "sales" ? totalSalesLine : totalUnitsLine}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200],
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#000000',
                    },
                },
                crosshair: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                        strokeDasharray: "4 4",
                    },
                },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
                legendOffset: -60,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            crosshairType="cross"
            legends={
                !isDashboard
                    ? [
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]
                    : undefined
            }
        />
    );
});

OverviewChart.displayName = 'OverviewChart';

export default OverviewChart; 