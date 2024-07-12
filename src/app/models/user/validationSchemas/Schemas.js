import joi from 'joi'
import validationShortCuts from '../shortCuts/validationShortCuts.js'


// Validation schema for login request
export const logInScema = {
    body: joi.object({
        email_recoveryEmail_mobileNumber: joi.string().required(),
        password: joi.string().required()
    }).required(),
}

// Validation schema for sign up request

export const signUpSchema = {
    body:joi.object({
        firstName: joi.string().min(2).max(15).required(),
        lastName: joi.string().min(2).max(15).required(),
        email: joi.string().email().required(),
        recoveryEmail: joi.string().email(),
        password: validationShortCuts.password,
        cPassword: validationShortCuts.cPassword,
        age: joi.number().min(18).max(80).required(),
        role: joi.string().valid('user', 'company_HR'),
        birthDate: joi.string().required(),
        mobileNumber : joi.string().min(11).max(11).pattern(new RegExp('^01[0-9]{9}$')).required()
    })
}

// Validation schema for update password request

export const updatePasswordSchema = {
    body:joi.object({
        oldPassword:joi.string().required(),
        password: validationShortCuts.password,
        cPassword: validationShortCuts.cPassword,
    }),
    headers: validationShortCuts.headers
}



// Validation schema for reset password request




export const resetPasswordSchema = {
    body: joi.object({
        password: validationShortCuts.password,
        cPassword: validationShortCuts.cPassword
    }),
    headers: validationShortCuts.headers
}

