import userModel from "../../../db/moduels/user/user.moduel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import dotenv from 'dotenv'
import AppError from "../../utils/appError.js";
import bcrypt from 'bcrypt'
import sendingVerfiyEmail from "./shortCuts/sendingVerfiyEmail.js";
import main from "../../services/sendEmail.js";
import jwt from 'jsonwebtoken'
import companyModel from "../../../db/moduels/company/company.model.js";
import jopModel from "../../../db/moduels/jop/jop.model.js";

dotenv.config()


export const updateUsers = asyncHandler(async (req, res, next) => {
    const { email, mobileNumber, recoveryEmail, lastName, firstName, birthDate } = req.body
    if (email) {
        const isExist = await userModel.findOne({ email })
        if (isExist) {
            next(new AppError('Email already exists', 400))
        } else {
            await userModel.findByIdAndUpdate(req.user._id, { confirmed: false })
            await sendingVerfiyEmail(req,email)

        }
    }

    if(mobileNumber){
        const isExist = await userModel.findOne({ mobileNumber })
        if (isExist) {
            next(new AppError('Mobile Number already exists', 400))
        } 
    }

    if(birthDate){
        let date = new Date(birthDate)
    }
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { email, mobileNumber, recoveryEmail, lastName, firstName, birthDate:date }, { new: true })
    if (!updatedUser) { next(new AppError('User not found', 404)) }
    return res.status(200).json({
        msg: 'done',
        data: updatedUser
    })
})


export const deleteUser = asyncHandler(async (req, res,next) => {
    let user = await userModel.findByIdAndDelete(req.user._id)
    if ( user.role == "company_HR") {
       let company = await companyModel.findOneAndDelete({companyHR : user.id}) // delete his comapny
       let jop = await jopModel.deleteMany({addedBy :req.user._id}) // delete related jops


    }
    return res.status(201).json({ msg: 'done' , user })
})


export const getSelfData = asyncHandler(async (req, res,next) => {
    return res.status(201).json({ msg: 'done' , user : req.user })
})

export const getOtherData = asyncHandler(async (req, res,next) => {
    let id = req.params.id
    let user = await userModel.findById(id)
    res.status(201).json({msg:'done',user:{
        userName : user.userName,
        userEmail : user.email,
        userMobileNumber : user.mobileNumber,
        userLastName : user.lastName,
        userFirstName : user.firstName,
        userBirthDate : user.birthDate
    }})
})

export const updatePassword = asyncHandler(async (req,res,next)=>{
    const { oldPassword,password , cPassword } = req.body
    if(!bcrypt.compareSync(oldPassword,req.user.password)) { next(new AppError('wrong password',))}
    if(bcrypt.compareSync(password,req.user.password)) { next(new AppError('cant use old password'))}
    let hashed = bcrypt.hashSync(password,Number(process.env.SALT_ROUNDS))
    req.user.password = hashed
    await req.user.save()
    return res.status(201).json({ msg: 'Password updated' })
})


export const forgetPassword = asyncHandler(async (req, res,next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) { next(new AppError('User not found', 404)) }
    let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 10 * 60 })
    const link = `${req.protocol}://${req.headers.host}/users/resetPassword/${token}`
    await main(req.body.email,`<p>avilable for 10 minutes</p><br/><a href=${link}>reset your password</a>`)
    return res.status(200).json({ msg: 'done' })
})


export const resetPassword = asyncHandler(async (req, res, next) => {
    let token = req.params.token
    let {id} = jwt.verify(token, process.env.SECRET_KEY)
    let { password, cPassword } = req.body
    if (!password ||!cPassword) { next(new AppError('Password is required', 400)) }
    if(password!== cPassword){next (new AppError('password and cPassword must by the same',400))}
    let regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regx.test(password)) { next(new AppError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character', 400)) }
    await userModel.findByIdAndUpdate(id, { password: bcrypt.hashSync(password,Number(process.env.SALT_ROUNDS))})
    return res.status(200).json({ msg: 'done' })
})

export const GetAllRecoveryEmail = asyncHandler(async (req, res,next) => {
    let users = await userModel.find({ recoveryEmail:req.body.recoveryEmail })
    return res.status(200).json({ msg: 'done', data: users })
})


