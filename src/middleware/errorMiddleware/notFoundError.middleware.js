const NotFoundException = require("../../common/exceptions/notFound.exception");

module.exports = (error,req,res,next)=>{
    if(error instanceof NotFoundException){
     return   res.formatResponse(error.message,404)
    }
    next(error);//when writing error middleware we need to using next to pass the error
};