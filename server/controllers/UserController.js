//User model
const User = require("../models/userModel");
const {mongoose} = require("../server.imports")



//function for creating a new user:
const create = async (req, res)=>{
        req.body = {
            username: 'Abderrahim_Chikhi',
            email: 'chikhi.dev@gmail.com',
            password: "test123",
            age: 20
          };

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName : req.body.firstName,
            lastName : req.body.lastName
        })

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send({
                sucess: false,
                message: "User with this email already exists"
            });
        }

        try{
            await newUser.save()
            res.send({
                sucess: true,
                message: "Created successfully"
            })
        }
        catch{
            res.send({
                sucess: false,
                message: "Cannot create this user"
            })
        }
}

// function for getting a user by email
const findById = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;
    try {
        const userFound = await User.findById(id).select('username email avatar bio createdAt');
      if (!userFound) {
        return res.send(`User with email ${id} not found`);
      }
        res.send({
          sucess : true,
          message: userFound
        })
    }
    catch (err) {
      res.send({
        sucess : false,
        message: err
      });
    }
}
  
const findFullById = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;
    try {
        const userFound = await User.findById(id).select('-password');
      if (!userFound) {
        return res.send(`User with email ${id} not found`);
      }
        res.send({
          sucess : true,
          message: userFound
        })
    }
    catch (err) {
      res.send({
        sucess : false,
        message: err
      });
    }
}
  
const findStoreById = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;
    try {
        const userFound = await User.findById(id).select('username avatar store');
      if (!userFound) {
        return res.send(`User with email ${id} not found`);
      }
        res.send({
          sucess : true,
          message: userFound
        })
    }
    catch (err) {
      res.send({
        sucess : false,
        message: err
      });
    }
}


module.exports = {
    create, findById, findStoreById, findFullById
}