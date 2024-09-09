//一定要记得写next
//optional
const { config } = require("dotenv");
const { createLogger } = require("winston");
const getLogger = require("../../common/logger");
const formatResponseMiddleware= require('../formatResponse.middleware');

//先记录错误 记得导入logger
const logger = getLogger(__filename);

module.exports = (error,req,res,next)=>{
    logger.error(`${error.message}\n stack:${error.stack}`);

    res.formatResponse(`Something goes wrong please try again in few miniutes`,
        500,
        //the resonponse will send error stack if and only if in dev condition
        config.NODE_ENV === 'dev' && {stack:error.stack});

}