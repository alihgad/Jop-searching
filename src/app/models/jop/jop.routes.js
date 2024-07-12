import { Router } from "express";
import { addJop, applayJop, deleteJop, getAllJops, getCompanyJops, getFilteredJops, updateJop } from "./jop.controler.js";
import token from "../../glopalMiddelwares/token.js";
import role from "../../glopalMiddelwares/role.js";
import { addJopSchema, updateJopSchema } from "./validationschema/schemas.js";
import glopalValidation from './../../glopalMiddelwares/glopalValidation.js'
import { multerHost } from "./middelWares/multer.js";
let roles = ['user', 'company_HR']
let router = Router()

router.post('/addJop',token,role(["company_HR"]),glopalValidation(addJopSchema),addJop)
router.put('/updateJop/:id',token,role(["company_HR"]),glopalValidation(updateJopSchema),updateJop)
router.delete('/deleteJop/:id',token,role(["company_HR"]),deleteJop)
router.get('/getAllJops/',token,role(roles),getAllJops)
router.get('/getComapnyJops/:id',token,role(roles),getCompanyJops)
router.get('/getFilteredJops',token,role(roles),getFilteredJops)
router.post('/applayJop/:jopid',token,role(["user"]),multerHost().single("cv"),applayJop)


export default router