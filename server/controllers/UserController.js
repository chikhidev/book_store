//User model
const User = require("../models/userModel");
const {mongoose} = require("../server.imports")



//function for creating a new user:
const createUser = async (req, res)=>{
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
                data: {message:"User with this email already exists"}
            });
        }

        try{
            await newUser.save()
            res.send({
                sucess: true,
                data: {message:"Created successfully"}
            })
        }
        catch{
            res.send({
                sucess: false,
                data: {message:"Cannot create this user"}
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
          data: userFound
        })
    }
    catch (err) {
      res.send({
        sucess : false,
        data: err
      });
    }
}

const findByEmail = async (req, res) => {
  req.body = {email:"chikhi.dev@gmail.com"}

  try{
    const { email } = req.body;
    try {

      const userFound = await User.findOne({ email: email }).select(
        "username email avatar bio createdAt"
      );

      if (!userFound) return res.send({
        success: false,
        data: `User with this email not found`
      })
  
      res.send({
        success: true,
        data: userFound,
      });
    } catch (err) {
      res.send({
        success: false,
        data: `there was an Error!`
      });
    }

  }
  catch{
    return res.send({
      success: false,
      data: {message:"Please enter an email"}
    })
  }


};

  
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
          data: userFound
        })
    }
    catch (err) {
      res.send({
        sucess : false,
        data: err
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
          data: userFound
        })
    }
    catch (err) {
      res.send({
        sucess : false,
        data: err
      });
    }
}

const dropUser = async (req, res) => {
  const { id, email, password } = req.body;

  try {
    let deletedUser;

    if (id) {
      deletedUser = await User.findByIdAndDelete(id);
    } else if (email) {
      const userFound = await User.findOne({ email: email }).select(
        "username email avatar bio createdAt password"
      );

      if (!userFound) {
        return res.send(`User with email ${email} not found`);
      }

      const isPasswordMatch = await userFound.comparePassword(password);

      if (!isPasswordMatch) {
        return res.send("Password is incorrect");
      }

      deletedUser = await User.findByIdAndDelete(userFound._id);
    } else {
      return res.send("Please provide either an ID or an email");
    }

    if (!deletedUser) {
      return res.send({
        success: false,
        data: { message: "User not found" },
      });
    }

    res.send({
      success: true,
      data: { message: "User deleted successfully" },
    });
  } catch (err) {
    res.send({
      success: false,
      data: { message: "Failed to delete user" },
    });
  }
};



module.exports = {
    createUser, findById, findStoreById, findFullById, dropUser, findByEmail
}