import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { toLocale } from '../utils';
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { getPortfolio } from '../state/actions/portfolioActions'
import { useNavigate } from 'react-router-dom'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import Bar from './Bar';
import { ThemeContext } from '@emotion/react';

// 

// ========================================================================
// ========================================================================

const PortfolioPanel = ({ socket, cash, total: totalInvestment, tickers }) => {
    const [gain, setGain] = useState(0)
    const [gainPercent, setGainPercent] = useState(0)
    const [buyingPower, setBuyingPower] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {palette:{mode}}=useContext(ThemeContext)
    const { userInfo } = useSelector(state => state.userLogin)
    const { wallet, portfolio } = useSelector(state => state.userPortfolio)

    useEffect(() => {
        if (userInfo) {
            // console.log('FETCHING PORTFOLIO')
            dispatch(getPortfolio())
        }
    }, [])
    useEffect(() => {
        console.log('wallet changed')
        setBuyingPower(wallet)
    }, [wallet])

    return (
        <Box sx={{ p: 2, pt: 4, position: 'sticky', top: '50px' }}>
            <Typography variant='h3' fontWeight={600} sx={{ mb: '20px' }}>Portfolio Summary</Typography>
            {userInfo ?
                <><Box display='flex' sx={{ alignItems: 'center', my: 1 }}>
                    <Box sx={{ flex: '0 0 40px' }}>
                        <RiMoneyDollarBoxFill size='100%' color='secondary.main' />
                    </Box>
                    <Box sx={{ px: 2, flex: '1 1 auto' }}>
                        <Typography variant='body2'>
                            Total Portfolio Value
                        </Typography>
                        <Typography variant='h5' fontWeight={600} >
                            {/* $ {toLocale(Number(totalInvestment) + cash)} */}
                            $_____
                        </Typography>
                    </Box>
                </Box>
                    <Divider />
                    <Box display='flex' sx={{ alignItems: 'center', my: 1 }}>
                        <Box sx={{ flex: '0 0 40px' }}>
                            <BsFillLightningChargeFill size='80%' color='secondary.main' />
                        </Box>
                        <Box sx={{ px: 2, flex: '1 1 auto' }}>
                            <Typography variant='body2'>
                                Buying Power
                            </Typography>
                            <Typography variant='h6' fontWeight={600} >
                                $ {toLocale(Number(buyingPower))}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        {portfolio && Object.keys(portfolio).map((x, index) => (<Bar key={index} socket={socket} share={x} color={x.color} />))}
                        {/* <Typography variant='body2'>FP: {portfolio['FP'] && toLocale(portfolio['FP'].value)}</Typography> */}
                        {/* <Typography variant='body2'>XIN: {portfolio['XIN'] && toLocale(portfolio['XIN'].value)}</Typography> */}
                        {/* <Typography variant='body2'>PAL: {portfolio['PAL'] && toLocale(portfolio['PAL'].value)}</Typography> */}
                    </Box>
                </> :
                <Box display='flex' sx={{ flexDirection: 'column', gap: 1, p: 1 }}>
                    <Typography variant='body2' color='text.main'>Login or Register to begin trading.</Typography>
                    <Button size='medium' color='secondary'variant='contained' onClick={() => navigate('/user/login')}>Login w/ demo</Button>
                    <Button size='medium' color='secondary'variant='outlined' onClick={() => navigate('/user/register')}>Register</Button>
                </Box>
            }
        </Box>
    )



    // ===========================================================================
    // ===========================================================================
    // ===========================================================================
    // ===========================================================================
    // ===========================================================================
    // return (
    //     <Box sx={{ p: 2, pt: 4, position: 'sticky', top: '50px' }}>
    //         <Typography variant='h3' fontWeight={600} sx={{ mb: '20px' }}>My Portfolio</Typography>

    //         {/* ====== CASH CONTAINER =================*/}
    //         <Box display='flex' sx={{ alignItems: 'center', my: 1 }}>
    //             <Box sx={{ flex: '0 0 40px' }}>
    //                 <RiMoneyDollarBoxFill size='100%' color='secondary.main' />
    //             </Box>
    //             <Box sx={{ px: 2, flex: '1 1 auto' }}>
    //                 <Typography variant='body2'>
    //                     Total Portfolio Value
    //                 </Typography>
    //                 <Typography variant='h5' fontWeight={600} >
    //                     $ {toLocale(Number(totalInvestment) + cash)}
    //                 </Typography>
    //             </Box>
    //         </Box>
    //         <Divider />
    //         <Box display='flex' sx={{ alignItems: 'center', my: 1 }}>
    //             <Box sx={{ flex: '0 0 40px' }}>
    //                 <RiMoneyDollarBoxFill size='100%' color='secondary.main' />
    //             </Box>
    //             <Box sx={{ px: 2, flex: '1 1 auto' }}>
    //                 <Typography variant='body2'>
    //                     Cash
    //                 </Typography>
    //                 <Typography variant='h6' fontWeight={600} >
    //                     $ {toLocale(cash)}
    //                 </Typography>
    //             </Box>
    //         </Box>
    //         {/* ====== END CASH CONTAINER ==============*/}

    //         {/* ====== GAIN CONTAINER ==================*/}
    //         <Box display='flex'>
    //             <Box sx={{ flex: '0 0 40px' }}>
    //                 <RiBarChartBoxFill size='100%' />
    //             </Box>
    //             <Box sx={{ px: 2, flex: '1 1 auto' }}>
    //                 <Typography variant='body2' >
    //                     Investments
    //                 </Typography>
    //                 <Typography variant='h6' fontWeight={600} >
    //                     $ {toLocale(totalInvestment)}
    //                 </Typography>
    //                 <Typography variant='body1' fontWeight={600} color={gain > 0 ? 'success.main' : 'error.main'}>
    //                     {totalInvestment && toLocale((gainPercent * 100))}%
    //                 </Typography>
    //             </Box>
    //         </Box>
    //         {/* ====== END GAIN CONTAINER ==================*/}

    //         {/* ====== POSITIONS CONTAINER ==================*/}


    //         <Box sx={{ mt: 4 }}>
    //             {tickers.map((x, index) => (<Bar key={index} ticker={x} portfolio={portfolio} color={x.color} />))}
    //             {/* <Typography variant='body2'>FP: {portfolio['FP'] && toLocale(portfolio['FP'].value)}</Typography>
    //                 <Typography variant='body2'>XIN: {portfolio['XIN'] && toLocale(portfolio['XIN'].value)}</Typography>
    //                 <Typography variant='body2'>PAL: {portfolio['PAL'] && toLocale(portfolio['PAL'].value)}</Typography> */}
    //         </Box>

    //     </Box >
    // )
    // const calcGain = (portfolio) => {
    //     let gain = 0
    //     for (const property in portfolio) {
    //         gain += portfolio[property].value - portfolio[property].shares * portfolio[property].avgCost
    //     }
    //     return gain
    // }
    // const calcPercent = (portfolio) => {
    //     let totalCost = 0
    //     let totalVal = 0
    //     for (const prop in portfolio) {
    //         let val = portfolio[prop].value
    //         let purchaseCost = portfolio[prop].shares * portfolio[prop].avgCost
    //         totalCost += purchaseCost
    //         totalVal += val
    //     }
    //     return ((totalVal - totalCost) / totalCost)
    // }

    // useEffect(() => {
    //     // console.log(portfolio)
    //     if (portfolio) {
    //         setGain(calcGain(portfolio))
    //         setGainPercent(calcPercent(portfolio))
    //     }

    // }, [portfolio])
};

export default PortfolioPanel;
