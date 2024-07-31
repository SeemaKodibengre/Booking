import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, useNavigate } from 'react-router-dom';
import Axios from 'axios'

import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import { InputAdornment,IconButton } from '@mui/material';





const defaultTheme = createTheme();

export default function SignUp() {
  const [showPass,setShowPass]=useState(false);
  const handleClickShowPassword=()=>{
    setShowPass(!showPass)
  }

  const navigate=useNavigate();

    const [item,setItem]=useState()

    const Click=(e)=>{
setItem({...item,[e.target.name]:e.target.value});
console.log(item)
    }
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Form Data:', item);
   try{
const formData=new FormData();
formData.append('username',item.username)
formData.append('email',item.email)
formData.append('address',item.address)
formData.append('password',item.password)


const response=await Axios.post("http://localhost:7000/app/register",formData,{
  headers: {
    'Content-Type': 'application/json'   
  }
});
console.log('Response Status:', response.status); 
console.log('Response Data:', response.data); 


if(response.status==200){
   const responseData=response.data;
  
   
   
  
    toast.success('Registration successfull');
    setTimeout(()=>{
    navigate('/login');
    },2000)
 
   
}


} catch (err) {
console.error('Error during form submission:', err); 
toast.error('This email already exists!!!Fail to register');
   }
   
  };
 

  return (
    < >
    
    <Box >

  
     <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
           
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
             backgroundColor:'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            padding: '20px',
            paddingRight:'35px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ ml: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(e)=>Click(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  onChange={(e)=>Click(e)}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  onChange={(e)=>Click(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
            type={showPass?"text":"password"}
                  id="password"
                  onChange={(e)=>Click(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          aria-label="toggle password visibility"
                        >
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                 
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  
    </Box>
  
    </>
   
  );
}