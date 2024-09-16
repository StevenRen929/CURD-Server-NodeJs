const { sanitizeFilter } = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const getLogger = require('../common/logger');
const {generateToken,validateToken} = require('../common/utils/jwt');

const logger = getLogger(__filename); 

//register don't need to return token
const register = async (req,res,next) =>{
try{
const{username,password} = req.body;
//check if userName duplicated
const existingUser = await User.findOne({username}).exec();
if(existingUser){
    //409 represent conflict
   
    res.formatResponse(`${username} already exists`,409);
    return;
}
const hashedPassword = await bcrypt.hash(password,12);
user = await User.create({username,password:hashedPassword});


res.formatResponse(user,201);
    }catch(e){
        logger.info(e.message);
        next(e)
    }

};

const login =  async (req, res, next) =>{
try{
    
   // const user = await User.findOne({username}).exec();

 const {username,password} = req.body;
 const user = await User.findOne({username}).exec();
 if(!user){ 
    res.formatResponse(`incorrect username and password`,401);
    return;
}
if(!(await bcrypt.compare(password,user.password))){
    res.formatResponse(`incorrect username and password`,401);
    return;
}
const token = generateToken({sub: user.id,username:user.username,role:'admin'});
res.formatResponse({username,token});
// res.formatResponse({username});
    }catch(e){
        logger.info(e.message);
        next(e);
    }
}

module.exports = {
    register,
    login
}