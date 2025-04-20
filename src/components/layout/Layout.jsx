import React, { useState, useMemo } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = React.memo(() => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarToggle = useMemo(() => () => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const mainBoxStyles = useMemo(() => ({
        display: isNonMobile ? "flex" : "block",
        width: "100%",
        height: "100%"
    }), [isNonMobile]);

    return (
        <Box sx={mainBoxStyles}>
            <Box flexGrow={1}>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={handleSidebarToggle}
                />
                <Outlet />
            </Box>
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={handleSidebarToggle}
            />
        </Box>
    );
});

Layout.displayName = 'Layout';

export default Layout; 