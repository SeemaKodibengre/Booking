import  React,{useState,useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ServerModal() {
const navigate=useNavigate()
const [user,setUser]=useState();
const [close,setClose]=useState(true)

useEffect(()=>{
   const fetchUserInfo=async()=>{
   try{
            const user_id=JSON.parse(localStorage.getItem('user'));
            console.log(user_id,'id')
            const data=await axios.get(`http://localhost:7000/app/viewOne/${user_id}`);
setUser(data.data);
        }catch(err){
            console.error('Error fetching user data:', err);
        }
        
    }
    fetchUserInfo();  
},[])
const closeModel=()=>{
setClose(false)
navigate('/dash')
}
  return (
   <>
      <Modal
      
        open={close}       
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
       
      >
        <Card sx={{ minWidth: 275 }}>
        <CardHeader
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}
        avatar={
          <Avatar  aria-label="profile">
            
          </Avatar>
        }
       
      />
        {user?(

       
      <CardContent>
       <Typography variant="h5">
        Name: {user.username}
        </Typography>
      
        <Typography  color="text.secondary">
        Email:{user.email}
        </Typography>
        <Typography color="text.secondary">
       Address:{user.address}
        
        </Typography>

      </CardContent>

):(
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
 loading......
   </Typography>

    )}
   <CardActions>
   <Button className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModel}>CLOSE</Button>
   </CardActions>
   
</Card>
</Modal> 
</>
)
}



