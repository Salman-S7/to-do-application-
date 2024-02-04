import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv'
// dotenv.config();

// export const SECRET = process.env.SECRET;
export const SECRET="SUP3RS3CR3T";
export const authenticate = (req : Request,res : Response,next : NextFunction)=>{
    const headers = req.headers.authorization;
    if(headers){
        const token = headers.split(' ')[1];
        jwt.verify(token, SECRET, (err, user)=>{
            if(err){
                return res.status(403).json({error: "Unothorised"});
            }
            if(!user){
                return res.status(403).json({error: "Unothorised"});
            }
            if(typeof user === 'string'){
                return res.status(403).json({error: "Unothorised"});
            }
            req.headers["userId"] = user.id;
            next();
        });
    }else{
        res.status(401).json({error: "Unothorised"});
    }
}
