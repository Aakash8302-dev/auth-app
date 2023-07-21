import { useState, useEffect } from "react"
import { Typography, Box, TextField, Button, Stack, Grid, InputLabel} from "@mui/material"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
import { userLogin } from "../api"
import { ChangeEvent } from "react"
import { ILogin } from "../types"
import { saveUser, getUser } from "../api/storage"
import "@fontsource/roboto"

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
    loginForm:{
        position:"relative",
        top: "40%",
        left: "50%",
        width: "20rem",
        transform: 'translate(-50%, -50%)',
        padding:"0 2rem",
        '& .MuiTextField-root':{
            display: "block",
            margin: "1rem 0",
            width: "100%"
        },
        '& .MuiInputBase-input':{
            width: "100%"
        },
        '& .MuiButton-root':{
            width: '20rem',
        },
        "& .MuiTypography-subtitle2":{
            color: "gray",
            margin: "8px 0 16px 0"
        },
        "& .MuiFormLabel-root":{
            top: "10px",
            fontSize: "12px",
            color: "rgba(0,0,0,1)"
        },
        "& #forgotBtn":{
            border: "none",
            background: "none",
            margin: "0 0 12px 0",
            fontWeight: 500,
            color: 'rgba(25, 118, 210, 1)',
            width: 'fit-content',
            float: 'right',
            fontSize: "12px",
            padding: '0',
            textTransform: 'inherit',
            '&:hover': {
                cursor: "pointer",
            }
        }
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

 const navigate = useNavigate();

 let  userDetails = getUser();

 useEffect(() => {
    userDetails && navigate('/home')
 },[userDetails])
 
 const [formValues, setFormValues] = useState<ILogin>({
    email: "",
    password: ""
 })

 const [errors, setErrors] = useState<ILogin>()
 
 const queryClient = useQueryClient();

 const UserLogin = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
        queryClient.setQueryData(["userDetails"], data);
        saveUser(data.data);
        navigate('/home')
    },
    onError: (data) => {
        console.log("Error", data);
    }
 })

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value
        }))
 }

 const validate = ():boolean => {
    const temp:ILogin = {
        email: null,
        password: null
    }

    temp.email = formValues.email ? (formValues.email.includes("@") ? "" : "Enter a valid email" ) : "This field is required"
    temp.password = formValues.password ? "" : "This field is required"

    setErrors({
        ...temp
    })

    return Object.values(temp).every(x => x==="");
 }

 const handleSubmit = () => {
    if(validate()){
        UserLogin.mutate(formValues);
    };
 }

  return (
    <Grid container sx={{...style.root}}>     
        <Grid item  sm={12} md={6} sx={{...style.loginSection}}>
            <Typography id="logo" variant="subtitle1">Untitled UI</Typography>
            <Box sx={{...style.loginForm}}>
                <Typography variant="h5">Welcome Back</Typography>
                <Typography variant="subtitle2">Welcome! Please enter your details</Typography>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField 
                    id="email"
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    {...errors? {error: (errors.email ? true : false), helperText: errors.email} : false}
                />
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField 
                    variant="outlined"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    {...errors? {error: (errors.password ? true : false), helperText: errors.password} : false}
                />
                <Button id="forgotBtn">Forgot password</Button>
                <Button onClick={handleSubmit} type="button" variant="contained" size="small">
                    Sign in
                </Button>
            </Box>
     
        </Grid> 
        <Grid item sm={12} md={6} sx={{...style.elementSection}}>
            <Box sx={{...style.elementSection.element}}></Box>
            <Box sx={{...style.elementSection.elementGlass}}></Box>
        </Grid>
    </Grid>
  )
}

export default LoginScreen