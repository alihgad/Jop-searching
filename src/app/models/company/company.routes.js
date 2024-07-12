import { Router } from "express";
import { addCompany, applications, companyWithName, deleteCompany, getCompany, updateCompany } from "./company.controler.js";
import token from "../../glopalMiddelwares/token.js";
import role from "../../glopalMiddelwares/role.js";
import glopalValidation from "../../glopalMiddelwares/glopalValidation.js";
import { addCompanySchema, updateCompanySchema } from "./validationSchemas/schemas.js";

let roles = ['user', 'company_HR']

let router = Router()

router.post('/addCompany',token,role(["company_HR"]),glopalValidation(addCompanySchema),addCompany)
router.get('/companyWithName',token,role(roles),companyWithName)
router.get('/applications',token,role(["company_HR"]),applications)
router.put('/updateCompany/:id',token,role(["company_HR"]),glopalValidation(updateCompanySchema),updateCompany)
router.delete('/deleteCompany/:id',token,role(["company_HR"]),deleteCompany)
router.get('/getCompany/:id',token,role(["company_HR"]),getCompany)
export default router