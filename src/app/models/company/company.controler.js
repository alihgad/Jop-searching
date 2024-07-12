import companyModel from "../../../db/moduels/company/company.model.js";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import jopModel from "../../../db/moduels/jop/jop.model.js"
import applicationModel from "../../../db/moduels/application/application.model.js";

export const addCompany = asyncHandler(async(req,res,next)=>{
    req.body.companyHR = req.user._id
    let company = await companyModel.create(req.body)
    return res.status(201).json({msg: 'Company added successfully' , company} )
})  

export const updateCompany = asyncHandler(async(req,res,next)=>{
    let id = req.params.id
    let company = await companyModel.findById(id)
    if (!company){
        return next(new AppError('Company not found' , 404))
    }
    if(company.companyHR.toString() != req.user._id){
        return next(new AppError("unauthrezied",401))
    }
    company = await companyModel.findByIdAndUpdate(id,req.body,{new:true})
    return res.status(200).json({msg: 'Company updated successfully' , company} )
})



export const deleteCompany = asyncHandler(async(req,res,next)=>{
    let id = req.params.id
    let company = await companyModel.findById(id)
    if (!company){
        return next(new AppError('Company not found' , 404))
    }
    if(company.companyHR.toString() != req.user._id){
        return next(new AppError("unauthrezied",401))
    }
    company = await companyModel.findByIdAndDelete(id,req.body,{new:true})
     await jopModel.deleteMany({company : company.id}) // delete related jops
    return res.status(200).json({msg: 'Company deleted successfully' , company} )
})

export const getCompany = asyncHandler(async(req,res,next)=>{
    let id = req.params.id
    let company = await companyModel.findById(id)
    if (!company){
        return next(new AppError('Company not found' , 404))
    }

    if(company.companyHR.toString() != req.user._id){
        return next(new AppError("unauthrezied",401))
    }
    
    let jops = await jopModel.find({addedBy:company.companyHR})
    return res.status(200).json({msg: 'Company deleted successfully' , company ,jops} )
})

export const companyWithName = asyncHandler(async(req,res,next)=>{
    let name = req.query.name
    let company = await companyModel.find({})
    let companies = company.filter(c=>c.companyName.toLowerCase().includes(name.toLowerCase()))
    res.status(200).json({msg: 'Company', companies})
})

export const applications = asyncHandler(async(req,res,next)=>{
    let company = await companyModel.findOne({companyHR: req.user._id})
    let applications = await applicationModel.find({combanyId:company._id}).populate("userId")
    res.status(200).json({msg: 'Applications', applications})
})



