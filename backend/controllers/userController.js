const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')

// @desc        Authenticate user
// @route       POST /api/users/login
// @access      Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    const user = await User.findOne({ email: email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            icon:user.icon,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const newUser = await User.create({
        name, email, password, wallet:0
    })
    if (newUser) {
        console.log('CREATED: ',newUser)
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            wallet: newUser.wallet,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
module.exports= { authUser, registerUser }