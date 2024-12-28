
export const Header = ({ handleDrawerToggle }) => (
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
          placeholder="Search..."
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            width: { xs: '100%', sm: '300px' },
          }}
          InputProps={{
            style: { padding: '0 8px' },
          }}
        />
        <Button color="inherit" sx={{ ml: 1 }}>
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
  