const Offer = require('../models/OfferModel')
const Store = require('../models/StoreModel')

const createOffer = async (req, res) => {
    try{
        const store = await Store({owner: req.user.id})
        if(!store)
            return res.json({success: false, data:{
                message: "vous n'avez pas de magasin au début, créez-en un, puis réessayez"
            }})

        

    }catch{
        res.json({success:false, data:{
            message: "Erreur"
        }})
    }
}