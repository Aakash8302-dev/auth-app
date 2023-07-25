import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import {Box, IconButton, Table, TableBody, TableCell, TableRow, TableHead} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsers } from "../api"
import { IUser } from "../types"
import { deleteUser } from "../api";
import { getUser } from "../api/storage";


const styles = {
    userRoot:{
        backgroundColor: "#f0f0f0",
        borderRadius: "5px",
        padding: "0 10px",
        margin: "2rem 0",
        minHeight: "3rem",
        display: "flex",
        alignItems: "center",
        userInfo:{
            minWidth:"80%",
            row:{
                minWidth: "5rem"
            }
        }
    },
    deleteIcon:{
        padding: "0",
        marginLeft: "auto"
    }
}


const Users = () => {

 const userInfo = getUser()?.user

  const queryClient = useQueryClient();
 
  const {data:usersData, status,} = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ["users"]
  })

  const userDeleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
        queryClient.invalidateQueries(["users"])
    }
  })

 

  if(status === "loading") return <h4>Loading....</h4>

  return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {   
            usersData?.data.map((user:IUser,index:number) => (
                <TableRow key={index} sx={{...styles.userRoot.userInfo}}  >          
       
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                 {
                    userInfo && (userInfo.role==="admin") && userInfo.id !== user._id ? (
                        <TableCell>
                            <IconButton onClick={()=> userDeleteMutation.mutate(user._id)} sx={{...styles.deleteIcon}}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    ): <TableCell></TableCell>
                 }
                </TableRow>
            ))
        }
        </TableBody>
    </Table>
  )
}

export default Users