const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = mongoose.connect(process.env.MONGODB_URI);
        console.log(`DataBase connected successfully`);
    }
    catch(error){
        console.log(`Error occured while connectiong DataBase  ${error.message}`);
            process.exit(1);
    }
}
module.exports=connectDB;