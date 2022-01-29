import { PORTFOLIO_FETCH_REQUEST, PORTFOLIO_FETCH_SUCCESS, PORTFOLIO_FETCH_FAIL, PORTFOLIO_TRANSACTION_REQUEST, PORTFOLIO_TRANSACTION_SUCCESS, PORTFOLIO_TRANSACTION_FAIL } from '../constants/portfolioConstants'
import axios, { Axios } from 'axios'


export const getPortfolio = () => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        dispatch({ type: PORTFOLIO_FETCH_REQUEST })
        const { data } = await axios.get('/api/transaction', config)
        console.log(data)
        dispatch({
            type: PORTFOLIO_FETCH_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: PORTFOLIO_FETCH_FAIL,
            payload: message,
        })
    }
}

export const sendOrder = (action, stockId, shares) => async (dispatch, getState) => {
    try {
        let URL = '/api/transaction/'
        console.log(action)
        if (action === 'buy') URL += 'buy'
        if (action === 'sell') URL += 'sell'

        dispatch({ type: PORTFOLIO_TRANSACTION_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(URL, { stockId, shares }, config)
        console.log(data)
        const { userPortfolio } = getState()
        // console.log(portfolio)
        let updatedPortfolio = { ...userPortfolio }
        updatedPortfolio.wallet=data.newWallet
        updatedPortfolio.portfolio[stockId] = data.update
        dispatch({ type: PORTFOLIO_TRANSACTION_SUCCESS, payload: updatedPortfolio })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        // if (message === 'Not authorized, token failed') {
        //   dispatch(logout())
        // }
        dispatch({
            type: PORTFOLIO_TRANSACTION_FAIL,
            payload: message,
        })
    }
}