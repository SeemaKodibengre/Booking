const mongoose=require('mongoose');
const mongoUrl="mongodb://127.0.0.1:27017/Slot";

const connectToMongo=async()=>{
try{
    await mongoose.connect(mongoUrl);
    console.log("mongoDB connection sucessfull")

}catch(err){
    console.log("mongoDB connection unsucessfull",err)
}
}
module.exports=connectToMongo;