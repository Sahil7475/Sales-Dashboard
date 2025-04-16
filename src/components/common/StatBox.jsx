import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../styles/components/FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
    const theme = useTheme();
    return (
        <Box width="100%">
            <FlexBetween>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: theme.palette.secondary[100],
                        mb: "0.3rem",
                        fontWeight: 600
                    }}
                >
                    {title}
                </Typography>
                {icon}
            </FlexBetween>

            <Typography
                variant="h3"
                fontWeight="600"
                sx={{ 
                    color: theme.palette.secondary[200],
                    mb: "0.5rem",
                    mt: "0.4rem"
                }}
            >
                {value}
            </Typography>

            <FlexBetween gap="1rem">
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ 
                        color: theme.palette.secondary.light,
                        mt: "0.4rem",
                        fontWeight: 500
                    }}
                >
                    {increase}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ 
                        color: theme.palette.secondary[200],
                        mt: "0.4rem"
                    }}
                >
                    {description}
                </Typography>
            </FlexBetween>
        </Box>
    );
};

export default StatBox; 