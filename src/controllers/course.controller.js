const { error } = require('winston');
const getLogger = require('../common/logger');
const Course= require('../models/course.model');
const logger = getLogger(__filename);
const formatResponse = require('../middleware/formatResponse.middleware');
const NotFoundException = require('../common/exceptions/notFound.exception');
const addCourseScheme = require('../Validations/addCourseScheme');
const Student = require('../models/student.model')

/*error handling
*1.callback --- callback hell
Course.find().exec((err,course)=>{
    if(err){
    next(err);//two choose 1
    return res.status(500).json(error:"error");
    }
    })
*2.promise
Course.find().exec().then((course)=>{}).catch(error=>{})
*async-await use try catch 
try{
const courses = await Course.find().exec(); 
res.formatResponse(courses);
}catch(e){
next(e);
}

*/
//avoid keep writing try-catch or we can use express-async-errors package
// function catchAllError(routerHandler){
//     return(req,res,next) =>{
//     try{
//         routerHandler(req,res,next);
//     }catch(e){
//         next(e);
//     }
// }
// }
//router.get('/',catchAllerror(getAllCourse))

const getAllCourses = async (req, res,next) => {
try{

const courses = await Course.find().exec(); 

  res.formatResponse(courses);
}catch(e){
logger.info(e.message);
next(e);//传递进行统一处理
}
    
};


const addCourse = async (req, res,next) => {
    //basic data validation
    //using Joi packet to achieve validation by writing a schema
     try{
      //move this part to validation file for reuseable
      // Joi.object({

      //   //code need to start with alphabet and end with number
      //   code:Joi.string()
      //   .uppercase()
      //   .regex(/^[a-zA-Z]+[0-9]+$/)
      //   .required()
      //   .message('Invalid code format'),
      //   name:Joi.string().min(1).max(30).required(),
      //   description: Joi.string().optional()
      // });

     // schema.validate(req.body);
     //allowunknow means if 
     const validBody = await addCourseScheme.validateAsync(req.body,{
      allowUnknown:true,
      stripUnknown:true,
    });
    //const{code,name,description} = req.body; 

  const course = await Course.create(validBody);
  console.log(course)
  res.formatResponse(course,201);
     }catch(e){
        logger.info(e.message);
        next(e);//传递进行统一处理
        }
}
//   catch(e){
// next(e)
//   }
;

const getCourseById = async (req, res,next) => {
try{
   const{id} = req.params;
   //populate will show the detail of the reference object
   const course  = await Course.findById(id).populate('students',
  {
    firstName: true
   }).exec();
   if(!course){
    //method1
    //return res.formatResponse(`Course with id ${id} not found`,404);
    throw new NotFoundException(`Course with id ${id} not found`,404);
   }
   res.formatResponse(course,200);
}catch(e){
logger.info(e.message);
next(e);//传递进行统一处理
}


};

const updateCourseById =async (req, res, next) => {
try{
const{id} = req.params;
const{code,name,description}  = req.body;
const course = await Course.findByIdAndUpdate(
  id,
  {code,name,description} ,
  //return the result after renew
  {
    new : true
  }
).exec();

if(!course){
  //method1
  return res.formatResponse(`Course with id ${id} not found`,404);
 }

 res.formatResponse(course);
}
catch(e){
    logger.info(e.message);
    next(e);//传递进行统一处理
    }
};

const deleteCourseById =async (req, res,next) => {
    try{
  const {id} = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if(!course){
    //method1
    return res.formatResponse(`Course with id ${id} not found`,404);
   }
   await Student.updateMany(
    {courses: course._id},{
    $pull:{
      courses:{$in :[course._id]}
    }
   })
   //if successfully deleted, return 204
   res.formatResponse(undefined,204)
}catch(e){
    logger.info(e.message);
    next(e);//传递进行统一处理
    }

};

module.exports = {
getAllCourses,
addCourse,
getCourseById,
updateCourseById,
deleteCourseById
};