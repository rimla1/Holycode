import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import isAuth from "../../shared/is-auth"
import { hasType } from "../../shared/has-roles";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

export const userRouter = Router()


/**
 * @openapi
 * /api/v1/users:
 *  post:
 *      tags:
 *          - User
 *      summary: Create a user with type user/admin
 *      requestBody:
 *          required: true
 *          contents:
 *              application/json:
 *                  schema:
 *      responses:
 *          200:
 *              description: Success
 *          409:
 *              description: Conflict
 *          400:
 *              description: Bad request
 */
userRouter.post("/", isAuth, hasType(["admin"]), userController.createUser.bind(userController))


// Get user by Name and/or age
/**
 * @openapi
 * '/api/v1/users/search/':
 *  get:
 *      tags:
 *          - User
 *      summary: Get a users with query string
 *      parameters:
 *      -   name: name
 *          in: query
 *          type: string
 *          required: false
 *      -   name: age
 *          in: query
 *          type: string
 *          required: false
 *          description: User's id
 *      responses:
 *          200:
 *              description: You got a user with unique id
 */
userRouter.get("/search", userController.searchUsersByNameAndOrAge.bind(userController))

// List a User
/**
 * @openapi
 * '/api/v1/users/{userId}':
 *  get:
 *      tags:
 *          - User
 *      summary: Get a user with id
 *      parameters:
 *      -   name: userId
 *          in: path
 *          description: User's id
 *      responses:
 *          200:
 *              description: You got a user with unique id
 */
userRouter.get("/:userId", isAuth, hasType([]), userController.listUser.bind(userController))

// List a Users
/**
 * @openapi
 * /api/v1/users:
 *  get:
 *      tags:
 *          - User
 *      summary: Get list of all users
 *      responses:
 *          200:
 *              description: You got list of all users
 */
userRouter.get("/", isAuth, hasType([]), userController.listUsers.bind(userController))

// Update a User
/** 
* @openapi
* '/api/v1/users/{userId}':
*   put:
*      tags:
*          - User
*      summary: Get a user with id
*      parameters:
*      -   name: userId
*          in: path
*          description: User's id
*      responses:
*          200:
*              description: You have updated user with id
*/
userRouter.put("/:userId", isAuth, userController.updateUser.bind(userController))


// Delete a User
/**
 * @openapi
 * '/api/v1/users/{userId}':
 *  delete:
 *      tags:
 *          - User
 *      summary: Delete a user with id
 *      parameters:
 *      -   name: userId
 *          in: path
 *          description: User's id
 *      responses:
 *          200:
 *              description: You deleted a user with unique id
 */
userRouter.delete("/:userId", isAuth, userController.deleteUser.bind(userController))


// Search Users 
// userRouter.get("/:userName/:userAge", searchUsers)

