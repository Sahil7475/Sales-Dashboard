import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../styles/components/FlexBetween";

const StatBox = React.memo(({ title, value, increase, icon, description }) => {
    const theme = useTheme();

    const styles = useMemo(() => ({
        title: { 
            color: theme.palette.secondary[100],
            mb: "0.3rem",
            fontWeight: 600
        },
        value: { 
            color: theme.palette.secondary[200],
            mb: "0.5rem",
            mt: "0.4rem"
        },
        increase: { 
            color: theme.palette.secondary.light,
            mt: "0.4rem",
            fontWeight: 500
        },
        description: { 
            color: theme.palette.secondary[200],
            mt: "0.4rem"
        }
    }), [theme.palette]);

    return (
        <Box width="100%">
            <FlexBetween>
                <Typography 
                    variant="h6" 
                    sx={styles.title}
                >
                    {title}
                </Typography>
                {icon}
            </FlexBetween>

            <Typography
                variant="h3"
                fontWeight="600"
                sx={styles.value}
            >
                {value}
            </Typography>

            <FlexBetween gap="1rem">
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={styles.increase}
                >
                    {increase}
                </Typography>
                <Typography
                    variant="body2"
                    sx={styles.description}
                >
                    {description}
                </Typography>
            </FlexBetween>
        </Box>
    );
});

StatBox.displayName = 'StatBox';

export default StatBox; 