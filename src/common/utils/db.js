const mongoose = require("mongoose");
const config = require("../../config");

const getLogger = require('../logger');
const logger = getLogger(__filename);
const connectToDb = async() =>{
//code block used to handle error
    const db =    mongoose.connection;
    //once 监听一次
    //on 监听多次
    db.on('error',(error)=>{
        logger.error(error);
        throw new Error(error);
    });
    db.on('connected',()=>{
        logger.info('DB connected') ;
    });
    db.on('disconnected',()=>{
        logger.warn('db disconnected');
    });
return mongoose.connect(config.DB_CONNECTION_STRING);//链接db和server
}

module.exports = connectToDb;