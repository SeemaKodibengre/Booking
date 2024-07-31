const user = require('../model/user');
const userSchema = require('../model/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_TOKEN;

const Register = async (req, res) => {
    try {
        const { username, email, address, password } = req.body;
        const findEmail = await userSchema.findOne({ email });
        if (findEmail) {
            console.log("This email is already exist");
            return res.status(400).json({ error: "email already exits" });
        } else {

        

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const data = await new userSchema({ username: username, email: email, address: address, password: hashPass });
            const saveData = await data.save();
            res.send({ "insertion successfull": true, "inserted data": saveData })
            console.log(saveData)
        }
    }
    catch (err) {
        console.log("insertion unsuccessfull", err);
        res.status(500).json({ error: 'insertion unsuccessfull' })
    }
}

const Login=async(req,res)=>{
 

    try{
      const {email,password}=req.body;
      const findLogin=await user.findOne({email});
      if(!findLogin){
        return res.status(404).json({error:"email not found"});
      }

      const passMatch=await bcrypt.compare(password,findLogin.password);

      if(!passMatch){
        return res.status(404).json({err:"password not found"});
      }

      const idData= findLogin.id;

      const token=await jwt.sign({id:idData},secretKey);
     
      const success=true;
      res.status(200).json({success,token,findLogin});

    }catch(err){
        console.log("insertion unsuccessfull", err);
        res.status(500).json({ error: 'insertion unsuccessfull' })
    }
}






const View = async (req, res) => {

    try {
        const data = await userSchema.find();
        if (!data) {
            console.log("data is not exits");
            return res.staus(404).json({ err: 'data is not exits' });
        } else {
            console.log(data);
            res.json(data)
        }


    } catch (err) {
        console.log("some internal error", err);
        res.status(500).json({ err: "some internal error" })
    }
}

const ViewOne = async (req, res) => {
    const {user_id}=req.body;

    try {
        const data = await userSchema.findById(req.params.id);
        if (!data) {
            console.log("data is not exits with this id");
            return res.staus(404).json({ err: 'data is not exits with this id' });
        } else {
            console.log(data);
            res.json(data)
        }


    } catch (err) {
        console.log("some internal error", err);
        res.status(500).json({ err: "some internal error" })
    }
}


const Update = async (req, res) => {
    try {
        const { username, email, address, password } = req.body;
        let newData = {};
        if (username) newData.username = username;
        if (email) newData.email = email;
        if (address) newData.address = address;
        if (password) newData.password = password;

        let data = await userSchema.findById(req.params.id);
        if (!data) {
            console.log('data is not exits with this id');
            res.status(404).json({ err: "data is not exits with this id" });
        } else {
            data = await userSchema.findByIdAndUpdate(req.params.id, { $set: newData });
            console.log("updation is successfull");
            res.send(newData);
        }
    }
    catch (err) {
        console.log("some internal error", err);
        res.status(500).json({ err: "some internal error" })
    }
}

const Delete = async (req, res) => {
    try {
        let data = await userSchema.findById(req.params.id);
        if (!data) {
            console.log("data is not exits with this Id");
            res.status(400).json({ err: "data is not exits with this Id" });
        } else {
            data = await userSchema.findByIdAndDelete(req.params.id);
            console.log("deleted data:", data);
            res.send(data)
        }
    }
    catch (err) {
        console.log("some internal error", err);
        return res.status(500).json({ err: "internal server error" });

    }
}
module.exports = { Register,Login, View, ViewOne, Update, Delete };