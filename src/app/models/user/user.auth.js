import userModel from "../../../db/moduels/user/user.moduel.js";
import asyncHandler from "../../utils/asyncHandler.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import AppError from "../../utils/appError.js";
import sendingVerfiyEmail from "./shortCuts/sendingVerfiyEmail.js";
dotenv.config()


// get data from body hashing password then add it to db
export const addUser = asyncHandler(async (req, res, next) => {

    const { firstName, lastName, recoveryEmail, birthDate, mobileNumber, email, password, age, gender, role } = req.body;

    let date = new Date(birthDate);

    const isExist = await userModel.findOne({ email }) || await userModel.findOne({ recoveryEmail : email }) 
    if (isExist) { next(new AppError(`user already exists`)) };

    await sendingVerfiyEmail(req,email)


    const hashed = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS))
    const newUser = await userModel.create({ birthDate: date.toLocaleDateString(), firstName, lastName, userName: firstName + " " + lastName, mobileNumber, recoveryEmail: recoveryEmail?.toLowerCase(), email: email.toLowerCase(), password: hashed, age, gender, role });



    return res.status(201).json({
        msg: 'done',
        data: newUser
    })

})

// to check user email if it exist send link by email whrn user sign up 
export const verifyUser = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    let { email } = jwt.decode(token, process.env.SECRET_KEY)
    if (!email) return next(new AppError('jwt failed'))
    const user = await userModel.findOneAndUpdate({ email, confirmed: false }, { confirmed: true })
    if (!user) return next(new AppError('jwt failed or alerdy veryfaid'))
    return res.status(200).json({ msg: 'done' })

})
// if last token expierd
export const reverifyUser = asyncHandler(async (req, res, next) => {
    const theToken = req.params.rftoken
    let { email } = jwt.decode(theToken, process.env.SECRET_KEY)
    if (!email) return next(new AppError('jwt failed'))


    sendingVerfiyEmail(req,email)


    return res.status(200).json({ msg: 'done' })


})

export const loginUser = asyncHandler(async (req, res, next) => {

    const { email_recoveryEmail_mobileNumber, password } = req.body;
    let email = email_recoveryEmail_mobileNumber
    const user = await userModel.findOne({ email }) || await userModel.findOne({ recoveryEmail: email }) || await userModel.findOne({ mobileNumber: email })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new AppError('Invalid credentials', 401));
    }
    if (!user.confirmed) {
        await sendingVerfiyEmail(req,email)
        return next(new AppError('you must verify your email'))

    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    await userModel.findOneAndUpdate({ email: user.email }, { status: "online" })

    return res.status(200).json({ msg: 'done', token })

})
