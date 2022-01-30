import { createTheme } from "@mui/material/styles";
let lightTheme = createTheme({})
lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#1C1E1F',
            main: '#181A1B',
            dark: '#161819',
            contrastText: '#c9c9cC',
        },
    },
    typography: {
        body1: {
            fontSize: '.55rem',
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '.6rem',
            },
            [lightTheme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
        },
        body2: {
            fontSize: '0.6rem',
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
        h1: {
            fontSize: '1rem',
            [lightTheme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            },
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '4rem',
            },
        },
        h2: {
            fontSize: '1.2rem',
            [lightTheme.breakpoints.up('sm')]: {
                fontSize: '1.5rem',
            },
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        },
        h3: {
            fontSize: '1.2rem',
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '1.8rem',
            },
        },
        h4: {
            fontSize: '1.22rem',
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontSize: '.85rem',
            [lightTheme.breakpoints.up('sm')]: {
                fontSize: '1.2rem',
            },
            [lightTheme.breakpoints.up('md')]: {
                fontSize: '1.4rem',
            },
        },
        h6: {
            fontSize: '.75rem',
            [lightTheme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
            [lightTheme.breakpoints.up('md')]: {
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
        MuiButton: {
            defaultProps: {
                // variant:'contained',
                size: 'small',
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
let darkTheme = createTheme({})
darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#1C1E1F',
            main: '#181A1B',
            dark: '#161819',
            contrastText: '#a9a9aC',
        },
        success: {
            main: '#4ad44f',
            light: '#558c55',
            dark: '#00c805',
        },
        background: {
            default: '#19191a',
            paper: '#1f1f1f',
        },
        error: {
            main: '#f1564a',
        },
        text: {
            primary: "#fafafa",
            secondary: "#ddd",
        }
    },
    // background: {
    //     paper: '#27292E',
    //     default: '#27292E',
    // },

    typography: {
        body1: {
            fontSize: '.55rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '.6rem',
            },
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
        },
        body2: {
            fontSize: '0.6rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '1rem',
            },
        },
        h1: {
            fontSize: '1rem',
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            },
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '4rem',
            },
        },
        h2: {
            fontSize: '1.2rem',
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '1.5rem',
            },
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        },
        h3: {
            fontSize: '1.2rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '1.8rem',
            },
        },
        h4: {
            fontSize: '1.22rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontSize: '.85rem',
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '1.2rem',
            },
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '1.4rem',
            },
        },
        h6: {
            fontSize: '.75rem',
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
            [darkTheme.breakpoints.up('md')]: {
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
        MuiButton: {
            defaultProps: {
                // variant:'contained',
                size: 'small',
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

export { lightTheme, darkTheme }