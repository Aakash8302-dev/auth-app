import {ChangeEvent, useState, FormEvent} from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import {Box, TextField, Typography,Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, ListItemText, OutlinedInput, Checkbox} from "@mui/material"
import { IUserCreate } from "../types"
import { createUser } from "../api"
import { SelectChangeEvent } from "@mui/material/Select"
import { useNavigate } from "react-router-dom"
import { getOptionalRoutes } from "../api/route.api"

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

// const Permissions = [
//     'PERMISSIONS_CREATE_USER'
// ]

interface componentProps {
    setComponent : (value: number) => void
}

type IoptionalPermissions = {
    value: string,
    logicalTerm: string
}

const CreateUser:React.FC<componentProps> = ({setComponent}) => {

  const [perm, setPerm] = useState<string[]>([])

  const {data:optionalPermissions, status} = useQuery({
    queryFn: getOptionalRoutes,
    queryKey: ["OptionalRoutes"]
  })

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
        setComponent(1);
    }
  })

  const [formvalues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    cPassword: "",
    permissions: [""]
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

    console.log(perm);
    
        // if(validate()){
        //     createUserMutation.mutate(formvalues)
        // }
  }

  const validate = ():boolean => {

    let temp:IUserCreate= {
        name: null,
        email: null,
        role: null,
        password: null,
        cPassword: null,
        permissions: null
    }

    temp.name = formvalues.name ? "" : "This Field is required"
    temp.email = formvalues.email ? "" : "This field is required"
    temp.role = formvalues.role ? "" : "This field is required"
    temp.password = formvalues.password ? "" : "This field is required"
    temp.cPassword = formvalues.cPassword ? ( formvalues.password !== formvalues.cPassword ? "Passwords do not match" : "" ) : "This field is required"
    temp.permissions = formvalues.permissions ? "" : ""

    setErrors({
        ...temp
    })

    return Object.values(temp).every(x => x === "")
  }

  const handleMultipleSelect = (event: SelectChangeEvent<typeof perm>) => {
    const { target: {value}} = event;

    setPerm(
        typeof value === 'string' ? value.split(',') : value,
      );

    // setFormValues(()=> ({
    //     ...formvalues,

    // }))

    //   setFormValues(() => ({
    //     ...formvalues,
    //     ["permissions"] : ["hello"]
    //   }))

    };

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
            <FormControl sx={{marginTop: "1rem"}}>
                <InputLabel id="userPermissionsSelect">Permissions</InputLabel>
                <Select 
                    label="Permissions"
                    labelId="userPermissionsSelect"
                    multiple
                    onChange={handleMultipleSelect} 
                    value={perm}
                    renderValue={(selected) => {
                        let selectedPermissions:string[] = []
                        optionalPermissions?.data.map((permission:IoptionalPermissions) => {
                            if(selected.includes(permission.value)){
                                selectedPermissions.push(permission.logicalTerm);
                            }
                        })
                        return selectedPermissions.join(', ')
                    }}
                >
                    {
                        optionalPermissions && optionalPermissions?.data.map((permission:IoptionalPermissions) => (
                            <MenuItem key={permission.value} value={permission.value}>
                                <Checkbox checked={perm.indexOf(permission.value) > -1} />
                                <ListItemText primary={permission.logicalTerm} />
                            </MenuItem>
                        ))
                    }
                </Select>
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