import React, { useState, useMemo, useCallback } from "react";
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
import { availablePages } from "../../constants/navigation";

const Navbar = React.memo(({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFirstClick, setIsFirstClick] = useState(true);

    const filteredPages = useMemo(() => 
        isFirstClick 
            ? availablePages 
            : availablePages.filter(page =>
                page.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [isFirstClick, searchQuery]
    );

    const handleSearch = useCallback((page) => {
        navigate(page.path);
        setSearchQuery("");
        setShowSuggestions(false);
        setIsFirstClick(true);
    }, [navigate]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && filteredPages.length > 0) {
            handleSearch(filteredPages[0]);
        }
    }, [filteredPages, handleSearch]);

    const handleInputChange = useCallback((e) => {
        setSearchQuery(e.target.value);
        setShowSuggestions(true);
    }, []);

    const handleInputFocus = useCallback(() => {
        setShowSuggestions(true);
        if (isFirstClick) {
            setIsFirstClick(false);
        }
    }, [isFirstClick]);

    const appBarStyles = useMemo(() => ({
        position: "static",
        background: "none",
        boxShadow: "none",
    }), []);

    const searchBoxStyles = useMemo(() => ({
        backgroundColor: theme.palette.background.alt,
        borderRadius: "9px",
        gap: "3rem",
        p: "0.12rem 1.5rem",
    }), [theme.palette]);

    const suggestionsPaperStyles = useMemo(() => ({
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 1,
        mt: 1,
        maxHeight: "200px",
        overflow: "auto",
        backgroundColor: theme.palette.background.alt,
    }), [theme.palette]);

    return (
        <AppBar sx={appBarStyles}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                </FlexBetween>

                <FlexBetween>
                    <Box sx={{ position: "relative" }}>
                        <FlexBetween sx={searchBoxStyles}>
                            <InputBase 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                onKeyPress={handleKeyPress}
                            />
                            <IconButton onClick={() => filteredPages.length > 0 && handleSearch(filteredPages[0])}>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                        
                        {showSuggestions && (
                            <Paper sx={suggestionsPaperStyles}>
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
});

Navbar.displayName = 'Navbar';

export default Navbar; 