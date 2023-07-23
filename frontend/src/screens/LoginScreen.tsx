import {useState} from "react"
import {Grid, Box} from "@mui/material"
import LoginForm from "../components/LoginForm"
import "@fontsource/roboto"
import PasswordResetForm from "../components/PasswordResetForm"


const style = {
    root:{
        minHeight: '100vh',
        minWidth: '90vw',
        FontFace: "Roboto",
        '& #logo':{
            fontWeight: "900",
            padding: "1rem 0 0 1rem"
        }
    },
    loginSection: {
        width: "100%"
    },
    elementSection:{
        display: {
            xs: 'none',
            sm: 'none',
            md: 'flex'
        },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(200,200,200,0.2)",
        element:{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: "rgba(25, 118, 210, 1)"
        },
        elementGlass:{
            top: "50%",
            position: "absolute",
            width: "300px",
            height: "220px",
            background: "rgba( 255, 255, 255, 0.05 )",
            backdropFilter: "blur( 20px )",
            borderRadius: "10px",
        }
    }
}


const LoginScreen = () => {

  const [form, setForm] = useState("login");

  return (
    <Grid container sx={{...style.root}}>     
        <Grid item  sm={12} md={6} sx={{...style.loginSection}}>
            {
                form === "login" ? <LoginForm setForm={setForm} /> : <PasswordResetForm setForm={setForm} />
            }
        </Grid> 
        <Grid item sm={12} md={6} sx={{...style.elementSection}}>
            <Box sx={{...style.elementSection.element}}></Box>
            <Box sx={{...style.elementSection.elementGlass}}></Box>
        </Grid>
    </Grid>
  )
}

export default LoginScreen