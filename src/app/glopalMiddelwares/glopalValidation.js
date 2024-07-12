import asyncHandler from "../utils/asyncHandler.js";

export default function glopalValidation(schema){
    return asyncHandler(
        async (req, res, next) => {
        let result = "";

            for (let key in schema) {
                if (req[key]) {
                    const { error } = schema[key].validate(req[key], { abortEarly: false });
                    if (error) {
                        return res.send(error.details.map((err) => {
                            return err.message;
                        }));
                    }
                }
            }
            next()
        }
    )
} 