const{validateToken}= require('../common/utils/jwt')

module.exports = (req,res,next)=>{
    //Bearer{token}
    const authorization = req.header('Authorization');
    if(!authorization){
        res.formatResponse('missing authorization token',401);

    }
    const[type,token] = authorization.split(' ');
    if(type !== 'Bearer' || !token){
        res.formatResponse('Invalid token format',401);
        return; 
    }
    const payload = validateToken(token);
    console.log(validateToken(token));

    if(!payload) {
        res.formatResponse('Invalid token',401);
        return;
    }
next();

// way to use role
req.user = payload;

}