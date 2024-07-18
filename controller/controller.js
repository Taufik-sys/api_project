const registerModel = require("../model/registerModel");
const bcrypt=require('bcryptjs');

const postRegister=async(req,res)=>{
    try{
        console.log('Details',req.body);
        let formData;

        if(!req.body.customer_name){
            return res.status(401).json({
                success:false,
                message:'Customer name is required'
            });
        }
        else if(!req.body.customer_email){
            return res.status(401).json({
                success:false,
                message:'Customer email is required'
            });
        }
        else if(!req.body.password){
            return res.status(401).json({
                success:false,
                message:'Password is required'
            });
        }
        else{
                formData=await registerModel({
                customer_name:req.body.customer_name,
                customer_email:req.body.customer_email,
                password:await bcrypt.hash(req.body.password,12)
            })
        }
        let saved=await formData.save();
        if(saved){
            console.log('Data inserted Successfully');
            return res.status(200).json({
                success:true,
                message:'Data Inserted Successfully'
            })
        }
    }
    catch(err){
        console.log('Error in posting data',err);
        return res.status(401).json({
            success:false,
            message:err
        })
    }
}

const showDetails=async(req,res)=>{
    try{
        const showDetails=await registerModel.find().select(
            '_id customer_name customer_email password'
        )
        if(showDetails){
            res.status(201).json({
                success:true,
                message:'Fecting Successfully',
                result:showDetails
            })
        }
    
    }
    catch(err){
        console.log('Error in fetching data',err);
        res.status(401).json({
            success:false,
            message:'Fecting Error',err,
        })
    }
}

const deleteData=async(req,res)=>{
    try{
        
        let deleted=await registerModel.findOneAndDelete({_id:req.params.id});
        if(deleted){
            return res.status(201).json({
                success:true,
                message:'Deletion Succesfully'
            })
        }
    }
    catch(err){
        console.log('Error in deletion of data',err);
        return res.status(401).json({
            success:false,
            message:'Error in deletion of data',err
        })
    }
}

const editData=async(req,res)=>{
    try{
        let oldData=await registerModel.findOne({_id:req.params.id});
        console.log('Old Data',oldData);
        let editData=await registerModel.findOneAndUpdate({_id:req.params.id},{
            customer_name:req.body.customer_name,
            customer_email:req.body.customer_email,
            password:await bcrypt.hash(req.body.password,12)
        })
    if(editData){
        console.log('Edited Succesfully');
        res.status(201).json({
            success:true,
            message:'New Data after editing',
            newData:editData
        })
    }
    }
    catch(err){
        console.log('Error in editing Data',err);
        res.status(201).json({
            success:false,
            message:'old Data',err
        })

    }
    
}

module.exports={
    postRegister,
    showDetails,
    deleteData,
    editData
}