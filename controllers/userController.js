const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const ErrorResponse = require('../util/errorResponse');

const registerUser =asyncHandler(async(req, res) => {
    const {name, email, password, typeOfUser} = req.body;


    if(!name || !email || !password || !typeOfUser){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const userExists = await User.findOne({email});
    if(userExists){
       return res.status(400).json({
        success:false,
        error:"User already exists",
        user:null,
       });

    }
    const user = await User.create({
        name,
        email,
        password,
        typeOfUser,
    });
    if(user){
        return res.status(200).json({
            success: true,
            error:null,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                typeOfUser: user.typeOfUser,
                token: generateToken(user._id)
            }
        });
    }
    else{
        res.status(400);
        throw new Error("User not created");
    }

});

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    if(!userExists){
        return res.status(400).json({
            success:false,
            error:"User not found",
            user:null,
        })
    }
    if(userExists && (await userExists.matchPassword(password))){
        
        return res.status(200).json({
            success: true,
            error:null,
            user:{
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                typeOfUser: userExists.typeOfUser,
                token: generateToken(userExists._id)
            }
        });
    } else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//  /api/user?search=abc
// const allUsers = asyncHandler(async(req, res) => {
//     const keyword = req.query.search?{
//         $or: [
//             {name: {$regex: req.query.search, $options: 'i'}},
//             {email: {$regex: req.query.search, $options: 'i'}},
//         ]
//     }:{};

//     const users = await User.find(keyword).find({_id:{$ne: req.user._id}});
//     res.send(users );

// });


module.exports = {registerUser, authUser};


