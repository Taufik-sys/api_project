const mongoose=require('mongoose');
const registerSchema=new mongoose.Schema({
    customer_name:{
        type:String,
        required:true
    },
    customer_email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }   
},{
    timestamps:false,
    versionKey:false
})

const registerModel=new mongoose.model('register_details',registerSchema);

module.exports=registerModel;