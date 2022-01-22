import { Button, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const Home = () => {
  const [avgCost,setAvgCost]=useState(0)
  const [shares,setShares]=useState(0)
  const [day, setDay] = useState(0)
  const [data, setData] = useState([])
  const [target, setTarget] = useState(500)
  const [volatility, setVolatility] = useState(2)
  const [currentPrice, setCurrentPrice] = useState(50)
  const [range,setRange]=useState(30)
  // useState( [{ name: 1, uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },])

  const handleClick = () => {
    setDay(state => state + 1)
    // console.log('PUSHING ',num)


  }
  useEffect(() => {
    console.log('setting Interval')
    const interval = setInterval(() => {
      handleClick()
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {


    //CALCULATE NEW PRICE HERE
    const percent=((target-currentPrice)/target)*100
    // console.log(percent.toFixed(2), "% away from target")

    const aNum=Math.random()*100
    
    let multiplier
    if(percent+20>aNum){
      multiplier=1
    }else{
      multiplier=-1
    }
    const deltaPercent = (Math.random()*volatility)/100

    const newPrice=(currentPrice+currentPrice*deltaPercent*multiplier)
    //END CALCULATE NEW PRICE HERE



    setCurrentPrice(newPrice)
    const obj = { name: day, uv: newPrice, pv: 2400, amt: 2400 }
    setData(state => [...state, obj])
  }, [day]);

  return (
    <>
      <Typography variant='body1' color='green'>PRICE: ${currentPrice.toFixed(2)}</Typography>
      <Typography variant='body1' color='success'>TARGET: ${target.toFixed(2)}</Typography>
      <Typography variant='body1' color='success'>volatility: {volatility}</Typography>
      <LineChart width={600} height={300} data={data.slice(-range)}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" isAnimationActive={false} dot={false}/>
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
      <Typography variant='body1'>SHARES: {shares}</Typography>
      <Typography variant='body1'>AVG PRICE: ${((avgCost).toLocaleString())}</Typography>
      <Typography variant='body1'>POSITION: ${(shares*currentPrice).toFixed(2)}</Typography>
      <Typography variant='body1'>PROFIT/LOSS: ${((shares*currentPrice)-(shares*avgCost)).toLocaleString()}</Typography>
      <Button onClick={()=>setTarget(state=>state+100)}>Increase target</Button>
      <Button onClick={()=>setTarget(state=>state-100)}>Decrease target</Button>
      <Button onClick={()=>setVolatility(state=>state+1)}>Increase volatility</Button>
      <Button onClick={()=>setVolatility(state=>state-1)}>Decrease volatility</Button>
      <Button onClick={()=>setRange(7)}>7</Button>
      <Button onClick={()=>setRange(30)}>30</Button>
      <Button onClick={()=>setRange(365)}>365</Button>
      <Button onClick={()=>{
        console.log('BOUGHT 10 shares at $',currentPrice,' each')
        setShares(state=>state+10)
        const avg= ((avgCost*shares)+(currentPrice*10))/(shares+10)
        setAvgCost(Number(avg))
        console.log('AVG cost: $',avgCost)
        }}>Buy 10 shares</Button>
    </>
  )
};

export default Home;
