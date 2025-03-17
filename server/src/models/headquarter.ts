import mongoose from 'mongoose';

import { Branch } from './branch';
const headquarterSchema=new mongoose.Schema({
    address:{
        type:String
       
    },
    bankName:{
        type:String,
        
    },
    countryISO2:{
        type:String

    },
    countryName:{
        type:String

    },
    isHeadquarter:{
        type:Boolean
    }
    ,
    swiftCode:{
        type:String
    },
    branches:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    }]
})
const Headquarter=mongoose.model('Headquarter',headquarterSchema)
module.exports.headquarterSchema = headquarterSchema
module.exports.headquarter = Headquarter
