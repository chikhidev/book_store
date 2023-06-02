const fs = require('fs');
const Offer = require('../models/OfferModel')
const Store = require('../models/StoreModel')

const createOffer = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
          success: false,
          data: { message: 'Aucun fichier téléchargé' }
        });
      }

    try{
        const store = await Store({owner: req.user.id})
        if(!store){
            fs.unlinkSync(req.file.path);
            return res.json({success: false, data:{
                message: "vous n'avez pas de magasin au début, créez-en un, puis réessayez"
            }})
        }

        const new_offer = new Offer({
            banner: `images/offers/${req.file.name}`,
            store: store._id
        })
        try{
            await new_offer.save()
            return res.json({success: true, data:{
                message: "votre offre a été créée avec succès"
            }})
        }catch{
            fs.unlinkSync(req.file.path);
            return res.json({success: false, data:{
                message: "il y a eu un problème lors de la création de votre offre"
            }})
        }

    }catch{
        res.json({success:false, data:{
            message: "Erreur"
        }})
    }
}

module.exports = {
    createOffer
}