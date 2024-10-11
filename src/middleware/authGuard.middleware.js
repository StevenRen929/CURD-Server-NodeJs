const{validateToken}= require('../common/utils/jwt')

module.exports = (req,res,next)=>{
    //Bearer{token}
    //test1
    const authorization = req.header('Authorization');
    if(!authorization){
        res.formatResponse('Missing authorization token',401);
        return;
    };
    //test2
    const[type,token] = authorization.split(' ');
    if(type !== 'Bearer' || !token){
        res.formatResponse('Invalid token format',401);
        return; 
    }
    const payload = validateToken(token);
  //  console.log(validateToken(token));
    //test3
    if(!payload) {
        res.formatResponse('Invalid token',401);
        return;
    }
    //test4
//req.user = payload;
next();




}