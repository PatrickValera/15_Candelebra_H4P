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
    const [range, setRange] = useState(720)
    const [dataFilled, setDataFilled] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)
    // NEW STATE BELOW
    const [open, setOpen] = useState(false)
    const [intentsOpen, setIntentsOpen] = useState(false)

    const theme = useContext(ThemeContext)

    const ss = useSelector(state => state.userPortfolio.portfolio[_id])
    const { loading } = useSelector(state => state.userPortfolio)
    const dispatch = useDispatch()

    const handleRangeChange = (e) => {
        if (e.target.value === 'max') setRange('max')
        else setRange(Number(e.target.value))
    }
    const handleIntentChange = (count) => {
        setIntent(count)
        setIntentsOpen(false)
    }

    useEffect(() => {
        if (ss) {
            setCurrentShares(ss.shares)
        }
    }, [ss])

    useEffect(() => {
        setRequestLoading(loading)
    }, [loading])

    // INITILIALIZE PRICE ARRAY TO DATAFROMSERVER PROP
    useEffect(() => {
        let ar = Object.values(dataFromServer)
        setData(ar)
        setDataFilled(true)
    }, [dataFromServer])

    // SOCKET LISTENER HERE
    useEffect(() => {
        let mounted = true
        socket.current.on(ticker, (tickData) => {
            console.log(tickData)
            if (mounted) setCurrentPrice(Number(tickData))
        })
        return (() => {
            mounted = false
        })
    }, [dataFilled])

    // IF CURRENT PRICE CHANGES THEN APPEND TO PRICE ARRAY. COSTLY, NEED TO REDO, TEMPORARY FIX
    useEffect(() => {
        if (dataFilled) {
            // let arr = [...data]
            // let obj = arr.reduceRight((a, v) => ({ ...a, [v.name]: v }), {})
            // let keys = Object.keys(obj)

            // let newIndex = Number(keys[keys.length - 1]) + 1
            // // console.log('Index: ',newIndex)
            // let letNewName = Number(obj[keys[keys.length - 1]].name) + 1
            // // console.log('Name: ',letNewName)
            // let objInsert = { name: letNewName, uv: Number(Number(currentPrice).toFixed(2)), pv: 2400, amt: 2400 }
            // if (keys.length >= 1000) {
            //     delete obj[keys[0]]
            // }
            // obj[newIndex] = objInsert

            // let ar2 = Object.values(obj)
            // console.log(ar2)
            // setData(ar2)
            setData([...data, { name: 'letNewName', uv: Number(Number(currentPrice).toFixed(2)), pv: 2400, amt: 2400 }])
        }
    }, [currentPrice])

    return (
        <>
            <Paper elevation={4} sx={{ display: 'flex', p: 1, flexDirection: 'row', flexWrap: 'wrap' }} >
                {/* =====HEADER============================================== */}
                <Box sx={{ flex: '1 1 auto', p: 1 }}>
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
                <Box display='flex' sx={{ alignItems: 'flex-end', flexDirection: 'column', p: 1 }}>
                    <Box sx={{ flexGrow: '1', textAlign: 'right' }}>
                        <Typography variant='h5' color={color} fontWeight='600' textAlign='right'>${toLocale(currentPrice)}</Typography>
                        {/* {data.length > 0 && <Typography variant='h6' color={data[999].uv > data[279].uv ? 'success.main' : 'error.main'} fontWeight='600' textAlign='right'>{toLocale(100 * (data[999].uv - data[279].uv) / data[279].uv)}%</Typography>} */}
                        {data.length > 0 && <Typography variant='h6' color={data[data.length - 1].uv > data[data.length - 721].uv ? 'success.main' : 'error.main'} fontWeight='600' textAlign='right' sx={{ maxHeight: 'unset' }}>{toLocale(100 * (data[999].uv - data[279].uv) / data[279].uv)}%</Typography>}
                        <Typography variant='body1' color='grey.500' gutterBottom sx={{}}>Last 1hr</Typography>
                        <Button variant='contained' onClick={() => {
                            setOpen(!open)
                            setIntentsOpen(false)
                        }}
                            sx={{ fontSize: '1.3rem', minWidth: '4rem', color: { color }, bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }}>
                            {!open ? <BsCaretUpFill /> : <BsCaretDownFill />}
                        </Button>
                    </Box>
                </Box>
                {/* =====END STOCK INFO & COLLAPSE BUTTONS=============================================== */}

                {/* =====CHART & ACTION BUTTONS=============================================== */}
                <Collapse in={!open} sx={{ flex: '1 1 100%' }}>
                    {/* =====CHART=============================================== */}
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

                        <Button variant='contained' onClick={() => setIntentsOpen(!intentsOpen)} sx={{ fontSize: '1rem', minWidth: '4rem', color: { color }, bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }}>
                            {intentsOpen ? 'X' : intent}
                        </Button>
                        <Button disabled={requestLoading} color='success' variant={theme.palette.mode === 'dark' ? 'contained' : 'outlined'} size='small' sx={{ minWidth: '40px', flexGrow: '1' }} onClick={() => {
                            dispatch(sendOrder('buy', _id, intent))
                        }}>
                            Buy
                        </Button>
                    </Box>
                </Collapse>
                {/* =====END CHART & ACTION BUTTONS=============================================== */}
                {/* =====CHANGE INTENT SECTION =============================================== */}
                <Collapse in={intentsOpen} sx={{ flex: '1 1 100%' }}>
                    <Box display='flex' sx={{ py: 1, gap: 1 }}>
                        {[1, 10, 50, 100, 1000].map(count => (
                            <Button key={Math.random()} variant='contained' sx={{ flex: '1 1 20px', py: 1, color: { color }, bgcolor: `${theme.palette.mode === 'light' && lighten(getColor(color), .8)}` }} onClick={() => handleIntentChange(count)}>
                                {count}
                            </Button>
                        ))}

                    </Box>
                </Collapse>
                {/* =====ENDCHANGE INTENT SECTION =============================================== */}

            </Paper>
        </>
    )
};


export default Chart;
