const UserModel = require('../model/UserModel');

const UserService = {
    getByEmail : (email) => {
        return UserModel.findOne({email},{__v : 0, createdAt : 0, updatedAt : 0  });
    },
    addUser : (data) => {
        const newUser = new UserModel (data);
        return newUser.save();
    },
    update : (data) => {
        return UserModel.findOneAndUpdate({email : data.email}, {$set : {password : data.password }}, {new : true})
    }
   
}

module.exports = UserService;

