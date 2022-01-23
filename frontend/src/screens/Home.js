import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart'
import PortfolioPanel from '../components/PortfolioPanel'
import {modifier} from '../modifiers'

const tickers = [{
  ticker: 'PAN',
  name: 'Frying Pan',
  color: '#EBEB50',
  startingValue: 200
}, {
  ticker: 'Oui',
  name: 'OuiMi Inc.',
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
  name: 'CYNO Media',
  color: '#C548C5',
  startingValue: 10000
}, {
  ticker: 'AWAD',
  name: 'AWAD Corp.',
  color: '#48C5C5',
  startingValue: 700
},]
const Home = () => {
  console.log(modifier)
  const [total, setTotal] = useState(0)
  const [cash, setCash] = useState(10000)
  const [portfolio, setPortfolio] = useState({})

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
              <Chart news={modifier[0]} key={index} tick={tick} setPortfolio={setPortfolio} setCash={setCash} portfolio={portfolio} cash={cash} />
            ))}
          </Box>
        </Box>
        {/* ========SIDE============================ */}
        <Box sx={{ flex: '0 0 300px' }}>
          <PortfolioPanel cash={cash} portfolio={portfolio} total={total} tickers={tickers}/>
        </Box>

      </Box>
    </>
  )
};

export default Home;
