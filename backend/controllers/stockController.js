const Stock = require('../models/stockModel.js')
const asyncHandler = require('express-async-handler')
// const generateToken = require('../utils/generateToken.js')

// @desc        Authenticate user
// @route       POST /api/users/login
// @access      Public
const getStockData = asyncHandler(async (req, res) => {
    const stock = await Stock.find({})
    console.log('hello in stock route')
    // console.log(stock)
    if (stock) {
        res.json(stock)
    } else {
        res.status(401)
        throw new Error('Stock data not found')
    }
})

module.exports= { getStockData }