import { NextFunction , Request, Response } from "express";

import jwt from 'jsonwebtoken'

const SECRET  = process.env.SECRET

// ! --> means do not check this

export async function isAuthenticated(req: Request , res: Response , next: NextFunction){

    const authHeader = req.headers.authorization;
    if(authHeader) {

        const token = authHeader.split(' ')[1];
        jwt.verify(token ,  SECRET!, (err , decodeToken) => {
            if(err) return res.sendStatus(403);
            if(!decodeToken) return res.sendStatus(403);
            if(typeof decodeToken === "string") return res.sendStatus(403);

            req.headers['userId'] = decodeToken.id;
            next();
        })
    }else{
        res.sendStatus(401);
    }
}       