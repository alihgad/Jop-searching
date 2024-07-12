import mongoose, { Schema } from "mongoose";

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique : true,
        minlength: 2,
        maxlength: 15
    },
    description :{
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500
    },
    industry :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    address:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    numberOfEmployees:{
        type : String,
        required : true,
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    companyHR : {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
})


const companyModel = mongoose.model('company', companySchema);


export default companyModel;