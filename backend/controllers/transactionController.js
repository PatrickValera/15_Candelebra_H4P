const User = require('../models/userModel.js')
const Stock = require('../models/stockModel.js')
const asyncHandler = require('express-async-handler')
// const generateToken = require('../utils/generateToken.js')

// @desc        Get Portfolio
// @route       POST /api/transaction/buy
// @access      Private
const getPortfolio = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)
    if(user){
        console.log(user.portfolio)
        res.json({
            portfolio:user.portfolio,
            wallet:user.wallet,
        })
    }else{
        throw new Error('USER NOT FOUND')
    }
})
// @desc        Buy Stock using stock ID and share count
// @route       POST /api/transaction/buy
// @access      Private

const buyStock = asyncHandler(async (req, res) => {
    console.log('BUYING')
    const { stockId, shares } = req.body
    // console.log(req.user._id)
    // console.log(stockId,"  ",shares)
    const stock = await Stock.findById(stockId)
    const user = await User.findById(req.user._id)
    if (stock && user) {
        // console.log(user.wallet)
        if (stock.currentPrice * shares > user.wallet) {
            throw new Error('Not enough coins')
        } else {
            user.wallet -= shares * stock.currentPrice
            let prevShares =( user.portfolio[stock._id]?user.portfolio[stock._id].shares:0)
            let prevAverage = (user.portfolio[stock._id]?user.portfolio[stock._id].averageCost:0)
            // if (!prevShares) {
            //     prevShares = 0
            //     prevAverage = 0
            // }
            let obj = { ...user.portfolio }
            const avg = ((prevAverage * prevShares) + (stock.currentPrice * shares)) / (prevShares + shares)

            obj[stock._id.toString()] = {
                shares: prevShares + shares,
                averageCost: avg,
                ticker:stock.ticker
            }
            user.portfolio = { ...obj }
            user.save()
        }
        res.json({ update: user.portfolio[stock._id], newWallet: user.wallet })

    } else {
        res.status(401)
        console.log("error in transaction controller")
        throw new Error('Stock data or User not found')
    }
})

// @desc        Buy Stock using stock ID and intent share count
// @route       POST /api/transaction/sell
// @access      Private

const sellStock = asyncHandler(async (req, res) => {
    console.log('SELLING')
    const { stockId, shares:shareToSell } = req.body
    const stock = await Stock.findById(stockId)
    const user = await User.findById(req.user._id)
    if (stock && user) {
        // console.log(user.wallet)
        let prevShares = user.portfolio[stock._id].shares
        if (!prevShares) prevShares = 0
        if (shareToSell > prevShares) {
            throw new Error('Not enough shares')
        } else {
            user.wallet += shareToSell * stock.currentPrice

            let obj = { ...user.portfolio }

            let newAvg=user.portfolio[stock._id].averageCost
            let newShares=prevShares-shareToSell
            if(prevShares-shareToSell<=0){
                newAvg=0
                newShares=0
            }
            obj[stock._id.toString()] = {
                shares: newShares,
                averageCost: newAvg,
                ticker:stock.ticker
            }
            user.portfolio = { ...obj }
            user.save()
        }
        res.json({ update: user.portfolio[stock._id], newWallet: user.wallet })

    } else {
        res.status(401)
        console.log("error in transaction controller")
        throw new Error('Stock data or User not found')
    }
})
module.exports = { getPortfolio, buyStock, sellStock }