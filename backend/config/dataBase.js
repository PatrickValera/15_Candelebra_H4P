const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Stock = require("../models/stockModel")
const connectDB = async (socket) =>{
    try{
        console.log(`URI:` + ` ${process.env.MONGO_URI}`)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("CONNECTED TO DATABASE")
            if(socket)tickers(socket)
        })
        .catch((error) => console.log(`An error has occurred: ${error}`));
      
        // console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
module.exports= connectDB




const tickers = async (socket) => {
    try {
        const allStocks = await Stock.find();
        // for (let i = 0; i < allStocks.length; i++) {
        //     let fluctuationRange = Math.floor(Math.random() * 10);
            let delayTime = Math.floor(Math.random() * (3000 - 2000) + 2000);
        //     stockPrice(socket, allStocks[i].currentPrice, delayTime, allStocks[i].ticker, fluctuationRange, allStocks[i].id);
        // }
        for (let i=0;i<allStocks.length;i++){
            stockPrice(
              socket,allStocks[i].currentPrice,
              delayTime,
              allStocks[i].ticker,
              10,
              allStocks[i]._id,
              allStocks[i].data
              )
        }
    } catch (error) {
        console.log("Stock fetching error:", error);
    }
}




const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  
  const stockPrice = async (socket, currPrice, delayMs, stockTicker, fluctuationRange, stockId,data) => {
    try {
      let price = currPrice;
      let tempData=data
      while (1) {
        if(Math.floor(Math.random()*100<1)){
          price+=80
          console.log('up spike: ',stockTicker)
        }
        if(Math.floor(Math.random()*100)<1&&price>1000&&price<2000){
          price-=200
          console.log('down spike: ',stockTicker)
        }
      let up = Math.round(Math.random());
    
        if (up) {
          price += Math.random() * price*.03;
          up = false;
        } else {
          price -= Math.random() * price*.03;
          up = true;
        }
        if (price <= 0) {
          price = 1;
        }
     
        let keys=Object.keys(tempData)
        let newData={...tempData}
        let obj={}
        // console.log(Number(keys[keys.length-1]))
        let newIndex=String(Number(keys[keys.length-1])+1)
        obj={ name: newIndex, uv: Number(price.toFixed(2)), pv: 2400, amt: 2400 }
        newData[newIndex]=obj
        if(keys.length>=1000)delete newData[keys[0]]
        
        // console.log(stockTicker,newData)
        // console.log(stockTicker,keys.length)
        // console.log(stockTicker,price.toFixed(2))


        await Stock.findOneAndUpdate({ _id: stockId }, { currentPrice: price,data:newData })
        // socket.emit('pan', 1111);
        tempData=newData
        socket.emit(stockTicker, price.toFixed(2));
        // console.log('HELLO', stockTicker)
        await delay(delayMs);
      }
    } catch (error) {
    //   socket.disconnect();
      console.log("Market error", error);
    }
  }