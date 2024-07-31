require("dotenv").config();
const express=require('express');
const connectToMongo =require('./db');
const router=require('./router/userRouter');
const bookRouter=require('./router/bookingRoute');


const cors=require('cors');

connectToMongo();

const app=express();
app.use(express.json());
app.use(cors());

app.use('/app',router);
app.use('/bookSlot',bookRouter);

port=7000;
app.listen(port,()=>{
    console.log(`app running on port ${port} `)
})
