import {ChangeEvent, useState, FormEvent} from "react"
import { useMutation } from "@tanstack/react-query"
import {Box, TextField, Typography,Button, FormControl, InputLabel, Select, MenuItem, FormHelperText} from "@mui/material"
import { IUserCreate } from "../types"
import { createUser } from "../api"
import { SelectChangeEvent } from "@mui/material/Select"

const styles = {
    formRoot:{
        width: "20rem",
       '& .MuiTextField-root':{
        display: 'block',
        margin: "1rem 0",
       },
       '& .MuiSelect-select':{
        width: "11rem"
       }
    }
}

const CreateUser = () => {

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: ()=>{
        console.log("Created");
    }

  })

  const [formvalues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    cPassword: ""
  })

  const [errors, setErrors] = useState<IUserCreate>()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormValues(() => ({
        ...formvalues,
        [name]: value
    }))
  }

  const handleSubmit = () => {
        if(validate()){
            createUserMutation.mutate(formvalues)
        }
  }

  const validate = ():boolean => {
    let temp:IUserCreate = {
        name: null,
        email: null,
        role: null,
        password: null,
        cPassword: null
    }

    temp.name = formvalues.name ? "" : "This Field is required"
    temp.email = formvalues.email ? "" : "This field is required"
    temp.role = formvalues.role ? "" : "This field is required"
    temp.password = formvalues.password ? "" : "This field is required"
    temp.cPassword = formvalues.cPassword ? ( formvalues.password !== formvalues.cPassword ? "Passwords do not match" : "" ) : "This field is required"

    setErrors({
        ...temp
    })

    return Object.values(temp).every(x => x==="")
  }

  return (
    <>
        <Typography variant="h6">CREATE USER</Typography>
        <Box sx={{...styles.formRoot}}>
            <TextField
                variant="outlined"
                name="name"
                label="Name"
                size="small"
                value={formvalues.name}
                onChange={handleInputChange}
                {...errors? {error: (errors.name ? true : false), helperText: errors.name} : false}
            />
            <TextField
                variant="outlined"
                name="email"
                label="Email"
                size="small"
                value={formvalues.email}
                onChange={handleInputChange}
                {...errors? {error: (errors.email ? true : false), helperText: errors.email} : false}
            />
            <FormControl size="small" {...errors? {error: (errors.email ? true : false)} : false} >
                <InputLabel id="role">Role</InputLabel>
                <Select labelId="role" name="role" value={formvalues.role} onChange={(e: SelectChangeEvent) => (
                    setFormValues((prevFormValues)=> ({
                        ...prevFormValues,
                        [e.target.name] : e.target.value
                    }))
                ) }>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </Select>
                {
                    errors && errors.role && errors.role.length > 0 ? (
                        <FormHelperText>{errors.role}</FormHelperText>
                    ) : null
                }
            </FormControl>
            <TextField
                variant="outlined"
                name="password"
                label="Password"
                size="small"
                value={formvalues.password}
                onChange={handleInputChange}
                type="password"
                {...errors? {error: (errors.password ? true : false), helperText: errors.password} : false}
            />
            <TextField
                variant="outlined"
                name="cPassword"
                label="Confirm Password"
                size="small"
                value={formvalues.cPassword}
                onChange={handleInputChange}
                type="password"
                {...errors? {error: (errors.cPassword? true : false), helperText: errors.cPassword} : false}
            />
            <Button onClick={handleSubmit} type="button" variant="contained" size="small">
                Create
            </Button>
        </Box>
    </>
  )
}

export default CreateUser