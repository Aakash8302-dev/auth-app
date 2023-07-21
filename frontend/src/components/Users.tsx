import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import {Box, IconButton} from "@mui/material"
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-Evenly"
        }
    },
    deleteIcon:{
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
    <div>
        {
            usersData?.data.map((user:IUser,index:number) => (
                <Box key={index} sx={{...styles.userRoot}}>
                    <Box sx={{...styles.userRoot.userInfo}}>
                        <Box>{user.name}</Box>
                        <Box>{user.email}</Box>
                        <Box>{user.role}</Box>
                    </Box>
                    {
                        userInfo && (userInfo.role==="admin") && userInfo.id !== user._id ? (
                            <IconButton onClick={()=> userDeleteMutation.mutate(user._id)} sx={{...styles.deleteIcon}}>
                                <DeleteIcon />
                            </IconButton>
                        ): <Box></Box>
                    }
                    
                </Box>
            ))
        }
    </div>
  )
}

export default Users