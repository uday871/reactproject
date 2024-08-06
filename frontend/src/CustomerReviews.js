import React from 'react';
import { Box, Typography, Grid, Button, IconButton, Rating } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedIcon from '@mui/icons-material/Verified';

const CustomerReviews = () => {
  return (
    <div className="reviews" style={{marginTop:'200px',backgroundColor:'',color:''}}>
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={3} textAlign="center">
          <IconButton>
            <SwapHorizIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Easy exchange</Typography>
          <Typography variant="body2">Hassle free exchange process</Typography>
        </Grid>
        <Grid item xs={12} sm={3} textAlign="center">
          <IconButton>
            <LocalShippingIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Cash on Delivery</Typography>
          <Typography variant="body2">COD available on all orders</Typography>
        </Grid>
        <Grid item xs={12} sm={3} textAlign="center">
          <IconButton>
            <LockIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">Secure Payment</Typography>
          <Typography variant="body2">Fully trusted payment gateway</Typography>
        </Grid>
        <Grid item xs={12} sm={3} textAlign="center">
          <IconButton>
            <VerifiedIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">LIVA Certified</Typography>
          <Typography variant="body2">Premium Soft Fluidic Viscose fabric</Typography>
        </Grid>
      </Grid>


      <Box sx={{ textAlign: 'center', mt: 10,display:'' }}>
        <Typography variant="h5">Customer Reviews</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
          <Rating value={5} readOnly />
          <Typography variant="h6" sx={{ ml: 1 }}>5.00 out of 5</Typography>
        </Box>
        <Typography variant="body2">Based on 5 reviews</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>5</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={4} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>0</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={3} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>0</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={2} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>0</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>0</Typography>
            </Box>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 2 }}>Write a review</Button>
      </Box>
    </Box>






    </div>
  );
};

export default CustomerReviews;
