import { NextFunction, Request , Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export  async function checkUserEmailInDb(req: Request, res: Response, next: NextFunction) {
    try {
        const {email} = req.body;
        const user = await prisma.users.findFirst({
            where:{
                email: email
            }
        });
        if(user){
            return res.json({msg:"Email already exists"})
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.sendStatus(501).json({msg:"Internal Server Error"});
    }
    
    
}