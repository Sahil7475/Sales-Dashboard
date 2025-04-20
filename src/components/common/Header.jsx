import { Typography, Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";

const Header = React.memo(({ title, subtitle }) => {
    const theme = useTheme();

    const styles = useMemo(() => ({
        title: {
            color: theme.palette.secondary[100],
            fontWeight: "bold",
            mb: "5px"
        },
        subtitle: {
            color: theme.palette.secondary[300]
        }
    }), [theme.palette]);

    return (
        <Box>
            <Typography
                variant="h2"
                sx={styles.title}
            >
                {title}
            </Typography>
            <Typography variant="h5" sx={styles.subtitle}>
                {subtitle}
            </Typography>
        </Box>
    );
});

Header.displayName = 'Header';

export default Header; 