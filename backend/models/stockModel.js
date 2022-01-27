const mongoose = require('mongoose')

const stockSchema = mongoose.Schema({
  // id: Number,
  ticker: String,
  // exchange: String,
  name: String,
  initialPrice: Number,
  currentPrice: Number,
  description: String,
  data:Object,
  // ipoDate: String,
  // siteUrl: String,
  // industries: [String],
  // icon: String,
  // favorited: Boolean
});

let Stock = mongoose.model('Stock', stockSchema);

module.exports=Stock;
