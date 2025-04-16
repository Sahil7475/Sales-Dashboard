import React, { useState } from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
} from "@mui/icons-material";
import FlexBetween from "../../styles/components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../../state/global/globalSlice";
import {
    AppBar,
    IconButton,
    InputBase,
    Toolbar,
    useTheme,
    Box,
    List,
    ListItem,
    ListItemButton,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const availablePages = [
    { name: "Overview", path: "/overview" },
    { name: "Daily", path: "/daily" },
    { name: "Monthly", path: "/monthly" },
    { name: "Breakdown", path: "/breakdown" },
    { name: "Management", path: "/performance" },
];

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFirstClick, setIsFirstClick] = useState(true);

    const filteredPages = isFirstClick 
        ? availablePages 
        : availablePages.filter(page =>
            page.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleSearch = (page) => {
        navigate(page.path);
        setSearchQuery("");
        setShowSuggestions(false);
        setIsFirstClick(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && filteredPages.length > 0) {
            handleSearch(filteredPages[0]);
        }
    };

    const handleInputFocus = () => {
        setShowSuggestions(true);
        if (isFirstClick) {
            setIsFirstClick(false);
        }
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween>
                    <Box sx={{ position: "relative" }}>
                        <FlexBetween
                            backgroundColor={theme.palette.background.alt}
                            borderRadius="9px"
                            gap="3rem"
                            p="0.12rem 1.5rem"
                        >
                            <InputBase 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={handleInputFocus}
                                onKeyPress={handleKeyPress}
                            />
                            <IconButton onClick={() => filteredPages.length > 0 && handleSearch(filteredPages[0])}>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                        
                        {showSuggestions && (
                            <Paper
                                sx={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    zIndex: 1,
                                    mt: 1,
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    backgroundColor: theme.palette.background.alt,
                                }}
                            >
                                <List>
                                    {filteredPages.map((page) => (
                                        <ListItem key={page.path} disablePadding>
                                            <ListItemButton
                                                onClick={() => handleSearch(page)}
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.secondary[300],
                                                    },
                                                }}
                                            >
                                                {page.name}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Box>

                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 