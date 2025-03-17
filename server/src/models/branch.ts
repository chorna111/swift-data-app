import mongoose from 'mongoose';


const branchSchema=new mongoose.Schema({
    address:{
        type:String
       
    },
    bankName:{
        type:String
  
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
    }
})
export const Branch=mongoose.model('Branch',branchSchema)

module.exports.branchSchema=branchSchema

