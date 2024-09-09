module.exports = (req,res,next) =>{
    //默认statuscode200
    //custom object 可以用来传想要的
    res.formatResponse = (data,statusCode = 200,customObject = {}) =>{
        const dataKey = statusCode< 400? 'data':'error';
        const responseData ={
            statusCode:statusCode,
            [dataKey]:data,
            ...customObject
        }

      return  res.status(statusCode).json(responseData);

    }
    next();
}