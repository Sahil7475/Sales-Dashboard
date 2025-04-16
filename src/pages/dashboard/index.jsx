import React from 'react'
import FlexBetween from "../../styles/components/FlexBetween";
import Header from "../../components/common/Header";
import {
    DownloadOutlined,
    Email,
    PointOfSale,
    PersonAdd,
    Traffic,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/charts/BreakdownChart";
import OverviewChart from "../../components/charts/OverviewChart";
import { useGetDashboardQuery } from "../../services/api.js";
import StatBox from "../../components/common/StatBox";
import { ResponsiveBar } from '@nivo/bar';

const Dashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const { data } = useGetDashboardQuery();


    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="Sales Analytics" subtitle="Welcome to your dashboard" />

            </FlexBetween>

            <Box
                mt="20px"
                mb="2rem"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows={isNonMediumScreens ? "160px" : "auto"}
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                {/* ROW 1 - StatBoxes */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <StatBox
                        title="Total Customers"
                        value={data && data.totalCustomers}
                        increase="+14%"
                        description="Since last month"
                        icon={
                            <Email
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <StatBox
                        title="Sales Today"
                        value={data && data.todayStats.totalSales}
                        increase="+21%"
                        description="Since last month"
                        icon={
                            <PointOfSale
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <StatBox
                        title="Monthly Sales"
                        value={data && data.thisMonthStats.totalSales}
                        increase="+5%"
                        description="Since last month"
                        icon={
                            <PersonAdd
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <StatBox
                        title="Yearly Sales"
                        value={data && data.yearlySalesTotal}
                        increase="+43%"
                        description="Since last month"
                        icon={
                            <Traffic
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 - Charts */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="5rem 2rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Overview Of Sales
                    </Typography>
                    <Box height="350px">
                        <OverviewChart view="sales" isDashboard={true} />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Sales By Category
                    </Typography>
                    <Box height="400px">
                        <BreakdownChart isDashboard={true} />
                    </Box>
                    <Typography
                        p="0 0.6rem"
                        fontSize="0.8rem"
                        sx={{ color: theme.palette.secondary[200] }}
                    >
                        Breakdown of real states and information via category for revenue
                        made for this year and total sales.
                    </Typography>
                </Box>

                {/* ROW 3 - Transactions */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                    mb="1rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
                        Client Transactions
                    </Typography>
                    {data && data.transactions ? (
                        <Box height={isNonMediumScreens ? "400px" : "300px"}>
                            <ResponsiveBar
                                data={data.transactions.slice(0, 50).map((transaction, i) => ({
                                    id: `${i + 1}`,
                                    Cost: parseFloat(transaction.cost),
                                    Products: transaction.products.length,
                                    tooltipId: transaction.userId
                                }))}
                                keys={['Cost', 'Products']}
                                indexBy="id"
                                margin={isNonMediumScreens 
                                    ? { top: 50, right: 130, bottom: 70, left: 60 }
                                    : { top: 50, right: 50, bottom: 70, left: 50 }
                                }
                                padding={0.3}
                                innerPadding={3}
                                groupMode="grouped"
                                layout="vertical"
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: isNonMediumScreens ? 45 : 90,
                                    legend: 'Transaction Number',
                                    legendPosition: 'middle',
                                    legendOffset: 60,
                                    truncateTickAt: 0
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Value',
                                    legendPosition: 'middle',
                                    legendOffset: -50
                                }}
                                colors={[theme.palette.secondary[300], theme.palette.secondary[500]]}
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
                                                fontSize: isNonMediumScreens ? 12 : 10,
                                            },
                                        },
                                        ticks: {
                                            line: {
                                                stroke: theme.palette.secondary[200],
                                                strokeWidth: 1,
                                            },
                                            text: {
                                                fill: theme.palette.secondary[200],
                                                fontSize: isNonMediumScreens ? 11 : 9,
                                            },
                                        },
                                    },
                                    legends: {
                                        text: {
                                            fill: theme.palette.secondary[200],
                                            fontSize: isNonMediumScreens ? 11 : 9,
                                        },
                                    },
                                    tooltip: {
                                        container: {
                                            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#000000',
                                            fontSize: isNonMediumScreens ? 12 : 10,
                                            padding: '8px 12px',
                                        },
                                    },
                                }}
                                tooltip={({ data }) => (
                                    <div
                                        style={{
                                            padding: 12,
                                            background: theme.palette.background.alt,
                                            color: theme.palette.secondary[200],
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        <strong>Client ID: {data.tooltipId}</strong>
                                        <br />
                                        Cost: ${data.Cost.toLocaleString()}
                                        <br />
                                        Products: {data.Products}
                                    </div>
                                )}
                                borderRadius={2}
                                borderWidth={1}
                                borderColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]]
                                }}
                                axisTop={null}
                                axisRight={null}
                                enableGridY={true}
                                gridYValues={5}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{
                                    from: 'color',
                                    modifiers: [['darker', 1.6]]
                                }}
                                legends={[
                                    {
                                        dataFrom: 'keys',
                                        anchor: isNonMediumScreens ? 'bottom-right' : 'bottom',
                                        direction: isNonMediumScreens ? 'column' : 'row',
                                        justify: false,
                                        translateX: isNonMediumScreens ? 120 : 0,
                                        translateY: isNonMediumScreens ? 0 : 50,
                                        itemsSpacing: 2,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 0.85,
                                        symbolSize: isNonMediumScreens ? 20 : 16,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </Box>
                    ) : (
                        <Typography>Loading transactions data...</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard; 