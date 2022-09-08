import Joi from 'joi'

/**
 * @openapi
 *  components:
 *      schemas:
 *          CreateUserRequest:
 *              type: object
 *              required:
 *                  - name
 *                  - age
 *                  - email
 *                  - password
 *                  - types
 *              properties:
 *                  name:
 *                      type: string
 *                      default: Almir
 *                  age:
 *                      type: number
 *                      default: 20
 *                  email:
 *                      type: string
 *                      default: almir@gmail.com
 *                  password
 *                      type: string
 *                      default: almir123
 *                  types:
 *                      type: string[]
 *                      default: [user]
 *          CreateUserResponse:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  age:
 *                      type: number
 *                  email:
 *                      type: string
 *                  password
 *                      type: string
 *                  types:
 *                      type: string[]
 *                  _id: 
 *                      type: string
 *          updateUserRequest:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      default: newName
 *                  age:
 *                      type: number
 *                      default: 21
 *                  password
 *                      type: string
 *                      default: noviPassword123
 *          updateUserResponse:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  age:
 *                      type: number
 *                  email:
 *                      type: string
 *                  password
 *                      type: string
 *                  types:
 *                      type: string[]
 *                  _id: 
 *                      type: string
 */

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