
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from '@mui/material';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import Tenders from './Tenders';
import FindPartner from './FindPartner';
import CommunitySessions from './CommunitySessions';

const drawerWidth = 240;

const SellerDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('viewProducts');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'addProduct':
        return <AddProduct />;
      case 'viewProducts':
        return <ViewProducts />;
      case 'tenders':
        return <Tenders />;
      case 'findPartner':
        return <FindPartner />;
      case 'communitySessions':
        return <CommunitySessions />;
      default:
        return <Typography>Select an option from the sidebar.</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           FempreneursHub 
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Seller Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedPage('addProduct')}>
            <ListItemText primary="Add Product" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('viewProducts')}>
            <ListItemText primary="View Products" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('communitySessions')}>
            <ListItemText primary="Community Sessions" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('findPartner')}>
            <ListItemText primary="Find Partner" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage('tenders')}>
            <ListItemText primary="Tenders" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default SellerDashboard;
