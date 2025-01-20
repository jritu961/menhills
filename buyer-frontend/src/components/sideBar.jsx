import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  FavoriteBorder as WishlistIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Cart", icon: <ShoppingCartIcon />, path: "/cart" },
    { text: "Orders", icon: <FavoriteIcon />, path: "/order" },
    { text: "Wishlist", icon: <WishlistIcon />, path: "/wishlist" }, // Added Wishlist Option
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    // { text: "Logout", icon: <LogoutIcon />, path: "/login" },
  ];

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "black", // Set background color to black
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: "none" } }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Responsive Sidebar */}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Temporary Drawer for Smaller Screens */}
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
          },
          display: { md: "none" }, // Hide on larger screens
        }}
      >
        <Box
          sx={{ width: 240 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)} // Use navigate to redirect
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Persistent Drawer for Larger Screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" }, // Show only on larger screens
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
        open
      >
        <Box sx={{ width: 240, height: "100%" }}>
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)} // Use navigate to redirect
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
