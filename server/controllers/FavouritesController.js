const Favourite = require('../models/FavouriteModel');
const Book = require("../models/bookModel")

const getFavourites = async (req, res) =>{
    try{
        const favourites = await Favourite.find({user: req.user.id}).populate('book')
        if (!favourites)
            return res.json({
                success: false, data: {
                    message: 'No favourites attached to you'
                }
            })

        return res.json({
            success: true, data: favourites
        })

        
    }catch(err){
        return res.json({
            success: false, data: {
                message: 'Error', err
            }
        })
    }
}
const isBookFav = async (req, res) => {
  try {
    const { id } = req.params;
      const fav = await Favourite.findOne({ user: req.user.id, book: id });
      if (fav) 
      {
        return res.status(200).json({ success: true, data : { isFav: true }});
      } 
      else {
        return res.status(200).json({ success: true, data : { isFav: false }});
      }
  }
  catch (err) {
    return res.status(500).json({ success: false, data: { message: 'Error', error: err } });
  }
};

const toggleFavourite = async (req, res) => {
    try {
      const { id } = req.params;
      const favourite = await Favourite.findOneAndDelete({ book: id });
  
      if (!favourite) {
        // Book was not favourited, create a new favourite
        try {
          const favourited = await Favourite.create({ book: id, user: req.user.id });
          return res.status(200).json({ success: true, fav: true, data: favourited });
        } catch (err) {
          return res.status(500).json({ success: false, data: { message: 'Error while adding this book to favourites', error: err } });
        }
      } else {
        // Book was favourited, delete the existing favourite
        return res.status(200).json({ success: true, fav: false, data: favourite });
      }
    }
    catch (err) {
      return res.status(500).json({ success: false, data: { message: 'Error', error: err } });
    }
};

module.exports = {
    toggleFavourite, getFavourites, isBookFav
}