//helmet，morgan，winston,rate-limit, will be covered
//
//大型项目中 与数据库连接和端口监听放在index

const config = require('./config');
const getLogger =require('./common/logger');
const helmet = require('helmet');
const connectToDb = require('./common/utils/db');


const app = require('./app');

const logger = getLogger(__filename);



connectToDb().then(()=>{
    app.listen(config.PORT,()=>{
        //console.log(`server is listening on port : ${config.PORT}`)
        logger.info(`server is listening on port : ${config.PORT}`);
    })
})

module.exports = app;