import {useState, ChangeEvent} from 'react'
import {useMutation } from '@tanstack/react-query';
import {Typography, Box, Button, InputAdornment, OutlinedInput, IconButton} from '@mui/material'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { resetPasswordEmail } from '../api/app.api';
import TransitionAlert from './TransitionAlert';
import { useAlert } from './useAlert';

interface Props{
    setForm: Function
}

const style = {
    resetForm:{
        position:"relative",
        top: "38%",
        left: "50%",
        width: "20rem",
        transform: 'translate(-50%, -50%)',
        padding:"0 2rem",
        '& .MuiInputBase-root':{
            paddingRight: 0
        },
        '& #back':{
            display: "block",
            margin: "1rem 0 "
        },
        "& #title":{
            margin: "1.5rem 0"
        },
    }
}

const PasswordResetForm = (props:Props) => {

   
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        if(email){
            passwordResetMutation.mutate(email)
        }
    }

    const passwordResetMutation = useMutation({
        mutationFn: resetPasswordEmail,
        onSuccess: () => {
            setInfo({
                severity: "success",
                open: true,
                message: "Link to reset password has been sent"
            })

            setTimeout(()=>{
                setInfo({
                    severity: undefined,
                    open: false,
                    message: ''
                })
            },2500)
        },
        onError: ({response}) => {
            setInfo({
                severity: "error",
                open: true,
                message: response.data.error
            })
            setTimeout(()=>{
                setInfo({
                    severity: "error",
                    open: false,
                    message: response.data.error
                })
            },2500)
        }
    })

    const {info, setInfo} = useAlert()

    
  return (
    <>
        <Typography id="logo" variant="subtitle1">Untitled UI</Typography>
        <Box sx={{...style.resetForm}} >
            <Typography id="title" variant="h6">Password Reset</Typography>
            <TransitionAlert info={info} />
            <OutlinedInput
                id="email"
                name="email"
                placeholder='Enter email'
                onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                fullWidth
                size="small"
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton onClick={handleSubmit}>
                            <ArrowCircleRightRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <Button id='back' size='small' onClick={()=> props.setForm("login")}>Go Back</Button>
        </Box>
    </>
  )
}

export default PasswordResetForm