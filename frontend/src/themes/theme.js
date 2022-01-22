import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true, // No more ripple!
            },
        },
        MuiButton:{
            defaultProps:{
                variant:'contained'
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