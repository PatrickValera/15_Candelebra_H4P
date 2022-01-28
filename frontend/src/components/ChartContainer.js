import { Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { toLocale } from '../utils';

// const mock = [{ name: 1, uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }]

const ChartContainer = ({ range, data, color }) => {
    useEffect(()=>{

    },[data])
    return (
        <>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                   
                    {color &&
                        <ComposedChart data={data.slice(-1000)} margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
                            <defs>
                                <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={String(color)} stopOpacity={0.5} />
                                    <stop offset="60%" stopColor={String(color)} stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#fff" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Tooltip content={<CustomToolTip />} />


                            <Line type="monotone" unit="M" strokeLinecap="round" strokeWidth={2}
                                // style={{ strokeDasharray: `40% 60%` }}
                                dataKey="uv"
                                stroke={color}
                                dot={false}
                                legendType="none"
                                isAnimationActive={false}
                            />
                            <Area isAnimationActive={false} type="monotone" stroke={0} dataKey="uv" strokeWidth={2} fillOpacity={1} fill={`url(#${color})`} />
                        </ComposedChart>}

                </ResponsiveContainer>
            </div>

        </>
    )
};
const CustomToolTip = ({ active, payload, label }) => {
    return (
        <>
            {payload && payload.length && 
            <Box sx={{bgcolor:'white',p:2,borderRadius:1,border:'1px solid #ddd'}}>
                {/* <Typography variant='body2'>{label}</Typography> */}
                <Typography variant='body2' color='success.light'>${toLocale(payload[0].value)}</Typography>
            </Box>
            }
        </>
    )
}
export default ChartContainer;
