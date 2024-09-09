const winston = require('winston');
const path = require('path');
const { time } = require('console');


//这个logger只会记录模板里面的信息 所以要加点东西
//winston.createLogger()

//__filename
const getLogger = (fileName) => {
    const logger = winston.createLogger({
        level:'info',
        defaultMeta:{
            file: fileName?path.basename(fileName):undefined
        },
        format : winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({timestamp,level,message,file})=>`[${timestamp}] [${level}] ${file? `[${file}]`:''} : ${message}`
        )
        ),
        //记录日志到console
        transports: [
            // simlest way to log the them into cosole
            // we can transports to file system
            new winston.transports.Console(),
        ],
    });
    //connect winston logger with morgan
    logger.stream = {
        write:(message)=>{
            logger.info(message);
        },
    };

return logger;
}

module.exports =getLogger;