import { Box, Button, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Tab, Tabs, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toLocale, getColor } from '../utils'
import ChartContainer from './ChartContainer';
import { darken, lighten } from '@mui/material/styles'
import { theme } from '../themes/theme'
import { useDispatch, useSelector } from 'react-redux';
import {
    sendOrder
} from '../state/actions/portfolioActions';
import { ThemeContext } from '@emotion/react';
// import { ThemeContext } from '@emotion/react';
// const mock = [{ name: 1, uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }]

const Chart = ({ socket, tick: { _id, ticker, name, color, initialPrice, data: dataFromServer, currentPrice: curr }, portfolio, cash, setPortfolio, setCash }) => {
    const [intent, setIntent] = useState(1)
    const [currentShares, setCurrentShares] = useState(0)
    const [data, setData] = useState([])
    const [currentPrice, setCurrentPrice] = useState(0)
    const [range, setRange] = useState(360)
    // const [play, setPlay] = useState(true)
    // const [max, setMax] = useState(0)
    const [dataFilled, setDataFilled] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)

    const theme = useContext(ThemeContext)

    const ss = useSelector(state => state.userPortfolio.portfolio[_id])
    const { loading } = useSelector(state => state.userPortfolio)
    const dispatch = useDispatch()

    const handleRangeChange = (e) => {
        if (e.target.value === 'max') setRange('max')
        else setRange(Number(e.target.value))
    }
    const handleIntentChange = (e) => {
        setIntent(e.target.value)
    }

    useEffect(() => {
        if (ss) {
            // console.log(ss.shares)
            setCurrentShares(ss.shares)
        }
    }, [ss])

    useEffect(() => {
        setRequestLoading(loading)
    }, [loading])

    useEffect(() => {
        // console.log('in ui')
        let ar = Object.values(dataFromServer)
        setData(ar)
        setDataFilled(true)
        // console.log('dataFromServer:',dataFromServer)
    }, [dataFromServer])

    useEffect(() => {
        let mounted = true
        socket.current.on(ticker, (tickData) => {
            if (mounted) setCurrentPrice(Number(tickData))
        })
        return (() => {
            mounted = false
        })
    }, [dataFilled])

    useEffect(() => {
        if (dataFilled) {
            let arr = [...data]
            let obj = arr.reduceRight((a, v) => ({ ...a, [v.name]: v }), {})
            let keys = Object.keys(obj)

            let newIndex = Number(keys[keys.length - 1]) + 1
            // console.log('Index: ',newIndex)
            let letNewName = Number(obj[keys[keys.length - 1]].name) + 1
            // console.log('Name: ',letNewName)
            let objInsert = { name: letNewName, uv: Number(Number(currentPrice).toFixed(2)), pv: 2400, amt: 2400 }
            if (keys.length >= 1000) {
                delete obj[keys[0]]
            }
            obj[newIndex] = objInsert

            let ar2 = Object.values(obj)
            setData(ar2)
        }
    }, [currentPrice])

    return (
        <>
                <Paper elevation={4} sx={{ display: 'flex', p: 1, flexDirection: 'column' }} >
                    {/* =====HEADER============================================== */}
                    <Box>
                        <Typography variant='h3' color={color} fontWeight='600'sx={{textShadow:`0 0 27px ${color}`}}>{ticker}</Typography>
                        <Typography variant='body1' color='grey.400' >{name}</Typography>
                        <Typography variant='h6' color='success.main' fontWeight='600'>${toLocale(currentPrice)}</Typography>
                    </Box>
                    {/* =====HEADER============================================== */}

                    {/* =====CHART=============================================== */}
                    <Box>
                        <ChartContainer data={data} range={range} color={color} />
                    </Box>
                    {/* =====END CHART=============================================== */}

                    {/* =====RANGE BUTTONS=============================================== */}
                    <Box display='flex' sx={{ ml: 2, gap: 1 }}>
                        {/* <Button onClick={() => setRange(28)}>7</Button> */}
                        <Button value={60} sx={{ color: `${range === 60 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>5m</Button>
                        <Button value={360} sx={{ color: `${range === 360 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>30m</Button>
                        <Button value={720} sx={{ color: `${range === 720 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>1h</Button>
                        <Button value={1000} sx={{ color: `${range === 1000 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>1h20m</Button>
                    </Box>

                    {/* =====END RANGE BUTTONS============================================= */}

                    <Divider sx={{ my: 2 }} />

                    {/* =====BUY BUTTONS=============================================== */}
                    <Box display='flex' sx={{ alignItems: 'center', px: 2 }}>
                        <Box sx={{ flexGrow: '1' }}>
                            <Box display='flex' sx={{ width: 'min-content', p: 1, gap: 1, borderRadius: 2, alignItems: 'flex-end', bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }}>
                                <Typography variant='h4' color={color}>{currentShares ? currentShares : 0}</Typography>
                                <Typography variant='body1' color={color} >shares</Typography>
                            </Box>
                        </Box>
                        <Box display='flex' sx={{ gap: 1 }}>
                            <Button disabled={requestLoading || currentShares === 0} color='error' variant={theme.palette.mode === 'dark' ? 'contained' : 'outlined'} size='small' sx={{ fontWeight: '600', minWidth: '40px', p: '5px 10px', flexGrow: '1' }} onClick={() => {
                                if (currentShares - intent < 0) return
                                dispatch(sendOrder('sell', _id, intent))
                            }}>
                                Sell
                            </Button>
                            {/* <OutlinedInput type='number' value={intent} onChange={handleIntentChange} inputProps={{ style: { padding: '5px', width: '100px', textAlign: 'center' } }} sx={{ padding: '0px', height: '40px' }}></OutlinedInput> */}
                            <FormControl >
                                <InputLabel id="demo-simple-select-label" style={{ fontSize: '1rem' }}>stock</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={intent}
                                    label="stock"
                                    onChange={handleIntentChange}
                                    sx={{ p: '0' }}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                    <MenuItem value={100}>100</MenuItem>
                                </Select>
                            </FormControl>
                            <Button disabled={requestLoading} color='success' variant={theme.palette.mode === 'dark' ? 'contained' : 'outlined'} size='small' sx={{ minWidth: '40px', p: '5px 10px', flexGrow: '1' }} onClick={() => {
                                dispatch(sendOrder('buy', _id, intent))
                            }}>
                                Buy
                            </Button>
                        </Box>
                    </Box>

                </Paper>
        </>
    )
};


export default Chart;

    // const handleNews = (news) => {
    //     // console.log(news)
    //     if (Math.random() > news.chance) {
    //         // console.log('News did not pass', news.desc)
    //         return
    //     } else {
    //         // console.log('News pass', news.desc)
    //         let posTarget = Number(target) + news.target
    //         let posVol = Number(volatility) + news.vlty
    //         if (posTarget > 100) {
    //             setTarget(posTarget)
    //             setCurrentPrice(state => state + news.init)
    //         }
    //         if (posVol > 1 && posVol < 10) setVolatility(posVol)
    //         return
    //     }
    // }
    // useEffect(() => {
    //     // console.log('setting Interval')
    //     const interval = setInterval(() => {
    //         if (play) handleClick()
    //     }, 300);
    //     //200 back
    //     const Newsinterval = setInterval(() => {
    //         let ran = Math.ceil((Math.random() * news.length)) - 1
    //         // if (play) console.log(ran)
    //         if (play) handleNews(news[ran])
    //     }, 1000);
    //     return () => {
    //         // console.log('cleaning up intervals')
    //         clearInterval(interval);
    //         clearInterval(Newsinterval)
    //     }
    // }, [play])

    //RUN THIS EVERY TICK
    // useEffect(() => {


    //     //CALCULATE NEW PRICE HERE
    //     const percent = ((target - currentPrice) / target) * 100
    //     // console.log(percent.toFixed(2), "% away from target")

    //     const aNum = Math.random() * 100

    //     let multiplier
    //     if (percent + 20 > aNum) {
    //         multiplier = 1
    //     } else {
    //         multiplier = -1
    //     }
    //     const deltaPercent = (Math.random() * volatility) / 100

    //     const newPrice = (currentPrice + currentPrice * deltaPercent * multiplier)
    //     //END CALCULATE NEW PRICE HERE

    //     //CALCULATE NEW PORTFOLIO VALUE
    //     let newObj = { ...portfolio }
    //     newObj[ticker] = { value: newPrice * shares, shares: shares, avgCost: avgCost }
    //     setPortfolio(newObj)
    //     //END CALCULATE NEW PORTFOLIO VALUE

    //     setCurrentPrice(newPrice)
    //     const obj = { name: day, uv: newPrice, pv: 2400, amt: 2400 }
    //     setData(state => [...state, obj])
    // }, [day]);