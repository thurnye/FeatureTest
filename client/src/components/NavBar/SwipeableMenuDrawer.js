import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { getRandomInt } from '../../util/helperFunc';

export default function SwipeableMenuDrawer({items}) {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);

  const handleClick = (path) => {
    setState(false);
    navigate(path)
  }

  return (
    <div>
        <React.Fragment>
          {/* <Button onClick={() => setState(!state)}>{anchor}</Button> */}
          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setState(!state)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={state}
            onClose={() => setState(!state)}
            onOpen={() => setState(!state)}
          >
            <Box
              sx={{ width: 250, height: '100%', p: 2 }}
              role="presentation"
            >
              <List sx={{height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {items.map((nav, index) => (
                  <ListItem key={getRandomInt()} disablePadding>
                    <ListItemButton onClick={() => setState(!state)} sx={{textAlign: 'center', mb: 4}}>
                      <Link to={nav.path} style={{color: '#000000A6', width: '100%'}}>{nav.name}</Link>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}