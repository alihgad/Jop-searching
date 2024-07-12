import mongoose, { Schema } from "mongoose";

const applicationSchema = mongoose.Schema({
    jopId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'job'
    },
    companyId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'company'
    }
    ,
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'user'
    },
    userTechSkills: {
        type: [String],
        required: true
    },
    userSoftSkills: {
        type: [String],
        required: true
    },
    userResume: {
        type: String,
        required: true
    }
}
    ,
    { timestamps: true })


const applicationModel = mongoose.model('application', applicationSchema);


export default applicationModel;