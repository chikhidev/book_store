//User model
const User = require("../models/userModel");

const test = (req, res)=>{
  return res.json(
    req.body
  )
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



searchUsers = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: 'Server Error',
    });
  }
};




module.exports = {
    findById, findStoreById, findFullById, 
    findByEmail, findCardByID, test, searchUsers
}