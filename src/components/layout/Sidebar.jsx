import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRightOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../styles/components/FlexBetween";
import { navItems } from "../../constants/navigation";
import * as Icons from "@mui/icons-material";

const Sidebar = React.memo(({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const handleNavigation = useCallback((path, lcText) => {
        navigate(path || `/${lcText}`);
        setActive(lcText);
    }, [navigate]);

    const drawerStyles = useMemo(() => ({
        width: drawerWidth,
        "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
        },
    }), [drawerWidth, theme.palette, isNonMobile]);

    const listItemButtonStyles = useCallback((lcText) => ({
        backgroundColor: active === lcText
            ? theme.palette.secondary[300]
            : "transparent",
        color: active === lcText
            ? theme.palette.primary[600]
            : theme.palette.secondary[100],
    }), [active, theme.palette]);

    const listItemIconStyles = useCallback((lcText) => ({
        ml: "2rem",
        color: active === lcText
            ? theme.palette.primary[600]
            : theme.palette.secondary[200],
    }), [active, theme.palette]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="right"
                    sx={drawerStyles}
                >
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center" gap="0.5rem">
                                <Typography variant="h4" fontWeight="bold">
                                    Salesyze 
                                </Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                        {navItems.map(({ text, icon, path }) => {
                            if (!icon) {
                                return (
                                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                        {text}
                                    </Typography>
                                );
                            }
                            const IconComponent = Icons[icon];
                            const lcText = text.toLowerCase();

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleNavigation(path, lcText)}
                                        sx={listItemButtonStyles(lcText)}
                                    >
                                        <ListItemIcon sx={listItemIconStyles(lcText)}>
                                            <IconComponent />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                        {active === lcText && (
                                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
            )}
        </Box>
    );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar; 