import { Box, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
      <Box display='flex' sx={{alignItems:'center'}}>
          <Box sx={{width:'35px'}}>
              <img className='image-fit-cover' src='./candle.png' alt='logo?'/>
          </Box>
          <Typography varaint='h2'>CANDELEBRA</Typography>
      </Box>
  )
};

export default Header;
