import { Box, Typography } from '@mui/material';
import React, { Profiler, useEffect, useState } from 'react';
import Chart from '../components/Chart'
import PortfolioPanel from '../components/PortfolioPanel'


const tickers = [{
  ticker: 'PAN',
  name: 'Frying Pan',
  color: '#EFEF51',
  startingValue: 200
}, {
  ticker: 'XIN',
  name: 'Xin inc.',
  color: '#EFA051',
  startingValue: 150
}, {
  ticker: 'SIMP',
  name: 'Flepal LLC.',
  color: '#51A0EF',
  startingValue: 100
}, {
  ticker: 'ZAO',
  name: 'Irene Zhao',
  color: '#EF51A0',
  startingValue: 15000
}, {
  ticker: 'CYNO',
  name: 'CYNO Limited',
  color: '#C548C5',
  startingValue: 10000
}, {
  ticker: 'AWAD',
  name: 'AWAD corp.',
  color: '#48C5C5',
  startingValue: 700
},]
const Home = () => {
  const [total, setTotal] = useState(0)
  const [cash, setCash] = useState(10000)
  const [portfolio, setPortfolio] = useState({})

  // const calcTotal = () => {
  //   let tot=0
  //   console.log('CALCULATING=====')
  //   for (const prop in portfolio) {
  //     console.log(prop)
  //     let aNum=portfolio[prop].value
  //     if(portfolio[prop])tot = tot+aNum
  //     console.log(tot)

  //   }
  //   setTotal(tot)
  // }
  // useEffect(() => {
  //   // console.log('hello')
  //   // console.log(portfolio)
  //   const totalInterval = setInterval(() => {
  //     console.log('starting interval')
  //     calcTotal()
  //   },5000)
  //   return () => {
  //     console.log('cleaning up intervals')
  //     clearInterval(totalInterval);
  // }


  // }, [])
  useEffect(()=>{
      let tot=0
    // console.log('CALCULATING=====')
    for (const prop in portfolio) {
      // console.log(prop)
      let aNum=portfolio[prop].value
      if(portfolio[prop])tot = tot+aNum
      // console.log(tot)

    }
    setTotal(tot)
  },[portfolio])

  return (
    <>
      <Box display='flex' sx={{position:'relative'}}>
        {/* ========HEADER============================ */}
        <Box sx={{ flex: '1 1 200px', p: 3 }}>
          <Box>
            <Typography variant='h1' fontWeight='700'>Stonk Market</Typography>
            <Typography variant='h5' color='grey.600'>Trending Stonks</Typography>

          </Box>
          {/* ========TICKERS============================ */}
          <Box display='flex' sx={{ width: '100%', flexWrap: 'wrap', p: 1 }}>
            {tickers.map((tick, index) => (
              <Chart key={index} tick={tick} setPortfolio={setPortfolio} setCash={setCash} portfolio={portfolio} cash={cash} />
            ))}
          </Box>
        </Box>
        {/* ========SIDE============================ */}
        <Box sx={{ flex: '0 0 300px' }}>
          <PortfolioPanel cash={cash} portfolio={portfolio} total={total} />
        </Box>

      </Box>
    </>
  )
};

export default Home;
