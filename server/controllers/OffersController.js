const fs = require('fs');
const Offer = require('../models/OfferModel')
const Store = require('../models/StoreModel')

const createOffer = async (req, res) => {
    if (!req.imagePath) {
      return res.status(400).json({
        success: false,
        data: { message: 'Aucun fichier téléchargé' },
      });
    }

    const {discount} = req.body
  
    try {
      const store = await Store.findOne({ owner: req.user.id });
  
      if (!store) {
        fs.unlinkSync(req.imagePath);
        return res.json({
          success: false,
          data: {
            message:
              "Vous n'avez pas de magasin. Créez-en un, puis réessayez.",
          },
        });
      }
  
      const new_offer = new Offer({
        banner: `images/offers/${req.filename}`,
        discount,
        store: store._id,
      });
  
      try {
        await new_offer.save();
        return res.json({
          success: true,
          data: {
            message: 'Votre offre a été créée avec succès.',
          },
        });
      } catch (error) {
        fs.unlinkSync(req.imagePath);
        return res.json({
          success: false,
          data: {
            message:
              "Il y a eu un problème lors de la création de votre offre.",
          },
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        data: {
          message: 'Erreur',
        },
      });
    }
  };
  
const getCurrentuserOffers = async (req, res) => {
    try{
        const store = await Store.findOne({owner: req.user.id})
        const offers = await Offer.find({store: store._id})
        return res.json({ success: true, data:offers })
    }catch{
        return res.json({ success: false, data:{
            message: "ne trouve aucune offre qui vous est associée"
        }})
    }
}

const getTopOffers = async (req, res) => {
    let limit = req.params.limit || 10
    try{
        const offers = await Offer.find().sort({discount: -1}).limit(limit).populate("store")
        return res.json({ success: true, data:offers })
    }catch{
        return res.json({ success: false, data:{
            message: "ne trouve aucune offre qui vous est associée"
        }})
    }
}

const deleteOffer = async (req, res) => {
    try {
      const offerId = req.params.offerId;
  
      // Find the offer by its ID and remove it
      const deletedOffer = await Offer.findByIdAndRemove(offerId);
  
      if (!deletedOffer) {
        return res.status(404).json({
          success: false,
          data: {
            message: 'Offre non trouvée',
          },
        });
      }
  
      // Delete the associated banner image file
      fs.unlinkSync(deletedOffer.banner);

  
      return res.json({
        success: true,
        data: {
          message: 'Offre supprimée avec succès',
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {
          message: 'Erreur lors de la suppression de l\'offre',
        },
      });
    }
  };
  

module.exports = {
    createOffer, getCurrentuserOffers, getTopOffers, deleteOffer
}