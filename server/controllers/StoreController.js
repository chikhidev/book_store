const Store = require('../models/StoreModel')
const Book = require('../models/bookModel').bookModel

const createStore = async (req, res) => {
    try {
        const store_found = await Store.findOne({ owner: req.user.id });
        if (!store_found) {
            try {
                const books_of_user = await Book.find({ createdBy: req.user.id });
                const new_store = new Store({
                    owner: req.user.id,
                    books: books_of_user
                });

                await new_store.save();
                return res.json({
                    success: true,
                    data: {
                        message: "Votre boutique a été créée avec succès",
                        new_store
                    }
                });
            } catch (error) {
                return res.json({
                    success: false,
                    data: {
                        message: "Une erreur s'est produite lors de la création de votre boutique"
                    }
                });
            }
        } else {
            return res.json({
                success: false,
                data: {
                    message: "Vous avez déjà votre boutique"
                }
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            data: {
                message: "Erreur"
            }
        });
    }
};

const destroyStore = async (req, res) => {
    try {
        const store_found = await Store.findOne({ owner: req.user.id });
        if (!store_found) {
            return res.json({ success: false, data: { message: "Il n'y a pas de magasin à supprimer" } });
        } else {
            try {
                await store_found.delete();
                return res.json({ success: true, data: { message: "Votre boutique a été supprimée" } });
            } catch (error) {
                return res.json({ success: false, data: { message: "Une erreur s'est produite lors de la suppression de votre boutique" } });
            }
        }
    } catch (error) {
        return res.json({ success: false, data: { message: "Erreur" } });
    }
};

const showStore = async (req, res) => {
    try {
        const store = await Store.find({owner: req.user.id});
        if(store){
            return res.json({ success: true, data: store})
        }else{
            return res.json({ success: false, data: {
                message: "Vous n'avez pas encore de boutique, veuillez en créer une"
            }})
        }
    }catch{
        return res.json({ success: false, data: {message: "Erreur"}})
    }
}

const getStore = async (req, res) => {
    const id = req.params.id;

    try {
        const store = await Store.findById(id)

        if (store) {
            return res.json({ success: true, data: store });
        } else {
            return res.json({
                success: false,
                data: {
                    message: "Cet utilisateur n'a pas de magasin pour le moment"
                }
            });
        }
    } catch (error) {
        return res.json({ success: false, data: { message: "Erreur" } });
    }
};


module.exports = {
    createStore, destroyStore, showStore, getStore
}