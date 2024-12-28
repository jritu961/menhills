import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { Link, Route, Routes,useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerWidth = 250;

  const drawer = (
    <Box
      sx={{
        backgroundColor: '#1A237E',
        color: 'white',
        height: '100%',
        paddingTop: 2,
      }}
    >
      <Typography variant="h6" sx={{ padding: '20px' }}>
        Seller Dashboard
      </Typography>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: 'white' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/list-product">
          <ListItemIcon sx={{ color: 'white' }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/day-wise-sales">
          <ListItemIcon sx={{ color: 'white' }}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Sales Analytics" />
        </ListItem>
        <ListItem button component={Link} to="/add-product">
          <ListItemIcon sx={{ color: 'white' }}>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon sx={{ color: 'white' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};


 const Header = ({ handleDrawerToggle }) => {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchId.trim()) {
      console.log(`Navigating to /product/${searchId}`);
      navigate(`/product/${searchId}`);
    } else {
      alert('Please enter a valid product ID');
    }
  };
  

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 250px)` },
        ml: { sm: '250px' },
        backgroundColor: '#3949AB',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Seller Dashboard
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            width: { xs: '100%', sm: '300px' },
          }}
          InputProps={{
            style: { padding: '0 8px' },
          }}
        />
        <Button color="inherit" sx={{ ml: 1 }} onClick={handleSearch}>
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
};


const DashboardContent = () => (
  <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom>
      Welcome to Your Dashboard
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#1E88E5', color: 'white' }}>
          <CardContent>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4">$15,000</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#43A047', color: 'white' }}>
          <CardContent>
            <Typography variant="h6">Products Sold</Typography>
            <Typography variant="h4">120</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#FB8C00', color: 'white' }}>
          <CardContent>
            <Typography variant="h6">Active Orders</Typography>
            <Typography variant="h4">25</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#E53935', color: 'white' }}>
          <CardContent>
            <Typography variant="h6">Returns</Typography>
            <Typography variant="h4">5</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/day-wise-sales" element={<Typography>Sales Analytics</Typography>} />
          <Route path="/add-product" element={<Typography>Add Product</Typography>} />
          <Route path="/settings" element={<Typography>Settings</Typography>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
