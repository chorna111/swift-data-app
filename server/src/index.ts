
import { getData } from "./loadData"
const {Headquarter,validate}=require('./models/headquarter')
const {Branch}=require('./models/branch')
const express=require('express')
const config=require('../config.js')
const app=express()
const mongoose=require('mongoose')
const port=process.env.PORT||8080
mongoose.connect(config.db_uri)
    .then(()=>console.log('Connected to Mongodb'))



app.use(express.json())
app.listen(port,()=>console.log('server started'))
mongoose.connection.on('connected', async function () {
    try {
        const headquarterCount = await Headquarter.countDocuments();
        const branchCount = await Branch.countDocuments();

        if (headquarterCount === 0 && branchCount === 0) {
            console.log('Loading data');

            await getData();
            console.log('Data is loaded');
        } else {
            console.log('Data is loaded');
        }
    } catch (error) {
        console.error(error);
    }
});



//getData()
app.get('/load-data',async (req:any,res:any)=>{
    try{
        await getData()
        res.json({status:'success'})
    }catch(error){
        res.status(500).json({ status: "error", message: "Błąd ładowania danych" });
    }
})
app.get('/v1/swift-codes/:swiftcode',async(req:any,res:any)=>{
    try{
    const headquarter=await Headquarter.findOne({swiftCode:req.params.swiftcode})
        .select('-_id')
        .populate('branches','address bankName countryISO2 isHeadquarter swiftCode -_id')
    if(headquarter){
        return res.status(200).send(headquarter)
    }else{
        const branch=await Branch.findOne({swiftCode:req.params.swiftcode})
        if(branch) return res.status(200).send(branch)

    }
    }catch(err){
        res.status(500).send('getting data failed,ensure swift code is correct')
    }

    

    
})

app.get('/v1/swift-codes/country/:countryISO2code',async(req:any,res:any)=>{
    
    try{
   
    const headquarters=await Headquarter.find({countryISO2:req.params.countryISO2code})
    const branches = await Branch.find({ countryISO2: req.params.countryISO2code });
    const countryName=headquarters[0].countryName

    const codes=[
    
        ...headquarters.map((h:typeof Headquarter)=>({
            address: h.address,
            bankName: h.bankName,
            countryISO2:h.countryISO2,
            isHeadquarter:h.isHeadquarter,
            swiftCode:h.swiftCode
    })),
        ...branches.map((b:typeof Branch)=>({
            address:b.address,
            bankName:b.bankName,
            countryISO2:b.countryISO2,
            isHeadquarter:b.isHeadquarter,
            swiftCode:b.swiftCode
        }))]
        
    const result={
        countryISO2:req.params.countryISO2code,
        countryName:countryName,
        swiftCodes:codes
    }
    return res.status(200).send(result)

}catch(err){
    res.status(500).send('getting data failed,ensure isowcode is correct')
}
}
)

app.post('/v1/swift-codes',async(req:any,res:any)=>{
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const code=await Headquarter.findOne({swiftCode:req.body.swiftCode})
    if(code) {
        return res.send('this code already exists')
    }else{
        try{

        
        if(req.body.isHeadquarter==true){
            let n=new Headquarter({
            address: req.body.address,
            bankName: req.body.bankName,
            countryISO2: req.body.countryISO2,
            countryName: req.body.countryName,
            isHeadquarter:req.body.isHeadquarter,
            swiftCode: req.body.swiftCode,
            

            })
            n=await n.save()
            res.send("Headquarter successfully added")
        }else{
            let b=new Branch({
                address: req.body.address,
                bankName: req.body.bankName,
                countryISO2: req.body.countryISO2,
                countryName: req.body.countryName,
                isHeadquarter:req.body.isHeadquarter,
                swiftCode: req.body.swiftCode,
                
    
                })
                b=await b.save()
                res.send("Branch successfully added")


        }
        
    }catch(err){
        console.log(err)

    }
}


})

app.delete('/v1/swift-codes/:swiftcode',async(req:any,res:any)=>{
    if(!(req.params.swiftcode.length===11&&typeof req.params.swiftcode==='string')){
        res.send('code you provided is incorrect')
    }
    try{
        const deletedHeadquarter=await Headquarter.findOneAndDelete({swiftCode:req.params.swiftcode})
        if(deletedHeadquarter){
            res.send('Headquarter deleted successfully')
        }else{
            const deletedBranch=await Branch.findOneAndDelete({swiftCode:req.params.swiftcode})
            if(deletedBranch){
                res.send('Branch deleted successfully')
            }else{
                res.send('oops, something went wrong, probably swift code was already deleted')
            }
        }
        

    }catch(err){
        console.log(err)
    }


})




