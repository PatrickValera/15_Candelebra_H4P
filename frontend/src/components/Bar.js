import { Box, lighten, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toLocale, getColor } from '../utils';
const color='#000'


const Bar = ({ socket,share:id }) => {
    const [percent,setPercent]=useState(0)
    const [currentPrice,setCurrentPrice]=useState(0)

    const share=useSelector(state=>state.userPortfolio.portfolio[id])
    useEffect(()=>{
      setPercent(((share.shares*currentPrice - (share.shares * share.averageCost)) / (share.shares * share.averageCost)) * 100)
    },[currentPrice,share])
    useEffect(()=>{
        // console.log('share count changed ',share.ticker)
    },[share])
    useEffect(() => {
        // console.log(share)
        let mounted=true
        if(socket.current)socket.current.on(share.ticker, (tickData) => {
            if(mounted)setCurrentPrice(Number(tickData))
            // console.log(tickData)
        return(()=>{
            mounted=false
        })
        })
    }, [socket,share])
    return (
        <>
            {share.shares>0&&
                <Paper elevation={0} sx={{ my:1,p:1, bgcolor: lighten(getColor(color), .8), display: 'flex' }}>
                    <Box sx={{flex:'1 1 auto'}}>
                    <Typography variant='h6'color={color}>{share.ticker}</Typography>
                    <Typography varaint='body2' color={color}>{share.shares} {share.shares>1?'shares':'share'}</Typography>
                    </Box>
                    <Box>
                        <Typography varaint='body1'color='primary'>${toLocale(share.shares*currentPrice)}</Typography>
                        <Typography varaint='body1' fontWeight={600} color={percent>0?'green':'error'}>{toLocale(percent)}%</Typography>
                    </Box>

                </Paper>
            }
        </>
    )
};

export default Bar;
