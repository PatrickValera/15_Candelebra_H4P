const { getStockData } = require("../controllers/stockController.js")
const express = require('express')
const router = express.Router()
// const { authUser, getUserProfile,registerUser, updateUserProfile } = require('../controllers/userController.js')
// const {protect} = require('../middleWare/authMiddleWare.js')

router.route('/').get(getStockData)

module.exports = router
