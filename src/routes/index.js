//这个index的目的是把所有的route文件作总结
//目的是可以在外层的index js 文件中一次性导入所有的route 而不用

const {Router} = require('express');
const studentRouter = require('./student.router');
const courseRouter = require('./course.router')
const v1Router = Router();


v1Router.use('/students',studentRouter);
v1Router.use('/courses',courseRouter);
module.exports = v1Router;

