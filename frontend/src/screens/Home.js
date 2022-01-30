import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Chart from '../components/Chart'
import PortfolioPanel from '../components/PortfolioPanel'
import { modifier } from '../modifiers'
import axios from 'axios'
import { io } from "socket.io-client";

const Home = () => {
  // console.log(modifier)
  const [tickers, setTickers] = useState(null)
  const [total, setTotal] = useState(0)
  const [cash, setCash] = useState(10000)
  const socket = useRef()
  const [portfolio, setPortfolio] = useState({})

  // useEffect(()=>{
  //     let tot=0
  //   // console.log('CALCULATING=====')
  //   for (const prop in portfolio) {
  //     // console.log(prop)
  //     let aNum=portfolio[prop].value
  //     if(portfolio[prop])tot = tot+aNum
  //     // console.log(tot)

  //   }
  //   setTotal(tot)
  // },[portfolio])
  const fetchData = async () => {
    const { data } = await axios.get('/api/stock')
    setTickers(data)
    console.log(data)
  }
  useEffect(() => {
    fetchData()
    socket.current = io(window.location.pathname);
    // console.log(socket.current)
  }, [])
  return (
    <>
      <Box display='flex' sx={{ position: 'relative', flexWrap: { xs: 'wrap', sm: 'noWrap',minHeight:'95vh' } }}>
        {/* ========HEADER============================ */}
        <Box sx={{ flex: '1 5 250px', p: { xs: 1, md: 3 }, order: { xs: '2', sm: '1' }, }}>
          <Box>
            <Typography variant='h1' fontWeight='700'>Stonk Market</Typography>
            <Typography variant='h5' color='grey.600'>Trending Stonks</Typography>

          </Box>
          {/* ========TICKERS============================ */}
          <Box display='flex' sx={{ flexWrap: 'wrap' }}>
            {tickers ? socket.current && tickers.map((tick, index) => {
              return (
                <Box key={index} sx={{width:{xs:'100%', md:'50%'}, p:1}}>
                  <Chart news={modifier[Math.floor(Math.random() * 2)]} tick={tick} socket={socket} setCash={setCash} cash={cash} />
                </Box>
              )
            }) : 'LOADING'}
          </Box>
        </Box>
        {/* ========SIDE============================ */}
        <Box sx={{ flex: { xs: '1 1 250px', sm: '0 1 300px' }, order: { xs: '1', sm: '2' } }}>
          <PortfolioPanel socket={socket} cash={cash} portfolio={portfolio} total={total} tickers={tickers} />
        </Box>

      </Box>
    </>
  )
};

export default Home;
