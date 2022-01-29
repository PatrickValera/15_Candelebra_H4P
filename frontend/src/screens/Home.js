import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Chart from '../components/Chart'
import PortfolioPanel from '../components/PortfolioPanel'
import {modifier} from '../modifiers'
import axios from 'axios'
import { io } from "socket.io-client";

const Home = () => {
  // console.log(modifier)
  const [tickers,setTickers]=useState([])
  const [total, setTotal] = useState(0)
  const [cash, setCash] = useState(10000)
  const socket=useRef()
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
  const fetchData=async()=>{
    const {data}=await axios.get('/api/stock')
    setTickers(data)
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
    socket.current = io(window.location.pathname);
    // console.log(socket.current)
  },[])
  return (
    <>
      <Box display='flex' sx={{position:'relative', flexWrap:'wrap'}}>
        {/* ========HEADER============================ */}
        <Box sx={{ flex: '1 1 400px', p: 3 , order:{xs:'2',md:'1'}}}>
          <Box>
            <Typography variant='h1' fontWeight='700'>Stonk Market</Typography>
            <Typography variant='h5' color='grey.600'>Trending Stonks</Typography>

          </Box>
          {/* ========TICKERS============================ */}
          <Box display='flex' sx={{ width: '100%', flexWrap: 'wrap', p: 1 }}>
            {socket.current&&tickers.map((tick, index) => {
              return (
              <Chart news={modifier[Math.floor(Math.random()*2)]} key={index} tick={tick} socket={socket}  setCash={setCash} cash={cash} 
              // portfolio={portfolio} setPortfolio={setPortfolio}  
              />
            )})}
          </Box>
        </Box>
        {/* ========SIDE============================ */}
        <Box sx={{ flex: {xs:'1 1 100%',md:'0 0 300px'} , order:{xs:'1',md:'2'}}}>
          <PortfolioPanel socket={socket} cash={cash} portfolio={portfolio} total={total} tickers={tickers}/>
        </Box>

      </Box>
    </>
  )
};
// const tickers = [{
//   ticker: 'PAN',
//   name: 'Frying Pan',
//   color: '#E4DD2F',
//   startingValue: 200
// }, {
//   ticker: 'Oui',
//   name: 'OuiMi Inc.',
//   color: '#EFA051',
//   startingValue: 150
// }, {
//   ticker: 'SIMP',
//   name: 'Flepal LLC.',
//   color: '#51A0EF',
//   startingValue: 100
// }, {
//   ticker: 'ZAO',
//   name: 'Irene Zhao',
//   color: '#EF51A0',
//   startingValue: 15000
// }, {
//   ticker: 'CYNO',
//   name: 'CYNO Media',
//   color: '#C548C5',
//   startingValue: 10000
// }, {
//   ticker: 'AWAD',
//   name: 'AWAD Corp.',
//   color: '#48C5C5',
//   startingValue: 700
// },]
export default Home;
