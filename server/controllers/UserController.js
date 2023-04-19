//User model
const User = require("../models/userModel");
const MiddleWare = require("../middlewares/MiddleWare")
const argon2 = require("argon2");

const test = (req, res)=>{
  return res.json(
    req.body
  )
}


//function for creating a new user:
const createUser = async (req, res)=>{
    // req.body = {
    //   username:"abderrahim", email:"chikhi.dev@gmail.com", password: "test123"
    // }

    
    try{
        const query = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
        //validate
          const {error} = MiddleWare.validate.validateUserNameEmailPass(query)
          if (error) return res.json({
            success:false,
            data:error
          })
          //hash the password before puthing it in the db
          query.password = await argon2.hash(req.body.password);

          const newUser = new User(query)

          const existingUser = await User.findOne({ email: req.body.email });
          if (existingUser) {
              return res.status(400).json({
                  sucess: false,
                  data: {message:"User with this email already exists"}
              });
          }

          try{
              await newUser.save()
              res.status(200).json({
                  sucess: true,
                  data: {message:"Created successfully"}
              })
          }
          catch{
              res.status(406).json({
                  sucess: false,
                  data: {message:"Cannot create this user"}
              })
          }

        }catch{
          res.status(502).json({
            sucess:false,
            data:{message: "Failed!"
          }
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
        return res.status(404).json({
          sucess:false,
          data:{message:`User with id ${id} not found`}
        });
      }
        res.status(200).json({
          sucess : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
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

      if (!userFound) return res.json({
        success: false,
        data: `User with this email not found`
      })
  
      res.json({
        success: true,
        data: userFound,
      });
    } catch (err) {
      res.json({
        success: false,
        data: `there was an Error!`
      });
    }

  }
  catch{
    return res.json({
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
        return res.json(`User with email ${id} not found`);
      }
        res.json({
          sucess : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
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
        return res.json(`User with email ${id} not found`);
      }
        res.json({
          sucess : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
        sucess : false,
        data: err
      });
    }
}




const findCardByID = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;
    try {
        const userFound = await User.findById(id).select('username avatar shoppingCard');
      if (!userFound) {
        return res.json(`User with email ${id} not found`);
      }
        res.json({
          sucess : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
        sucess : false,
        data: err
      });
    }
}





const dropUser = async (req, res) => {
    // req.body = {email: "chikhi.dev@gmail.com", password:"test123"}
    try {

      const query = {
        email: req.body.email,
        password: req.body.password
      }
      const {error} = MiddleWare.validate.validateEmailPass(query)
      if (error) return res.json({
        success:false,
        data:error
      })
  
      try {
          const userFound = await User.findOne({ email: query.email }).select(
            "username email password"
          );
  
          if (!userFound) {
            return res.status(404).json({
              success:false,
              data:{message:`User with email ${email} not found`}
            });
          }
  
          const isPasswordMatch = await argon2.verify(userFound.password, query.password);
    
          if (!isPasswordMatch) {
            return res.status(401).json({
              success:false,
              data:{message:"Password is incorrect"}
            });
          }
    
          const deletedUser = await User.findByIdAndDelete(userFound._id);
    
          if (!deletedUser) {
            return res.status(404).json({
              success: false,
              data: { message: "User not found" },
            });
          }
    
          res.status(200).json({
            success: true,
            data: { message: "User deleted successfully" },
          });

      } catch (err) {
        res.status(406).json({
          success: false,
          data: { message: "Failed to delete user" },
        });
      }
    } catch (err) {
      res.status(400).json({
        sucess:false,
        message: "Something went wrong"
      })
    }
  };
  



module.exports = {
    createUser, findById, findStoreById, findFullById, dropUser, 
    findByEmail, findCardByID, test
}