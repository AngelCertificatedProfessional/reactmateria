import { createMuiTheme } from "@material-ui/core/styles";
const arcBlue = "#0B72B9"
const arcOrange = "#FFBA60"
// import green from '@material-ui/core/colors/green'

export default createMuiTheme({
    palette: {
        common: {
            blue : `${arcBlue}`,
            orange: `${arcOrange}`
        },
        primary: {
            main: `${arcBlue}`
        },
        secondary: {
            main: `${arcOrange}`
        }
    },
    typography: {
        tab:{
            fontFamily: "Raleway",
            textTransform:"none",
            fontWeight:700,
            fontSize:"1rem",
        },
        estimate: {
            fontFamily:"Pacifico",
            fontSize:"1rem",
            textTransform:"none",
            color:"white"
        }
    }
})

// const theme = createMuiTheme({
//     palette:{
//         primary:purple,
//         secondary:green
//     },
//     status: {
//         danger:'orange'
//     }
// })