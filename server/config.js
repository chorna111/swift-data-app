const dotenv=require('dotenv')

dotenv.config()
const config={
    app_name:process.env['APP_NAME'],
    port:process.env['PORT']??8080,
    db_uri:process.env['DB_URI']??'mongodb://localhost:27017/swift-data'


}
module.exports=config