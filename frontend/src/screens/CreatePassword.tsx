import { useState, MouseEvent} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Box, Typography, TextField, Button, CircularProgress, OutlinedInput, InputAdornment, IconButton, FormControl} from "@mui/material"
import { useQuery, useMutation } from "@tanstack/react-query";
import { resetPassword, verifyToken } from "../api/app.api";
import { useForm } from "../components/useAlert";
import { IPasswordReset } from "../types";
import {VisibilityOff , Visibility} from "@mui/icons-material"

const style = {
    root: {
        height: "100vh"
    },
    loader:{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    formWrap:{
        position:"relative",
        padding: "2rem",
        top: "30%",
        left: "50%",
        width: "fit-content",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        '& .MuiFormControl-root':{
            display: "block",
            margin: "1rem"
        },
        // '& .MuiInputBase-input':{
        //     width: "100%"
        // },
    }
}

const CreatePassword = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const key = query.get('key') || "";

    const initialValues:IPasswordReset = {
        password: "",
        cPassword: ""
    }

    const [showPassword,setShowPassword] = useState({
        password: false,
        cPassword: false
    })

    const handleShowPassword = (e: MouseEvent<HTMLButtonElement> ) => {
        const btnName = e.currentTarget.name

        setShowPassword((prevValues)=>({
            ...prevValues,
            [btnName] : !showPassword[btnName as keyof typeof showPassword]
        }))
    }

    const {values, setValues, errors, setErrors, handleChange} = useForm(initialValues);

    const handleSubmit = () => {
        if(validate()){
            values.password ? (
                resetPasswordMutation.mutate({token:key , password: values.password})
            ) : window.alert("Something went wrong")
        }
    }
   

    const validate = ():boolean => {
        let temp:IPasswordReset = {
            password: null,
            cPassword : null
        }   

        temp.password = values.password ? "" : "This field is required"
        temp.cPassword = values.cPassword ? ( values.password === values.cPassword ? "" : "Passwords do not match" ) : "Thi field is required"
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const {data, status, error} = useQuery({
        queryKey: ["userVerify"],
        queryFn: () => verifyToken(key),
        retryDelay: 3000,
        refetchOnWindowFocus:false
    })

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess:()=>{
            navigate('/');
        }
    })

    if(status ==="loading") return <CircularProgress sx={{...style.loader}} />

    
   
  return (
    <Box sx={{...style.root}}>
        <Box sx={{...style.formWrap}}>
            <Typography variant="h5" sx={{textAlign: "center"}}>Create a new password</Typography>
            <FormControl>
                <OutlinedInput
                    size="small"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
                    type={showPassword.password ? "text" : "password"}
                    {...errors? {error: (errors.password ? true : false), helpertext: errors.password} : false}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                name="password"
                                onClick={handleShowPassword}
                            >
                                {showPassword.password ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl>
              <OutlinedInput
                size="small"
                name="cPassword"
                placeholder="Correct Password"
                onChange={handleChange}
                value={values.cPassword}
                type={showPassword.cPassword ? "text" : "password"}
                {...errors? {error: (errors.cPassword ? true : false), helpertext: errors.cPassword} : false}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            name="cPassword"
                            onClick={handleShowPassword}
                        >
                            {showPassword.cPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>Reset</Button>
        </Box>
    </Box>
  )
}

export default CreatePassword