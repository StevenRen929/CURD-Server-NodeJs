//helmet，morgan，winston,rate-limit, will be covered
//

const express = require('express');
const v1Router = require('./routes');
const config = require('./config');
const morgan = require('./common/morgan');
const helmet = require('helmet');
const cors = require('cors');
//const formatResponseMiildeware = require('./middleware/formatResponse.middleware')

const pathNotFoundMiddleware = require('./middleware/pathNotFound.middleware');
const unknowErrorMiddleware = require('./middleware/errorMiddleware/unknowError.middleware');
const formatResponseMiddleware = require('./middleware/formatResponse.middleware');
const validationErrorMiddleware = require('./middleware/errorMiddleware/validationError.middleware');
const notFoundMiddleware = require('./middleware/errorMiddleware/notFoundError.middleware');
const getLogger = require('./common/logger')


const app = express();
const logger = getLogger(__filename);


//入口文件配置morgan
app.use(express.json()); //加了才能去数据
app.use(cors());
app.use(helmet());
app.use(formatResponseMiddleware);

//app.use(formatResponseMiildeware)
app.use(morgan);
//app.use(notFoundMiddleware);//here has problem need to debug




app.use('/v1',v1Router)
app.use(validationErrorMiddleware);
app.use(notFoundMiddleware);
app.use(unknowErrorMiddleware);
app.use(pathNotFoundMiddleware);//一定要放在后面

// app.listen(3000);




module.exports = app;