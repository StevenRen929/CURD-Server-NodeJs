const { error } = require('winston');
const getLogger = require('../common/logger');
const Student= require('../models/student.model');
const Course = require('../models/course.model')
const logger = getLogger(__filename);
const formatResponse = require('../middleware/formatResponse.middleware');
const NotFoundException = require('../common/exceptions/notFound.exception');
const { message } = require('../Validations/addCourseScheme');




const getAllStudents = async (req, res,next) => {
  try{
    // const {page = 1} = req.qurey;//default 1 form query

        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page -1 ) * pageSize;

const students = await Student.find().limit(pageSize).skip(skip).exec(); //qurey exec() best pratice,  //这里的find会返回所有学生

  res.formatResponse(students);
// return res.send(201);
  }catch(e){
    logger.info(e.message);
    next(e);//传递进行统一处理
    }

};
//mongoose 底层依赖于mongoDB

const addStudent = async (req, res, next) => {
  try{
    //basic data validation
    const{firstName,lastName,email} = req.body; 
    //method1 :const student = new Student({firstName,lastName,email});
  // await student.save(); //this step will save data to database

  //use method2 here
  const student = await Student.create({firstName,lastName,email});
  console.log(student)
  res.formatResponse(student,201);
  }catch(e){
    logger.info(e.message);
    next(e);//传递进行统一处理
    }
};

const getStudentById = async (req, res,next) => {
  try{

   const{id} = req.params;
   const student  = await Student.findById(id).populate('courses',
    {
      code:true,
      name:true
   }).exec();
   if(!student){
    //method1
    return res.formatResponse(`Student with id ${id} not found`,404);
   }
   res.formatResponse(student,200);
    //method2 declare notfound exception
   // throw new NotFoundException(`student with id ${id} not found!`);
  }catch(e){
    logger.info(e.message);
    next(e);//传递进行统一处理
    }
};

const updateStudentById =async (req, res,next) => {
  try{
const{id} = req.params;
const{firstName,lastName,email} = req.body;
const student = await Student.findByIdAndUpdate(
  id,
  {firstName,lastName,email},
  //return the result after renew
  {new : true}).exec();

if(!student){
  //method1
  return res.formatResponse(`Student with id ${id} not found`,404);
 }

 res.formatResponse(student);
}catch(e){
  logger.info(e.message);
  next(e);//传递进行统一处理
  }
};

const deleteStudentById =async (req, res,next) => {
  try{
  const {id} = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if(!student){
    //method1
    return res.formatResponse(`Student with id ${id} not found`,404);
   }
   await Course.updateMany({Students:student._id},{
    $pull:{
      students:[student._id]
    }
   })
   //if successfully deleted, return 204
   res.formatResponse(undefined,204)
  }catch(e){
    logger.info(e.message);
    next(e);//传递进行统一处理
    }

};

//Post /v1/students/:studentId/courses/:courseId
const addStudentToCourse = async (req, res, next)=> {
  try{

    //if load is high, use transaction
    //TODO:
      //step1.find student documet via id
      const {courseId,studentId} =req.params;
      const student = await Student.findById(studentId);

      //step2.find course document via id
      const course = await Course.findById(courseId);

      //reason:if student and the course not exit, we can't do anything return 404
      if(!student){
        throw new  NotFoundException(`Student Not found:${studentId}`)
      }

      if(!course){
        throw new  NotFoundException(`course Not found:${courseId}`)
      }
      //if found student and course 

      //step3. add course info to student
      student.courses.addToSet(courseId);
      //method2: Student.findByIdAndUpdate(studentId,{$addToSet:{courses:[courseId]}}).exec()

      //step4. add student info to course 
      course.students.addToSet(studentId);

      //step5. save student and course
      await student.save();
      await course.save();    
      //create new 201/ else 200 success
      res.formatResponse(student,200);
  }catch(e){
      logger.info(e.message);
      next(e);
  }

}

//Delete /v1/students/:studentId/courses/:courseId
const removeStudentFromCourse  = async (req, res, next)=> {
  try{

    //if load is high, use transaction
    //TODO:
      //step1.find student documet via id
      const {courseId,studentId} =req.params;
      const student = await Student.findById(studentId);

      //step2.find course document via id
      const course = await Course.findById(courseId);

      //reason:if student and the course not exit, we can't do anything return 404
      if(!student){
        throw new  NotFoundException(`Student Not found:${studentId}`)
      }

      if(!course){
        throw new  NotFoundException(`course Not found:${courseId}`)
      }
      //if found student and course 

      //step3. remove course info to student
      student.courses.pull(courseId);

      //step4. remove student info to course 
      course.students.pull(studentId);

      //step5. save student and course
      await student.save();
      await course.save();    
      res.formatResponse(undefined,204);
  }catch(e){
      logger.info(e.message);
      next(e);
  }

}


module.exports = {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    addStudentToCourse,
    removeStudentFromCourse
};