import { Box, lighten, Paper, Typography } from '@mui/material';
import React from 'react';
import { toLocale, getColor } from '../utils';

const Bar = ({ ticker, portfolio }) => {
    return (
        <>
            {portfolio[ticker.ticker] ? portfolio[ticker.ticker].value > 0 &&
                <Paper elevation={1} sx={{ p:1, bgcolor: lighten(getColor(ticker.color), .8), display: 'flex' }}>
                    <Box sx={{flex:'1 1 auto'}}>
                    <Typography variant='h6'>{ticker.ticker}</Typography>
                    </Box>
                    <Box>
                        <Typography varaint='body1'>{toLocale(portfolio[ticker.ticker].value)}</Typography>
                        <Typography varaint='body1'>{toLocale(((portfolio[ticker.ticker].value - (portfolio[ticker.ticker].shares * portfolio[ticker.ticker].avgCost)) / (portfolio[ticker.ticker].shares * portfolio[ticker.ticker].avgCost)) * 100)}%</Typography>
                    </Box>

                </Paper> : ''
            }
        </>
    )
};

export default Bar;
