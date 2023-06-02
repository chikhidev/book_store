const MiddleWare = require("../middlewares/MiddleWare")
const User = require("../models/userModel");
const argon2 = require("argon2");


const login = async (req, res) => {

  try {
    // Définir l'e-mail et le mot de passe à partir du corps de la requête
    const { email, password } = req.body;


    // Rechercher l'utilisateur par e-mail
    const user = await User.findOne({ email }).select("email password isAdmin username");

    // Vérifier si l'utilisateur existe
    if (!user) {
        return res.status(401).json({
            success: false,
            data: {
                message: "Cet utilisateur n'existe pas !"
            }
        });
    }

    // Vérifier le mot de passe de l'utilisateur
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            success: false,
            data: {
                message: "Mot de passe incorrect"
            }
        });
    }

    // Générer un jeton JSON Web (JWT) pour l'utilisateur authentifié
    const token = MiddleWare.auth.generateToken({
      id: user._id, isAdmin : user.isAdmin, username: user.username, email: user.email
    })

    // Renvoyer une réponse de succès avec le JWT et le message
    return res.status(200).json({
        success: true,
        data: {
            message: "Connexion réussie",
            token
        }
    });
    
} catch (error) {
    // Gérer les erreurs qui peuvent survenir pendant l'exécution de la fonction
    return res.status(500).json({
        success: false,
        data: {
            message: "Quelque chose s'est mal passé, veuillez réessayer ultérieurement"
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
          message: "Cet utilisateur n'existe pas !",
        },
      });
    }

    const isPasswordMatch = await argon2.verify(user.password, oldPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        data: {
          message: "Mot de passe incorrect",
        },
      });
    }

    user.password = await argon2.hash(newPassword);
    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        message: "Mot de passe modifié avec succès",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {
        message: "Quelque chose s'est mal passé, veuillez réessayer ultérieurement",
      },
    });
  }
}

const drop = async (req, res) => {
  try {
    const {email, password} = req.body
  try {
    const userFound = await User.findOne({ email: email }).select(
      "username email password"
    );

    if (!userFound) {
      return res.status(404).json({
        success:false,
        data:{message:`Utilisateur avec l'adresse email ${email} introuvable`}
      });
    }

    const isPasswordMatch = await argon2.verify(userFound.password, password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success:false,
        data:{message:"Mot de passe incorrect"}
      });
    }

    const deletedUser = await User.findByIdAndDelete(userFound._id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        data: { message: "Utilisateur introuvable" },
      });
    }

    res.status(200).json({
      success: true,
      data: { message: "Utilisateur supprimé avec succès" },
    });

} catch (err) {
  res.status(406).json({
    success: false,
    data: { message: "Échec de la suppression de l'utilisateur" },
  });
}
} catch (err) {
res.status(400).json({
  success:false,
  message: "Quelque chose s'est mal passé"
})
}

}
  
//function for creating a new user:
const register = async (req, res)=>{
    
  try{
    const {username, email, password} = req.body
      
  
        //hash the password before putting it in the db
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
                data: {message:"Un utilisateur avec cette adresse email existe déjà"}
            });
        }
  
        try{
            await newUser.save()
            res.status(200).json({
                success: true,
                data: {message:"Création réussie"}
            })
        }
        catch{
            res.status(406).json({
                success: false,
                data: {message:"Impossible de créer cet utilisateur"}
            })
        }
  
      }catch{
        res.status(502).json({
          success:false,
          data:{message: "Échec de la création de cet utilisateur !"}
        })
      }
      
  
        
}


module.exports = {
    login, register, drop, updatePassword
}