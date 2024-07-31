const express=require('express');
const router=express.Router();
const verifyToken=require('../middleware/verifyUser')



const {BookSlot,viewBook, getTimeSlots}=require("../controllers/bookingController")

router.post('/insertBook',verifyToken,BookSlot);
router.get('/getBook/:user_id',viewBook);
router.post('/getTimeSlot',getTimeSlots)


module.exports=router;