import express from 'express'
const router = express.Router()
import { authUser,registerUser } from '../controllers/userController.js'
// import {protect} from '../middleWare/authMiddleWare.js'

// router.route('/register').post(registerUser)
router.post('/register',registerUser)
router.post('/login',authUser)
// router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router
