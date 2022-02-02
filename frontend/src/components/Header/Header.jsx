import { AppBar, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import { Fragment,useState } from "react";
import NavBar from "./NavBar";
import "./Header.css"

export default function Header({tab}) {

    const [state,setState] = useState({open:false});

    const toggleDrawer = open => e => {
        if(e && e.type === 'keydown' && (e.type === 'Tab' || e.key === 'Shift')) 
            return;
        setState({...state,open})
    }

    return (
        <>
        <AppBar position="sticky">
            <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer(true)}
                aria-label="menu"
            >
                <MenuIcon />
          </IconButton>
          <Typography variant="h6">{tab}</Typography>
            </Toolbar>
        </AppBar>

        <Fragment key={'left'}>
            <SwipeableDrawer
                anchor="left"
                open={state.open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <NavBar toggleDrawer={toggleDrawer}/>
            </SwipeableDrawer>
        </Fragment>
        </>
    )
}