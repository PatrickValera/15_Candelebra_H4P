import { Box, Button, Collapse, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Paper, Select, Tab, Tabs, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toLocale, getColor } from '../utils'
import ChartContainer from './ChartContainer';
import { darken, lighten } from '@mui/material/styles'
import { theme } from '../themes/theme'
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../state/actions/portfolioActions';
import { ThemeContext } from '@emotion/react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'
// import { ThemeContext } from '@emotion/react';
// const mock = [{ name: 1, uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }]

const Chart = ({ socket, tick: { _id, ticker, name, color, initialPrice, data: dataFromServer, currentPrice: curr }, portfolio, cash, setPortfolio, setCash }) => {
    const [intent, setIntent] = useState(1)
    const [currentShares, setCurrentShares] = useState(0)
    const [data, setData] = useState([])
    const [currentPrice, setCurrentPrice] = useState(0)
    const [range, setRange] = useState(360)
    const [dataFilled, setDataFilled] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)
    // NEW STATE BELOW
    const [open, setOpen] = useState(false)

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
            setCurrentShares(ss.shares)
        }
    }, [ss])

    useEffect(() => {
        setRequestLoading(loading)
    }, [loading])

    useEffect(() => {
        // console.log('in ui')
        let ar = Object.values(dataFromServer)
        console.log(ar.length)
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
            <Paper elevation={4} sx={{ display: 'flex', p: 1, flexDirection: 'row', flexWrap: 'wrap' }} >
                {/* =====HEADER============================================== */}
                <Box sx={{ flex: '1 1 auto',p:1 }}>
                    <Typography variant='h3' color={color} fontWeight='600' sx={{ textShadow: `0 0 27px ${color}` }}>{ticker}</Typography>
                    <Typography variant='body2' color='grey.400' >{name}</Typography>
                    <Box display='flex' sx={{ width: 'min-content', p: '.35rem', gap: '5px', borderRadius: 2, alignItems: 'center', bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }}>
                        <Typography variant='h5' color={color}>{currentShares ? currentShares : 0}</Typography>
                        <Typography variant='body1' color={color} >shares</Typography>
                    </Box>
                </Box>
                {/* =====HEADER============================================== */}

                {/* <Divider sx={{ my: 2 }} /> */}

                {/* =====STOCK INFO & COLLAPSE BUTTONS=============================================== */}
                <Box display='flex' sx={{ alignItems: 'flex-end', flexDirection: 'column',p:1 }}>
                    <Box sx={{ flexGrow: '1', textAlign: 'right' }}>
                        <Typography variant='h5' color={color} fontWeight='600' textAlign='right'>${toLocale(currentPrice)}</Typography>
                        {data.length > 0 && <Typography variant='h6' color={data[999].uv > data[279].uv ? 'success.main' : 'error.main'} fontWeight='600' textAlign='right'>{toLocale(100 * (data[999].uv - data[279].uv) / data[279].uv)}%</Typography>}
                        <Button variant='contained' onClick={() => setOpen(!open)} sx={{ fontSize: '1.3rem', minWidth: 'unset', color: { color }, bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }}>
                            {!open ? <BsCaretUpFill /> : <BsCaretDownFill />}
                        </Button>
                    </Box>
                </Box>
                {/* =====END STOCK INFO & COLLAPSE BUTTONS=============================================== */}

                {/* =====CHART & ACTION BUTTONS=============================================== */}
                <Collapse in={!open} sx={{ flex: '1 1 100%' }}>
                    {/* =====END CHART=============================================== */}
                    <ChartContainer data={data} range={range} color={color} />
                    {/* =====END CHART=============================================== */}
                    {/* =====RANGE BUTTONS=============================================== */}
                    <Box display='flex' sx={{ mb: 2, gap: 1 }}>
                        <Button value={60} sx={{ color: `${range === 60 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>5m</Button>
                        <Button value={360} sx={{ color: `${range === 360 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>30m</Button>
                        <Button value={720} sx={{ color: `${range === 720 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>1h</Button>
                        <Button value={1000} sx={{ color: `${range === 1000 ? color : 'text.primary'}`, minWidth: '45px', p: '0' }} onClick={handleRangeChange}>1h20m</Button>
                    </Box>
                    {/* =====END RANGE BUTTONS============================================= */}
                    {/* BUY BUTTONS =================== */}
                    <Box display='flex' sx={{ gap: 1 }}>
                        <Button disabled={requestLoading || currentShares === 0} color='error' variant={theme.palette.mode === 'dark' ? 'contained' : 'outlined'} size='small' sx={{ fontWeight: '600', minWidth: '40px', flexGrow: '1' }} onClick={() => {
                            if (currentShares - intent < 0) return
                            dispatch(sendOrder('sell', _id, intent))
                        }}>
                            Sell
                        </Button>
                        {/* <FormControl >
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
                        </FormControl> */}
                        <Button variant='contained' onClick={() => setOpen(!open)} sx={{ fontSize: '1rem', minWidth: 'unset', color: { color }, bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }}>
                            {intent}
                        </Button>
                        <Button disabled={requestLoading} color='success' variant={theme.palette.mode === 'dark' ? 'contained' : 'outlined'} size='small' sx={{ minWidth: '40px', flexGrow: '1' }} onClick={() => {
                            dispatch(sendOrder('buy', _id, intent))
                        }}>
                            Buy
                        </Button>
                    </Box>
                </Collapse>
                {/* =====END CHART & ACTION BUTTONS=============================================== */}
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