const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET = process.env.SECRET;
const authenticate = (req,res,next)=>{
    const headers = req.headers.authorization;
    if(headers){
        const token = headers.split(' ')[1];
        jwt.verify(token, SECRET, (err, user)=>{
            if(err){
                return res.status(403).json({error: "Unothorised"});
            }
            req.userId = user.id;
            next()
        });
    }else{
        res.status(401).json({error: "Unothorised"});
    }
}

module.exports = {
    SECRET,
    authenticate
}