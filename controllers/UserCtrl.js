const UserService = require("../services/UserSvc");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mailService = require('../services/mailSvc');

const UserContoller = {
    // registering a user
    register : async(req, res) => {
       try{
        const userInfo = await UserService.getByEmail(req.body.email);
        if(userInfo){
            res.status(409);
            res.send({
                error : 'email already exists',
                description : "try with another mail"
            })
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 5);
            req.body.password = hashPassword;
            const newuser = await UserService.addUser(req.body);
            res.status(200);
            res.send({
                status : 'user added sucessfully',
                data : newuser
            })
        }
       }catch (error){
        console.log(error);
         res.status(400);
         res.send({
            error : "server error",
            discription : error
         });
       }
    },
   // login a user

   logIn : async(req, res) => {
    try{
       const user = await UserService.getByEmail(req.body.email);
        if(user) {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if(isPasswordMatch){
                const token = jwt.sign({email : user.email, userId : user._id}, "secretKey", {expiresIn : "1hr"});
                res.status(201);
                res.send({
                    status : 'user login sucessfully',
                    data : {
                        userId : user._id,
                        email : user.email
                    },
                    token
                })
            }else {
                res.status(409);
                res.send({error: 'Conflict', errorDescription: 'Incorrect Password'});
            }
        }else {
            res.status(409);
            res.send({error: 'Conflict', errorDescription: 'user not found'});
        }
        }catch (error){
            console.log(error);
            res.status(400);
            res.send({
                error : "server error",
                discription : error
            });
        }
   },

   // send mail
   sendMail : async (req, res) => {
    try{
            const userInfo = await UserService.getByEmail(req.body.email);
            if (userInfo) {
                const emailInfo = await mailService.sendEmail(userInfo);
                res.status(200);
                res.send({ data: emailInfo });
            } else {
                res.status(409);
                res.send({ error: 'Conflict', errorDescription: "User doesn't exist with this email address" });
            }
        } catch (error) {
            res.status(500);
            res.send({ error });
        }
   },

   // update password

   update : async (req, res) => {
    try {
        // const userinfo = await UserService.getByEmail(req.body.email);
        const hashPassword = await bcrypt.hash(req.body.password, 5);
        req.body.password = hashPassword;
        const upadateUserInfo = await UserService.update({...req.body});
        res.status(200);
        res.send({
            status : "updated",
            data : upadateUserInfo
        })
    }catch(err){
        res.status(500);
        res.send({err});
    }
   }

}

module.exports = UserContoller;