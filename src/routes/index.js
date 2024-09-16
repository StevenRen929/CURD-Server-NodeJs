//这个index的目的是把所有的route文件作总结
//目的是可以在外层的index js 文件中一次性导入所有的route 而不用

const {Router} = require('express');
const studentRouter = require('./student.router');
const courseRouter = require('./course.router')
const authRouter = require('./auth.router')
const v1Router = Router();
const authGuardMiddleware = require('../middleware/authGuard.middleware')


v1Router.use('/students',authGuardMiddleware,studentRouter);
v1Router.use('/courses',authGuardMiddleware,courseRouter);
v1Router.use('/auth',authRouter);
module.exports = v1Router;

