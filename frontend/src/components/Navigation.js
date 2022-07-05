import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Header from './Header';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

//NAVIGATION DEFINITION STARTS HERE
export default function Navigation({ children,theme:currTheme,setTheme }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ display: 'flex',justifyContent:'center' }}>
            <AppBar color='' position="fixed" open={open}>
                <Toolbar>
                    <Header theme={currTheme} setTheme={setTheme}/>
                </Toolbar>
            </AppBar>
            <main>
                <DrawerHeader />
                {children}
            </main>
        </Box>
    );
}