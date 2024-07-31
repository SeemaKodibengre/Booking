const express = require('express')
const app = express();
const jwt=require('jsonwebtoken')
const secretCode=process.env.JWT_TOKEN;

const verifyToken=async(req, res, next) => {
 
    const token=req.header('token');
    console.log(token,'token');
    if(!token){
res.status(401).json({error:"access denied no token provided"})

    }

try{
    const data= await jwt.verify(token,secretCode)//decode
    console.log(data.id)
    next();
}
    
 catch(err){
    res.status(403).send({ message: 'Invalid token!' });
 }
}


module.exports=verifyToken;