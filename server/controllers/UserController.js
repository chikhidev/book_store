//User model
const User = require("../models/userModel");


// function for getting a user by email
const findById = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;
    try {
        const userFound = await User.findById(id).select('username email avatar bio createdAt');
      if (!userFound) {
        return res.status(404).json({
          success:false,
          data:{message:`Utilisateur avec l'identifiant ${id} introuvable`}
        });
      }
        res.status(200).json({
          success : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
        success : false,
        message: "Erreur",
        data: err
      });
    }
}

// find user by passing token
const getUserByToken = async (req, res) => {
    //hard coded email to test with
    const id = req.user.id;
    try {
        const userFound = await User.findById(id).select('username email avatar bio createdAt isAdmin');
      if (!userFound) {
        return res.status(404).json({
          success:false,
          data:{message:`Utilisateur avec l'identifiant ${id} introuvable`}
        });
      }
        res.status(200).json({
          success : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
        success : false,
        data: err
      });
    }
}

const makeAdmin = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;

    try {
        const userFound = await User.findById(id).select('username email isAdmin');
      if (!userFound) {
        return res.status(404).json({
          success:false,
          data:{message:`Utilisateur avec l'identifiant ${id} introuvable`}
        });
      }

      if(userFound.isAdmin){
        return res.json({
          success: false,
          data:{
            message: 'Cet utilisateur est déjà administrateur'
          }
        })
      }

       try{

          try{

            await User.updateOne({ _id: id }, { isAdmin: true })

          }catch(err){

            return res.json({
              success : false,
              data: {
                message: 'Il y avait une erreur',
                err
              }
            })
            
          }

          return res.status(200).json({
            success : true,
            data: {
              message: "L'utilisateur est un administrateur maintenant"
            }
          })

       }
        catch(err){
          return res.json({
            success : false,
            data: err
          });
       }
        
    }
    catch (err) {
      return res.json({
        success : false,
        data: err
      });
    }
}

const findByEmail = async (req, res) => {

  try{
    const { email } = req.body;
    try {

      const userFound = await User.findOne({ email: email }).select(
        "nom d'utilisateur e-mail avatar bio créé à"
      );

      if (!userFound) return res.json({
        success: false,
        data: `Utilisateur avec cet e-mail introuvable`
      })
  
      res.json({
        success: true,
        data: userFound,
      });
    } catch (err) {
      res.json({
        success: false,
        data: `Il y avait une erreur!`
      });
    }

  }
  catch{
    return res.json({
      success: false,
      data: {message:"Il y avait une erreur!"}
    })
  }


};

  


const findFullById = async (req, res) => {
    //hard coded email to test with
    const id = req.params.id;
    try {
        const userFound = await User.findById(id).select('-password');
      if (!userFound) {
        return res.json(`Utilisateur avec e-mail ${id} introuvable`);
      }
        res.json({
          success : true,
          data: userFound
        })
    }
    catch (err) {
      res.json({
        success : false,
        data: err
      });
    }
}


const searchUsers = async (req, res) => {
  const query = req.query.query;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ]
    }).select('username email avatar bio createdAt');
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message
    });
  }
};




module.exports = {
    findById, findStoreById, findFullById, 
    findByEmail, findCardByID, test, searchUsers, makeAdmin,
    getUserByToken
}