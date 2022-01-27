import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

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
        name, email, password
    })
    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
export { authUser, registerUser }