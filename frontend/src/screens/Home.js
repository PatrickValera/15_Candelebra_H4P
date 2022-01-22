import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart'
import PortfolioPanel from '../components/PortfolioPanel'
const Home = () => {
  const [cash,setCash]=useState(10000)
  const [portfolio,setPortfolio]=useState({})
  useEffect(()=>{
    console.log('hello')
    console.log(portfolio)
  },[portfolio])
  return (
    <>
      <Box display='flex'>
        <Box sx={{ flex: '1 1 200px' }}>
          <Box>
            <Typography variant='h1'>Stock Market</Typography>
            <Typography variant='h1'>Trending Stocks</Typography>
            <Typography variant='body2'>{portfolio['FP']}</Typography>
            <Typography variant='body2'>{portfolio['XIN']}</Typography>
            <Typography variant='body2'>{portfolio['PAL']}</Typography>
          </Box>
          <Box display='flex' sx={{flexWrap:'wrap'}}>
            <Box sx={{flex:'1 1 320px', border:'2px solid green'}}>
              <Chart ticker='FP' setPortfolio={setPortfolio} setCash={setCash} portfolio={portfolio} cash={cash}/>
            </Box>
            <Box sx={{flex:'1 1 320px', border:'2px solid green'}}>
              <Chart ticker='XIN' setPortfolio={setPortfolio} setCash={setCash} portfolio={portfolio} cash={cash}/>
            </Box>
            <Box sx={{flex:'1 1 320px', border:'2px solid green'}}>
              <Chart ticker='PAL' setPortfolio={setPortfolio} setCash={setCash} portfolio={portfolio} cash={cash}/>
            </Box>
         
          </Box>
        </Box>
        <Box sx={{ flex: '0 0 300px',border:'2px solid red' }}>
          <PortfolioPanel cash={cash} portfolio={portfolio}/>

        </Box>

      </Box>
    </>
  )
};

export default Home;
