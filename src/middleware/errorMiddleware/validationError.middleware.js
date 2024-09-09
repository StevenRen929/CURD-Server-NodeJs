module.exports = (error,req,res,next)=>{
    if(error.name === "ValidationError"){
     return   res.formatResponse(error.message,400)
    }
    next(error);//when writing error middleware we need to using next to pass the error
};