//fields: code, name,description,
//TODO,achieve the EDR of many-to-many between student and course
const { Schema,model } = require("mongoose");
const Student = require("./student.model");

const courseSchema = new Schema({
    // _id:{
    //     type:String,
    //     alias:'code',
    //     //use code as id, optional
    // },
    code:{
        type:String, // or type:'string'
        required:true,
        minLength:4
        //uppercase:true,
    },
    name:{
        type:String,
    },
    description:{
        type:String,
        default : "this is a default description"
    },
    students:[{
        //the type is equal to the type of the ref 
        //the ref is objectId 
        type:Schema.Types.ObjectId,
        ref:'Student'
    }
    ]
});

//调用model 可以在moogoose注册这个student model
//Cyclic dependency issue


module.exports =model('Course',courseSchema);
