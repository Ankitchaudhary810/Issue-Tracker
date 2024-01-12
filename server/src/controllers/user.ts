import { NextFunction, Request , Response } from "express";
import { PrismaClient } from '@prisma/client'
import z, { string } from "zod"
import jwt from "jsonwebtoken";


const inputSchema = z.object({
    fullName:z.string().max(20).optional(),
    email: z.string().email({message:"Provide valid email"}),
    password: z.string().min(5,{message:"Password not less then 5"}).max(10 , {message:"Password not More then 10"})
})
const prisma = new  PrismaClient();
export async function handleUserSignup(req:Request, res: Response) {
    try { 
        const inputValues  = inputSchema.safeParse(req.body);
        if(!inputValues.success){
            return res.json(inputValues.error);
        }
        const {fullName, email, password} = inputValues.data
        const user = await prisma.users.create({
            data:{
                fullName ,
                email, 
                password
            }
        });
        return res.sendStatus(201);
       
    } catch (error) {
        console.log(error);
        return res.sendStatus(501);
    }
}


export async function handleUserLogin(req: Request, res: Response){
    try{
        const {email , password} = req.body;
        const inputValues = inputSchema.safeParse(req.body);
        if(!inputValues.success){
            return res.json(inputValues.error);
        }
        const user = await prisma.users.findUnique({
            where:{
                email:email,
                password:password
            }
        })
       if(user){
           const token = await jwt.sign({id: user.id , email:user.email}, process.env.SECRET!);
           res.status(200).json(token);
       } 
       res.json({msg:"User not Found"});
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(501);
    }
}