import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../shared/errors";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./auth.types";
import { loginInputValidation } from "./auth.validation";




export class AuthController {
    
    private authService: AuthService

    constructor(authService: AuthService){
        this.authService = authService
    }

    async login(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body

        const loginRequest: LoginRequest = {
            email,
            password
        }
        try {
        const loginInput = loginInputValidation.validate(loginRequest, {abortEarly: false})
        if(loginInput.error){
            throw new ValidationError(loginInput.error.details)
        }
        const loginData = await this.authService.login(loginRequest)
        return res.json(loginData)
        } catch (error) {
            return next(error)
        }
        
    }
}

