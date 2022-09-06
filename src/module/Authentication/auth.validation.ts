import Joi from "joi";

export const loginInputValidation = Joi.object({
    email: Joi.string()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
           .min(10)
           .max(50)
           .required(),
     
    password: Joi.string()
           .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
           .min(5)
           .max(50)
           .required()
})