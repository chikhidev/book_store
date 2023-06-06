//User model
const User = require("../models/userModel");
const fs = require("fs")
const path = require("path")
const Message = require("../models/MessageModel")
const Inbox = require("../models/InboxModel")

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


//upload profile:
const uploadProfile = async (req, res) => {
  if (!req.imagePath) {
    return res.status(400).json({
      success: false,
      data: { message: 'Aucun fichier téléchargé' },
    });
  }

  try {
    const user = await User.findById(req.user.id).select('avatar');
    if (!user) {
      fs.unlinkSync(req.imagePath);
      return res.json({
        success: false,
        data: {
          message: "vous n'êtes pas connecté",
        },
      });
    }

    if (user.avatar && user.avatar !== "/images/users/default.jpg") {
      const previousAvatarPath = path.join(__dirname, '..', user.avatar);
      if (fs.existsSync(previousAvatarPath)) {
        fs.unlinkSync(previousAvatarPath);
      }
    }

    user.avatar = `/images/users/${req.filename}`;

    try {
      await user.save();
      return res.json({
        success: true,
        data: {
          message: 'Votre avatar a été changé avec succès',
          avatar: user.avatar
        },
      });
    } catch (error) {
      fs.unlinkSync(req.imagePath);
      return res.json({
        success: false,
        data: {
          message: "Il y a eu un problème lors du changement d'avatar",
        },
      });
    }
  } catch (error) {
    fs.unlinkSync(req.imagePath);
    return res.json({
      success: false,
      data: {
        message: 'Erreur',
      },
    });
  }
};


const updateUser = async (req, res) => {
  const id = req.user.id;
  const { username, email, bio } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: { message: `Utilisateur avec l'identifiant ${id} introuvable` },
      });
    }

    // Check if the provided email is already taken by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          data: { message: 'Cet e-mail est déjà utilisé par un autre utilisateur' },
        });
      }
    }

    if (username === user.username && email === user.email && bio === user.bio) {
      return res.status(400).json({
        success: false,
        data: { message: 'Aucune modification apportée aux informations de l\'utilisateur' },
      });
    }

    user.username = username;
    user.email = email;
    user.bio = bio;

    await user.save();

    res.status(200).json({
      success: true,
      data: { message: 'Les informations de l\'utilisateur ont été mises à jour avec succès' },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: { message: 'Erreur lors de la mise à jour des informations de l\'utilisateur' },
    });
  }
};

const deleteUser = async (req, res) => {

  try{
    const user = User.findByIdAndRemove(req.user.id)
    if (!user)
      return res.json({ status:false, data:{ message: "Utilisateur non trouvé"}})

  }catch{
    return res.json({ status:false, data:{ message: "Erreur interne"}})

  }
}


const requestToBeAdmin = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: { message: `Utilisateur avec l'identifiant ${userId} introuvable` },
      });
    }

    if (user.isAdmin) {
      return res.json({
        success: false,
        data: { message: 'Cet utilisateur est déjà administrateur' },
      });
    }

    const adminUsers = await User.find({ isAdmin: true });

    if (adminUsers.length === 0) {
      return res.json({
        success: false,
        data: { message: 'Il n\'y a pas d\'administrateur disponible' },
      });
    }

    const messageContent = 'Demande de devenir administrateur';
    const order = null; // Set the order here if needed

    const message = new Message({
      sender: user._id,
      content: messageContent,
      order: order,
    });

    await message.save();

    for (const adminUser of adminUsers) {
      const inbox = await Inbox.findOne({ owner: adminUser._id });

      if (!inbox) {
        const newInbox = new Inbox({ owner: adminUser._id, messages: [] });
        await newInbox.save();
        inbox = newInbox;
      }

      inbox.messages.push(message._id);
      await inbox.save();
    }

    return res.status(200).json({
      success: true,
      data: { message: 'Demande envoyée avec succès' },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: { message: 'Erreur lors de l\'envoi de la demande' },
    });
  }
};



module.exports = {
    findById, findFullById, 
    findByEmail, searchUsers, makeAdmin,
    getUserByToken,
    uploadProfile,
    updateUser, deleteUser,
    requestToBeAdmin
}