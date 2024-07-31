import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';

export const mainListItems = (handleProfile,handleLogout,handleBook)=>(
    <>
    
    <React.Fragment>
    <ListItemButton >
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" onClick={handleProfile}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EventIcon/>
      </ListItemIcon>
      <ListItemText primary="Booked slot" onClick={handleBook}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="logout" onClick={handleLogout} />
    </ListItemButton>
    
    
  </React.Fragment> 
    </>
)
 
