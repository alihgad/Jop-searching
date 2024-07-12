import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    },
    userName:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    recoveryEmail:{
        type: String,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['user', 'company_HR'],
        default: 'user'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    birthDate:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['online', 'offline'],
        default: 'online'
    },
    mobileNumber:{
            type: String,
            required: true,
            minlength: 11,
            maxlength: 11,
            required: true,
        
    }
})


const userModel = mongoose.model('user', userSchema);


export default userModel;