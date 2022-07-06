import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Chart from "../components/Chart";
import PortfolioPanel from "../components/PortfolioPanel";
import { modifier } from "../modifiers";
import axios from "axios";
import { io } from "socket.io-client";
import Skeleton from "@mui/material/Skeleton";

const Home = () => {
    // console.log(modifier)
    const [tickers, setTickers] = useState(null);
    const [total, setTotal] = useState(0);
    const [cash, setCash] = useState(10000);
    const socket = useRef();
    const [portfolio, setPortfolio] = useState({});

    const fetchData = async () => {
        const { data } = await axios.get("/api/stock");
        setTickers(data);
        console.log(data);
    };
    useEffect(() => {
        fetchData();
        socket.current = io(window.location.pathname);
    }, []);
    return (
        <>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    p: 0,
                    position: "relative",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    // bgcolor: 'red'
                    // minHeight: "95vh",
                }}
            >
                {/* ======= HEADER AND TICKERS ============ */}
                <Box
                    sx={{
                        flex: "2 1 350px",
                        p: { xs: 0, md: 3 },
                        order: { xs: "2", sm: "1" },
                    }}
                >
                    {/* ========HEADER============================ */}
                    <Box sx={{ px: 1 }}>
                        <Typography variant="h1" fontWeight="600">
                            Stock Market
                        </Typography>
                        <Typography variant="h5" color="grey.600">
                            Trending Stocks
                        </Typography>
                    </Box>
                    {/* ========TICKERS============================ */}
                    <Box display="flex" sx={{ flexWrap: "wrap" }}>
                        {tickers ? (
                            socket.current &&
                            tickers.map((tick, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{ width: { xs: "100%", md: "100%" }, p: 1 }}
                                    >
                                        <Chart
                                            news={modifier[Math.floor(Math.random() * 2)]}
                                            tick={tick}
                                            socket={socket}
                                            setCash={setCash}
                                            cash={cash}
                                        />
                                    </Box>
                                );
                            })
                        ) :
                            <>
                                {[1, 2, 3, 4, 5, 6].map(Card => (
                                    <Box
                                        key={Card}
                                        sx={{ width: { xs: "100%", md: "100%" }, p: 1 }}
                                    >
                                        <Skeleton variant="rectangular" height='150px' sx={{ flex: '1 1 1000px', p: 0, my: 2 }} />
                                    </Box>))}
                            </>

                        }
                    </Box>
                    {/* <Box sx={{flex:'1 1 1000px', bgcolor:'green'}}>fe</Box> */}
                </Box>
                {/* ========SIDE============================ */}
                <Box
                    sx={{
                        flex: { xs: "1 1 250px", sm: "1 1 100px" },
                        order: { xs: "1", sm: "2" },
                    }}
                >
                    <PortfolioPanel
                        socket={socket}
                        cash={cash}
                        portfolio={portfolio}
                        total={total}
                        tickers={tickers}
                    />
                </Box>
            </Container>
        </>
    );
};

export default Home;
