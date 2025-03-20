import mongoose from 'mongoose';
import Joi from 'joi'
import { Branch } from './branch';
const headquarterSchema=new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    bankName:{
        type:String,
        required:true
    },
    countryISO2:{
        type:String,
        required:true,
        length:2
        

    },
    countryName:{
        type:String,
        required:true,
    
    },
    isHeadquarter:{
        type:Boolean,
        required:true
    },

    swiftCode:{
        type:String,
        required:true,
        length:11,
        
    },
   
    
    branches:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    }]
})
const Headquarter=mongoose.model('Headquarter',headquarterSchema)

function validate(headquarter:any){
    const schema=Joi.object({
        address:Joi.string().required(),
        bankName:Joi.string().required(),
        
        countryISO2:Joi.string().required(),
        
        countryName:Joi.string().required(),
        
        isHeadquarter:Joi.bool().required(),
        swiftCode:Joi.string().length(11).required()
        

    })
    return schema.validate(headquarter)
}
module.exports.validate = validate;
module.exports.headquarterSchema = headquarterSchema
module.exports.Headquarter = Headquarter
