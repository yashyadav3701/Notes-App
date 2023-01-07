const express=require('express')
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const router=express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="yashyadav";

// create a user using POST /api/ath/createuser   ... NO login required
router.post('/createuser',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','enter a valid password').isLength({ min: 5 }),
],async(req,res)=>{
    let success=false;
    try{
        // if there are errors send bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({success,error:"sorry a user already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user=await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      })

      const data={
        user:{
            id:user.id
        }
      }
      const authtoken =jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken});
    //   res.send(user);
    }
    catch(error){
        console.error(error.message);
        success=true;
        res.status(500).send("some error happened");
    }
})
    // create a POST req to authenticate a user /api/auth/login  ... no login required
    router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password',"password can't be NULL").exists()
    ],async(req,res)=>{
        let success=false;
        const {email,password}=req.body;
        try{
            const user= await User.findOne({email});
            if(!user){
                return res.status(400).json({success,error:"Login with correct credentials"})
            }

            const passwordcompare=await bcrypt.compare(password,user.password);
            if(!passwordcompare){
                return res.status(400).json({success,error:"Login with correct credentials"})
            }

            const data={
                user:{
                    id:user.id
                }
              }
              const authtoken =jwt.sign(data,JWT_SECRET);
              success=true;
              res.json({success,authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal error happened");
    }
})

// create a POST req to get authanticate user details /api/auth/getuser  ... login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        userid=req.user.id;
        const user=await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error happened");
    }
})

module.exports=router;