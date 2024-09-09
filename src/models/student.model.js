const { Schema,model } = require("mongoose");
const Joi = require('joi');

const studentSchema = new Schema({
    firstName:{
        type:String, // or type:'string'
        uppercase:true,
        alias: 'name',//rename virtual field
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        validate:[
            {//验证器
                validator:(email)=>{
                //     //method1:REGEX we need to use regular expression to setup the rule for email format
                //   if(  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ .test(email)){
                //     return true;
                //   }else{
                   
                //     return false;
                    
                //   }
                //method2:use validation library
                //joi, Yup validator.js
                //use joi here
                // const validationRule = Joi.string().email();
                // const result= validationRule.validate(email);
                // return result.error===undefined;

                  return Joi.string().email().validate(email).error === undefined;
                },
                  msg:"Invaild email format"
               
            }
        ]
    },

    courses:[
        {
            type: Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
},{
    timestamps:true,
    // toJSON:{
    //     virtuals:true,
    // }
    
});

//调用model 可以在moogoose注册这个student model
//Cyclic dependency issue
const Student = model('Student',studentSchema);

module.exports = Student;



