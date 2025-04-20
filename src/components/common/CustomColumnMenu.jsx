import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from "@mui/x-data-grid";
import React from "react";

const CustomColumnMenu = React.memo((props) => {
    const { hideMenu, currentColumn, open } = props;
    return (
        <GridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            open={open}
        >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
            <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    );
});

CustomColumnMenu.displayName = 'CustomColumnMenu';

export default CustomColumnMenu;