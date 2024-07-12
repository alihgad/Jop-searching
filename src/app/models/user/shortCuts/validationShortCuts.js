import joi from "joi";

export default {
    headers: joi.object({
        'content-type': joi.string(),
        'user-agent': joi.string(),
        accept: joi.string(),
        'postman-token': joi.string(),
        host: joi.string(),
        'accept-encoding': joi.string(),
        connection: joi.string(),
        'content-length': joi.string(),
        "token": joi.string().required().min(20),

    }),
    password: joi.string().min(8).pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({ "string.pattern.base": "at least 8 chracters , one upperCase , on spicialchracter" }),
    cPassword: joi.string().valid(joi.ref("password")).required(),
}