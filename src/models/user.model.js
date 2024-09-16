const {Schema,model} =require('mongoose');

const schema = new Schema({
    //the reason why we need to use username here because we can get a lot of benefit 
    //for example we can change username in the future but not change the reference
    username:{
        type:String,
        required:true,
        unique: true,//create a unique a unique index
        //if we need to add a unique during development we need to do this on other way
    },
    password:{
        type:String,
        require: true
    },

    // role:{
    //     type:String,
    //     enum: ['admin','user']
    // }
    // locked:{
    //     type:Boolean
    // }
});

//针对document not allow to write arrow function
//who use this function this will point to the corresponding 
// schema.method.hashPassword = async function(){
// this.password = await bcrtpt.hass(this.password,12);
// }

//in controller
// await user.hashPassword();
//await user.save()


//delete passform after register
//during transfer to JSON and return response
//delete the password
schema.set('toJSON',{
    transform: function(doc,ret){
        delete ret.password;
        return ret;
    },
});

module.exports = model('User',schema);