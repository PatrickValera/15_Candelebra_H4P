import { Box, lighten, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toLocale, getColor } from '../utils';

const Bar = ({ ticker, portfolio, color }) => {
    const [percent,setPercent]=useState(0)
    useEffect(()=>{
        if (portfolio[ticker.ticker]&&portfolio[ticker.ticker].value>0)setPercent(((portfolio[ticker.ticker].value - (portfolio[ticker.ticker].shares * portfolio[ticker.ticker].avgCost)) / (portfolio[ticker.ticker].shares * portfolio[ticker.ticker].avgCost)) * 100)
    },[portfolio])
    return (
        <>
            {portfolio[ticker.ticker] ? portfolio[ticker.ticker].value > 0 &&
                <Paper elevation={0} sx={{ my:1,p:1, bgcolor: lighten(getColor(ticker.color), .8), display: 'flex' }}>
                    <Box sx={{flex:'1 1 auto'}}>
                    <Typography variant='h6'color={color}>{ticker.ticker}</Typography>
                    </Box>
                    <Box>
                        <Typography varaint='body1'>${toLocale(portfolio[ticker.ticker].value)}</Typography>
                        <Typography varaint='body1' fontWeight={600} color={percent>0?'green':'error'}>{toLocale(percent)}%</Typography>
                    </Box>

                </Paper> : ''
            }
        </>
    )
};

export default Bar;
