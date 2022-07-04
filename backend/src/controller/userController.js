const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

/*
    desc: Register User
    route: POST /api/users/register
    access: Public
*/

const registerUser = asyncHandler( async (req,res) => {

    const username = req.body.username[0]
    const password = req.body.password[0]
    const email = req.body.email[0]

    if(!username){
        res.status(400)
        throw new Error('Please add username field!')
    }
    if(!email){
        res.status(400)
        throw new Error('Please add email field!')
    }
    if(!password){
        res.status(400)
        throw new Error('Please add password field!')
    }

    // Check for username or email exists

    var userExist = await User.findOne({username})

    if(userExist){
        res.status(400)
        throw new Error('Username already exists!')
    }

    // Find wheather the user exits
    userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email is already registered!')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hpassword = await bcrypt.hash(password,salt)

    //Create user
    const user = await User.create({
        username: username,
        email: email,
        password: hpassword,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.mail,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data!')
    }

})

/*
    desc: Register User
    route: POST /api/users/register
    access: Public
*/

const loginUser = asyncHandler( async (req,res) => {

    const { username, password } = await req.body

    if(!username){
        res.status(400)
        throw new Error('Please add username field!')
    }
    if(!password){
        res.status(400)
        throw new Error('Please add password field!')
    }

    const user = await User.findOne({ username })

    if(!user){
        res.status(400)
        throw new Error('User not found, Register as user!')
    }

    if(user && (await bcrypt.compare(password[0],user.password))){
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.mail,
            token: generateToken(user._id)
        })

    }else{
        res.status(400)
        throw new Error('Invalid credentials!')
    }


    
})


/*
    desc: Get User
    route: GET /api/users/me
    access: Private
*/

const getMe = asyncHandler( async (req,res) => {

    const user = await User.findById(req.user.id)

    res.status(200).json({ 
        _id: user._id,
        username: user.username,
        email: user.email
    })
})

/*
    desc: Update Me
    route: PUT /api/users/:id
    access: Private
*/
const updateMe = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,req.body,{ new: true}
    )

    res.status(200).json(updatedUser)
})

/*
    desc: Delete Me
    route: DELETE  /api/users/:id
    access: Private
*/
const deleteMe = asyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove()

    res.status(200).json({ id: req.params.id })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateMe,
    deleteMe,
}