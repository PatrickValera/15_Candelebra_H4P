import { createTheme } from "@mui/material/styles";
let theme= createTheme({})
 theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#1C1E1F',
            main: '#181A1B',
            dark: '#161819',
            contrastText: '#c9c9cC',
        },
        // background: {
        //     paper: '#27292E',
        //     default: '#27292E',
        // },
        // text: {
        //     primary: "#fafafa",
        //     secondary: "#ddd",
        // }
    },
    typography: {
        body1: {
            fontSize: '.55rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '.6rem',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
        },
        body2: {
            fontSize: '0.6rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
        h1: {
            fontSize: '1rem', 
            [theme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '4rem',
            },
        },
        h2: {
            fontSize: '1.2rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '1.5rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        },
        h3: {
            fontSize: '1.2rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1.8rem',
            },
        },
        h4: {
            fontSize: '1.22rem',
            [theme.breakpoints.up('md')]: {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontSize: '.85rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '1.2rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '1.4rem',
            },
        },
        h6: {
            fontSize: '.75rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '1.2rem',
            },
        },
        fontFamily: 'Lato',
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, 
            
                // No more ripple!
            },
        },
        MuiButton:{
            defaultProps:{
                // variant:'contained',
                size:'small',
                disableElevation: true,

            }
        }
        // MuiPaper:{
        //     defaultProps: {
        //         elevation:
        //     },
        // }
    },


})


export { theme }