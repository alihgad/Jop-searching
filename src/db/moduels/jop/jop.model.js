import mongoose, { Schema } from "mongoose";

const jopSchema = mongoose.Schema({
    jopTitle : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    jobLocation :{
        type: String,
        required: true,
        enum : ['onsite','remotely','hybrid '],
    },
    workingTime : {
        type: String,
        required: true,
        enum : ['full-time','part-time']
    },
    seniorityLevel :{
    type: String,
        required: true,
        enum : ['junior','Mid-Level','Senior','Team-Lead','CTO']
    },
    jobDescription :{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    technicalSkills :{
        type: [String],
        required: true,
    },
    softSkills :{
        type: [String],
        required: true,
    },
    addedBy:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true,
    }

})


const jopModel = mongoose.model('jop', jopSchema);


export default jopModel;