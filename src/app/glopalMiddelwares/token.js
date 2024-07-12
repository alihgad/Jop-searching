import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../../db/moduels/user/user.moduel.js'
import asyncHandler from '../utils/asyncHandler.js'
dotenv.config()
export default asyncHandler(async (req,res,next)=>{
        let {token} = req.headers
        let {id} = jwt.decode(token,process.env.SECRET_KEY)
        let user = await userModel.findById(id)
        if (!user){
            return next(new Error('Token is not valid'))
        }
        req.user = user
        next()
    })
