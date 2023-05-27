const MiddleWare = require("../middlewares/MiddleWare")
const User = require("../models/userModel");
const argon2 = require("argon2");


const login = async (req, res) => {

    try {
        // Set email and password from the request body
        const { email, password } = req.body;


        // Search for user by email
        const user = await User.findOne({ email }).select("email password isAdmin username");

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                data: {
                    message: "This user does not exist!"
                }
            });
        }

        // Verify user's password
        const isPasswordMatch = await argon2.verify(user.password, password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                data: {
                    message: "Incorrect password"
                }
            });
        }

        // Generate a JSON Web Token (JWT) for the authenticated user
        const token = MiddleWare.auth.generateToken({
          id: user._id, isAdmin : user.isAdmin, username: user.username, email: user.email
        })


        // res.cookie("token", token, {
        //   httpOnly: true
        //   // You can add more options like `expires` or `secure` if needed
        // });

        // Return success response with JWT and message
        return res.status(200).json({
            success: true,
            data: {
                message: "Logged in successfully",
                token
            }
        });
        
    } catch (error) {
        // Handle any errors that may occur during the execution of the function
        return res.status(500).json({
            success: false,
            data: {
                message: "Something went wrong, please try again later"
            }
        });
    }
}

//change user pqssword
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { email } = req.user;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        data: {
          message: "This user does not exist!",
        },
      });
    }

    const isPasswordMatch = await argon2.verify(user.password, oldPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        data: {
          message: "Incorrect password",
        },
      });
    }

    user.password = await argon2.hash(newPassword);
    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        message: "Password changed successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {
        message: "Something went wrong, please try again later",
      },
    });
  }
}

const drop = async (req, res) => {
    // req.body = {email: "chikhi.dev@gmail.com", password:"test123"}
    try {
      const {email, password} = req.body

      try {
          const userFound = await User.findOne({ email: email }).select(
            "username email password"
          );
  
          if (!userFound) {
            return res.status(404).json({
              success:false,
              data:{message:`User with email ${email} not found`}
            });
          }
  
          const isPasswordMatch = await argon2.verify(userFound.password, password);
    
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
        success:false,
        message: "Something went wrong"
      })
    }
}
  
//function for creating a new user:
const register = async (req, res)=>{
    
    try{
      const {username, email, password} = req.body
        

          //hash the password before puthing it in the db
          const hashedPassword = await argon2.hash(password);

          const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword
          })

          const existingUser = await User.findOne({ email: email });
          if (existingUser) {
              return res.status(400).json({
                  success: false,
                  data: {message:"User with this email already exists"}
              });
          }

          try{
              await newUser.save()
              res.status(200).json({
                  success: true,
                  data: {message:"Created successfully"}
              })
          }
          catch{
              res.status(406).json({
                  success: false,
                  data: {message:"Cannot create this user"}
              })
          }

        }catch{
          res.status(502).json({
            success:false,
            data:{message: "Failed to create this user!"
          }
          })
        }
        
}

//
const logout = async (req, res) => {
  const userId = req.userId;

  try {
    // Remove the user's token from the database
    await User.findByIdAndUpdate(userId, { token: null });
    res.status(200).json({
      success: true,
      data:{message: "Logout successful"},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data:{message: "Logout failed"},
    });
  }
}

module.exports = {
    login, register, drop, logout, updatePassword
}