import { Router } from "express";
import { addUser, loginUser, reverifyUser, verifyUser } from "./user.auth.js";
import { deleteUser, forgetPassword, GetAllRecoveryEmail, getOtherData, getSelfData, resetPassword, updatePassword, updateUsers } from "./user.controler.js";
import token from "../../glopalMiddelwares/token.js";
import glopalValidation from "../../glopalMiddelwares/glopalValidation.js";
import { logInScema, resetPasswordSchema, signUpSchema, updatePasswordSchema } from "./validationSchemas/Schemas.js";

const router = Router()


// auth apis

router.post('/signUp',glopalValidation(signUpSchema),addUser)
router.post('/login',glopalValidation(logInScema),loginUser)
router.get('/verify/:token',verifyUser)
router.get('/reVerify/:rftoken',reverifyUser)

// manibulate apis

router.put('/updateUser',token,updateUsers)
router.put('/updatePassword',token,glopalValidation(updatePasswordSchema),updatePassword)
router.delete('/deleteUser',token,deleteUser)
router.get('/getSelfData',token,getSelfData)
router.get('/getOtherData/:id',token,getOtherData)
router.post('/forgetPassword/',forgetPassword)
router.post('/resetPassword/:token',glopalValidation(resetPasswordSchema),resetPassword)
router.post('/GetAllRecoveryEmail',GetAllRecoveryEmail)







export default router