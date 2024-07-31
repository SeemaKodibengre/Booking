import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { toast, ToastContainer } from 'react-toastify';
import { mainListItems } from './ListItem';
import { useNavigate } from 'react-router-dom';







const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const defaultTheme = createTheme();

export default function Dashboard() {

  const authentication = localStorage.getItem("token");
  if (!authentication) {
    window.location.href = "/";
  }


  const navigate = useNavigate()
  const user_id = JSON.parse(localStorage.getItem('user'))
  const token = JSON.parse(localStorage.getItem('token'));






  const [value, setValue] = useState(dayjs('2024-07-29'));
  const [open, setOpen] = useState(true);






  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    fetchTimeSlots(value);
  }, [value]);

  const karnatakaDistrict = [
    'Bagalkot',
    'Bangalore Rural',
    'Bangalore Urban',
    'Belagavi (Belgaum)',
    'Ballari (Bellary)',
    'Bengaluru (Bangalore) South',
    'Bengaluru (Bangalore) North',
    'Bidar',
    'Chamarajanagar',
    'Chamrajnagar',
    'Chikkaballapur',
    'Chikkamagaluru (Chikmagalur)',
    'Chitradurga',
    'Dakshina Kannada (South Canara)',
    'Davangere',
    'Dharwad',
    'Gadag',
    'Hassan',
    'Haveri',
    'Kalaburagi (Gulbarga)',
    'Kodagu (Coorg)',
    'Kolar',
    'Koppal',
    'Mandya',
    'Mysuru (Mysore)',
    'Raichur',
    'Ramanagara',
    'Shimoga (Shivamogga)',
    'Tumakuru (Tumkur)',
    'Udupi',
    'Uttara Kannada (Karwar)',
    'Yadgir'
  ];

  const [district, setDistrict] = useState('');

  const handleChange = (event) => {
    setDistrict(event.target.value);
  };



  const fetchTimeSlots = async (date) => {
    try {
      const formattedDate = date.format('YYYY-MM-DD');

      const response = await axios.post('http://localhost:7000/bookSlot/getTimeSlot', { date: formattedDate });

      setTimeSlots(response.data.slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };



  const handleSlotClick = async (slot) => {

    try {
      const formattedDate = value.format('YYYY-MM-DD');


      console.log('Booking slot with data:', { user_id, date: formattedDate, time: slot.time, district });
      const response = await axios.post('http://localhost:7000/bookSlot/insertBook', { user_id, date: formattedDate, time: slot.time, district }, {
        headers: {
          'token': token
        }
      });
      toast.success('Booked successfull')
      fetchTimeSlots(value);
    } catch (error) {
      console.error('Error booking slot:', error);
      toast.error('error booking slot')
      if (error.response && error.response.data.error === 'Slot is full') {
        toast.error('one user can book only one slot')
      } else {
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleProfile = () => {
    navigate('/profile')
  }
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    window.location.href = "/";
  }
  const handleBook = () => {
    navigate('/view')
  }
  const menuItems = mainListItems(handleProfile, handleLogout, handleBook)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">

            {menuItems}

          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 3 }}>
            <Grid container spacing={3}>

              <Grid item md={6} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',

                    height: 500,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>

                      <DemoItem label="calendar">
                        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>




                  <FormControl sx={{ width: '200px' }}>
                    <InputLabel id="district">Select District</InputLabel>
                    <Select

                      id="district"
                      value={district}
                      label="Destrict"
                      onChange={handleChange}
                    >{karnatakaDistrict.map((dis, index) => (
                      <MenuItem value={dis} key={index}>{dis}</MenuItem>

                    ))}




                    </Select>
                  </FormControl>
                </Paper>


              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {timeSlots.map((slot, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '33.33%',
                        backgroundColor: slot.bookings >= 3 ? '#d32f2f' : '#1769aa',
                        border: '1px solid black',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: slot.bookings >= 3 ? 'not-allowed' : 'pointer',
                        color: 'white',
                      }}
                      onClick={() => slot.bookings < 3 && handleSlotClick(slot)}
                    >
                      {slot.time} {slot.bookings >= 3 ? '(Full)' : ''}
                    </Box>
                  ))}
                </Paper>
              </Grid>

            </Grid>

          </Container>
        </Box>
      </Box>
      <ToastContainer />

    </ThemeProvider>

  );
}