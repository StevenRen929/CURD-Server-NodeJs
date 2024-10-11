module.exports = (req,res,next)=>{
    //console.log(req.user);

    if(!req.user){
        res.formatResponse('unable to access',403);
        return;
    }
    if(req.user.role !== 'admin'){
        res.formatResponse('unable to access',403);
        return;
    }
   // console.log(req.user.role);
   if(req.user.role === 'admin'){
    next();
}
  


}