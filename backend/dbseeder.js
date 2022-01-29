// import mongoose from  'mongoose'
const dotenv = require('dotenv')
const connectDB = require('./config/dataBase.js')
const Stocks = require('./models/stockModel.js')
const  stocks = require('./data/stocks.js')

dotenv.config()

connectDB(null) 

const importData=async()=>{
    try{
        console.log(stocks)
        // await Stocks.deleteMany()

        // await Stocks.insertMany([{
        //     ticker: 'CYNO',
        //     // exchange: String,
        //     name: 'CYNO Media',
        //     initialPrice: 500,
        //     currentPrice: 500,
        //     description: 'Frying Pan is a twitch streamer/youtuber who currently works for Meta',
        //     data:[{
        //         1:500,
        //         2:510,
        //         3:520,
        //         4:530,
        //         5:540
        //     }],
        //     // ipoDate: String,
        //     // siteUrl: String,
        //     // industries: [String],
        //     // icon: String,
        //     // favorited: Boolean
        // }])
        await Stocks.insertMany(stocks)

        // await Order.insertMany(orders)
        console.log(`DATA IMPORTED`);
        process.exit()
    } catch(error){
        console.log(`ERROR: ${error}`);
        process.exit(1)
    }
}
importData()