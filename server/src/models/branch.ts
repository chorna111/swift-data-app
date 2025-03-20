import mongoose from 'mongoose';
import Joi from 'joi'

const branchSchema=new mongoose.Schema({
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

})
function validate(branch:any){
    const schema=Joi.object({
        address:Joi.string().required(),
        bankName:Joi.string().required(),
        
        countryISO2:Joi.string().required(),
        
        countryName:Joi.string().required(),
        
        isHeadqurter:Joi.bool().required(),
        swiftCode:Joi.string().length(11).required()
        

    })
    return schema.validate(branch)
}

export const Branch=mongoose.model('Branch',branchSchema)

module.exports.branchSchema=branchSchema

