import {  Response ,NextFunction } from "express";
import { NotAuthenticated } from "./errors";
import { RequestWithUserData } from "./shared.types";


export const hasType = (neededTypes: string[]) => {
    return (req: RequestWithUserData, res: Response, next: NextFunction) => {
        try {
            if(neededTypes.length === 0) {
                return next();
            }
    
            let hasType = false;
    
            neededTypes.forEach(type => {
                if(req.user && req.user.types.includes(type)){
                    hasType = true
                  } 
            })
    
            if(hasType){
                next();
                return;
              } else {
                throw new NotAuthenticated('Not Authorized')
              }

        } catch (error) {
            throw error
        }
    }
  }