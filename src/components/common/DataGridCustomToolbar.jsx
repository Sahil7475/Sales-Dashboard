import React, { useCallback } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "../../../styles/components/FlexBetween";

const DataGridCustomToolbar = React.memo(({ searchInput, setSearchInput, setSearch }) => {
    const handleSearch = useCallback(() => {
        setSearch(searchInput);
        setSearchInput("");
    }, [searchInput, setSearch, setSearchInput]);

    const handleInputChange = useCallback((e) => {
        setSearchInput(e.target.value);
    }, [setSearchInput]);

    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <TextField
                    label="Search..."
                    sx={{ mb: "0.5rem", width: "15rem" }}
                    onChange={handleInputChange}
                    value={searchInput}
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    );
});

DataGridCustomToolbar.displayName = 'DataGridCustomToolbar';

export default DataGridCustomToolbar; 