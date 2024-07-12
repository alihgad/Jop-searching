import applicationModel from "../../../db/moduels/application/application.model.js";
import companyModel from "../../../db/moduels/company/company.model.js";
import jopModel from "../../../db/moduels/jop/jop.model.js";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import cloudinary from "./middelWares/cloudinary.js";

export const addJop = asyncHandler(async (req,res,next)=>{
    req.body.addedBy = req.user._id 
    let company  = await companyModel.findOne({companyHR:req.user._id})
    if(!company) return next(new AppError("Couldn't find company",404));
    req.body.company = company._id 
    const newJob = await jopModel.create(req.body);
    return res.status(201).json(newJob);
})

export const updateJop = asyncHandler(async (req,res,next)=>{
    let id = req.params.id; 
    const newJob = await jopModel.findByIdAndUpdate(id,req.body , {new:true});
    return res.status(201).json(newJob);
})

export const deleteJop = asyncHandler(async (req,res,next)=>{
    let id = req.params.id; 
    const jop = await jopModel.findByIdAndDelete(id);
    return res.status(201).json(jop);
})

export const getAllJops = asyncHandler(async (req,res,next)=>{
    const jops = await jopModel.find({}).populate("company");
    return res.status(201).json(jops);
})

export const getCompanyJops = asyncHandler(async (req,res,next)=>{
    let companyId = req.params.id; 
    const jops = await jopModel.find({company:companyId}).populate("company");
    return res.status(201).json(jops);
})

export const getFilteredJops = asyncHandler(async (req,res,next)=>{
    let query = req.query; 
    const jops = await jopModel.find(query);
    return res.status(201).json(jops);
})

export const applayJop = asyncHandler(async (req,res,next)=>{
    let jopId = req.params.jopid; 
    let userId = req.user._id; 
    let jop = await jopModel.findById(jopId)
    let companyId = jop.company; 
    let data = await cloudinary.uploader.upload(req.file.path,{folder:'cvs' ,resource_type:'raw' })
    let userResume = data.secure_url
    let {userTechSkills, userSoftSkills} = req.body
    const application = await applicationModel.create({jopId,companyId,userId,userTechSkills,userSoftSkills,userResume});
    return res.status(201).json({msg:"done",application})
})