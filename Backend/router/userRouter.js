const express=require('express');
const router=express.Router();


const {Register,View, ViewOne,Update, Delete, Login}=require('../controllers/userController');


router.post('/register',Register);
router.post('/login',Login)
router.get('/view',View);
router.get('/viewOne/:id',ViewOne);
router.put('/update/:id',Update);
router.delete('/delete/:id',Delete);

module.exports=router;