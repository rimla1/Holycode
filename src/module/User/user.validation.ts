import Joi from 'joi'



export const createUserInputValidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    age: Joi.number()
        .integer()
        .min(1)
        .max(140)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    types: Joi.array().required()
})

export const updateUserInputValidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30),
    age: Joi.number()
        .integer()
        .min(1)
        .max(140),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})