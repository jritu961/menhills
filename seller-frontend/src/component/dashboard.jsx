import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, TextField, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';

const Sidebar = () => (
  <Box
    sx={{
      width: '200px',
      backgroundColor: '#2C3E50',
      height: '100vh',
      paddingTop: '20px',
      position: 'fixed',
    }}
  >
    <Typography variant="h6" sx={{ color: 'white', paddingLeft: '20px' }}>Seller Dashboard</Typography>
    <Button
      sx={{ color: 'white', display: 'block', marginTop: '20px', paddingLeft: '20px' }}
      component={Link}
      to="/"
    >
      Dashboard
    </Button>
    <Button
      sx={{ color: 'white', display: 'block', marginTop: '20px', paddingLeft: '20px' }}
      component={Link}
      to="/list-product"
    >
      Product
    </Button>
  
    <Button
      sx={{ color: 'white', display: 'block', marginTop: '20px', paddingLeft: '20px' }}
      component={Link}
      to="/day-wise-sales"
    >
      Day Wise Sales
    </Button>
    <Button
      sx={{ color: 'white', display: 'block', marginTop: '20px', paddingLeft: '20px' }}
      component={Link}
      to="/add-product"
    >
      Add Product
    </Button>
    <Button
      sx={{ color: 'white', display: 'block', marginTop: '20px', paddingLeft: '20px' }}
      component={Link}
      to="/delete-product"
    >
      Delete Product
    </Button>
    <Button
      sx={{ color: 'white', display: 'block', marginTop: '20px', paddingLeft: '20px' }}
      component={Link}
      to="/returns-cancellations"
    >
      Returns & Cancellations
    </Button>
  </Box>
);

const Header = () => (
  <AppBar position="sticky" sx={{ backgroundColor: '#34495E' }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Seller Dashboard
      </Typography>
      <Button color="inherit" component={Link} to="/">Logout</Button>
    </Toolbar>
  </AppBar>
);

const UpdateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Product Updated', productData);
  };

  return (
    <Box sx={{ marginLeft: '220px', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Update Product</Typography>
      <TextField
        label="Product Name"
        name="name"
        value={productData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        value={productData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        name="category"
        value={productData.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Update Product
      </Button>
    </Box>
  );
};

const DayWiseSales = () => {
  const salesData = [
    { date: '2024-12-25', totalSales: '$500', productsSold: 20 },
    { date: '2024-12-26', totalSales: '$800', productsSold: 30 },
  ];

  return (
    <Box sx={{ marginLeft: '220px', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Day-Wise Sales</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Total Sales</TableCell>
            <TableCell>Products Sold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.totalSales}</TableCell>
              <TableCell>{row.productsSold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Product Added', productData);
  };

  return (
    <Box sx={{ marginLeft: '220px', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Add Product</Typography>
      <TextField
        label="Product Name"
        name="name"
        value={productData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
  label="Store Name"
  name="storeName"
  //value={ //value={sellerData.storeName}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

<TextField
  label="Total Sales"
  name="totalSales"
  //value={sellerData.totalSales}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Pending Orders"
  name="pendingOrders"
  // value={ //value={sellerData.pendingOrders}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Completed Orders"
  name="completedOrders"
  // value={ //value={sellerData.completedOrders}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Total Revenue"
  name="totalRevenue"
  // value={ //value={sellerData.totalRevenue}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Refunded Amount"
  name="refundedAmount"
  // value={ //value={sellerData.refundedAmount}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Current Inventory"
  name="currentInventory"
  // value={ //value={sellerData.currentInventory}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Active Products"
  name="activeProducts"
  // value={ //value={sellerData.activeProducts}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Low Stock Alerts"
  name="lowStockAlerts"
  // value={ //value={sellerData.lowStockAlerts}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Total Customers"
  name="totalCustomers"
  // value={ //value={sellerData.totalCustomers}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Customer Ratings"
  name="customerRatings"
  // value={ //value={sellerData.customerRatings}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Product Categories"
  name="productCategories"
  // value={ //value={sellerData.productCategories}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

<TextField
  label="Pending Shipments"
  name="pendingShipments"
  // value={ //value={sellerData.pendingShipments}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Shipped Orders"
  name="shippedOrders"
  // value={ //value={sellerData.shippedOrders}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Return Requests"
  name="returnRequests"
  // value={ //value={sellerData.returnRequests}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Active Discounts"
  name="activeDiscounts"
  // value={ //value={sellerData.activeDiscounts}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Today's Sales"
  name="todaysSales"
  // value={ //value={sellerData.todaysSales}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Today's Returns"
  name="todaysReturns"
  // value={ //value={sellerData.todaysReturns}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

<TextField
  label="Recent Reviews"
  name="recentReviews"
  // value={ //value={sellerData.recentReviews}
  onChange={handleChange}
  fullWidth
  margin="normal"
  multiline
  rows={4}
/>

<TextField
  label="Refund Requests"
  name="refundRequests"
  // value={ //value={sellerData.refundRequests}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="number"
/>

      <TextField
        label="Price"
        name="price"
        value={productData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Category"
        name="category"
        value={productData.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Product
      </Button>
    </Box>
  );
};

const DeleteProduct = () => (
  <Box sx={{ marginLeft: '220px', padding: '20px' }}>
    <Typography variant="h5" gutterBottom>Delete Product</Typography>
    <TextField
      label="Product ID"
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="secondary">
      Delete Product
    </Button>
  </Box>
);

const ReturnsCancellations = () => (
  <Box sx={{ marginLeft: '220px', padding: '20px' }}>
    <Typography variant="h5" gutterBottom>Returns & Cancellations</Typography>
    <Typography variant="body1">Manage return requests and cancellations here.</Typography>
  </Box>
);

const Dashboard = () => (
  <Box display="flex" minHeight="100vh">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Header />

      {/* Content Area */}
      <Container sx={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Typography variant="h5">Welcome to the Seller Dashboard</Typography>} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/day-wise-sales" element={<DayWiseSales />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
          <Route path="/returns-cancellations" element={<ReturnsCancellations />} />
        </Routes>
      </Container>
    </Box>
  </Box>
);

export default Dashboard;
