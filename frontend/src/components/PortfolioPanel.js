import { Box, Typography } from '@mui/material';
import React from 'react';

const PortfolioPanel = ({cash,portfolio}) => {
    return (
        <Box sx={{p:2}}>
            <Typography variant='h4'>My portfolio</Typography>
            <Box display='flex'>
                <Box sx={{ flex: '0 0 50px' }}>
                    C
                </Box>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography variant='body2'>
                        Cash
                    </Typography>
                    <Typography variant='body2'>
                        + $ {cash}
                    </Typography>
                </Box>
            </Box>
            <Box display='flex'>
                <Box sx={{ flex: '0 0 50px' }}>
                    IC
                </Box>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography variant='body2'>
                        Gain
                    </Typography>
                    <Typography variant='body2'>
                        + $ 3,123
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default PortfolioPanel;
