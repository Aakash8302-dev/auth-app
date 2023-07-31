import {useState, useEffect, ChangeEvent, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {Typography, Box, InputLabel, TextField, Button} from "@mui/material"
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ILogin } from '../types'
import { getUser, saveUser } from '../api/storage'
import { userLogin } from '../api'
import { useAlert } from './useAlert'
import TransitionAlert from './TransitionAlert'
import "@fontsource/roboto"

const style = {
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
    }
}

interface Props{
    setForm: Function
}

const LoginForm = (props:Props) => {

 const navigate = useNavigate();

 let  userDetails = getUser();

 useEffect(() => {
    userDetails && navigate('/home')
 },[userDetails])
 
 const [formValues, setFormValues] = useState<ILogin>({
    email: "",
    password: ""
 })

 const {info, setInfo} = useAlert();

 const [errors, setErrors] = useState<ILogin>()
 
 const queryClient = useQueryClient();

 const UserLogin = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
        queryClient.setQueryData(["userDetails"], data);
        saveUser(data.data);
        navigate('/home')
    },
    onError: ({response}) => {
        setInfo({
            severity: "error",
            message: response.data.error,
            open: true,
        })
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
    <>
        <Typography id="logo" variant="subtitle1">Untitled UI</Typography>
            <Box sx={{...style.loginForm}}>
                <Typography variant="h5">Welcome Back</Typography>
                <Typography variant="subtitle2">Welcome! Please enter your details</Typography>
                <TransitionAlert info={info}  />
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
                <Button id="forgotBtn" onClick={()=> props.setForm("reset")}>Forgot password</Button>
                <Button onClick={handleSubmit} type="button" variant="contained" size="small">
                    Sign in
                </Button>
            </Box>
    </>
  )
}

export default LoginForm