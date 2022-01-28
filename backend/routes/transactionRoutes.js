const { getStockData } = require("../controllers/transactionController.js")
const express = require('express')
const router = express.Router()
const {protect} = require('../middleWare/authMiddleWare.js')
const {buyStock,sellStock,getPortfolio} = require('../controllers/transactionController.js')
// const { authUser, getUserProfile,registerUser, updateUserProfile } = require('../controllers/userController.js')
// const {protect} = require('../middleWare/authMiddleWare.js')

router.get('/',protect,getPortfolio)
router.post('/buy',protect,buyStock)
router.post('/sell',protect,sellStock)

module.exports = router