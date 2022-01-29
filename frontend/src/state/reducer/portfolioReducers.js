import { PORTFOLIO_FETCH_FAIL, PORTFOLIO_FETCH_REQUEST, PORTFOLIO_FETCH_SUCCESS, PORTFOLIO_TRANSACTION_FAIL, PORTFOLIO_TRANSACTION_REQUEST, PORTFOLIO_TRANSACTION_SUCCESS } from "../constants/portfolioConstants"

export const portfolioReducer = (state={portfolio:{},wallet:0},action) =>{
    switch(action.type){
        case PORTFOLIO_FETCH_REQUEST:{
            return{...state,loading:true}
        }
        case PORTFOLIO_FETCH_SUCCESS:{
            return{
                wallet:action.payload.wallet,
                portfolio:action.payload.portfolio,
                loading:false
            }
        }
        case PORTFOLIO_TRANSACTION_REQUEST:{
            return {...state,loading:true}
        }
        case PORTFOLIO_TRANSACTION_SUCCESS:{
            return{...action.payload,loading:false}
        }
    
        case PORTFOLIO_TRANSACTION_FAIL:{
            return{...state,loading:false,error:action.payload}
        }
        case PORTFOLIO_FETCH_FAIL:{
            return{loading:false,error:action.payload}
        }
        default: return state
    }
}