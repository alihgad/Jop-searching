import AppError from "../utils/appError.js"
import asyncHandler from "../utils/asyncHandler.js"

export default (roles )=>{
    return (req,res,next)=>{

        if (!roles.includes(req.user.role)  ){
            return next(new AppError('Unauthorized'))
        }
        next()
    }
}