//importation des packages requis
const express = require("express");
const fileUpload = require("express-fileupload"); //middleware
const router = express.Router();
const authenticated = require("../middlewares/authenticated");
const cloudinary = require("cloudinary").v2;

//importation des modèles requis
const Offer = require("../models/Offer");
const User = require("../models/User");

// Déclaration de la fonction qui permet de transformer mes images en base 64
const convertToBase64 = require("../utils/converToBase64");

//Create
//Création d'une annonce avec autenthification requise
router.post("/offer/publish", authenticated, fileUpload(), async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.condition ||
      !req.body.city ||
      !req.body.brand ||
      !req.body.size ||
      !req.body.color
    ) {
      throw { message: "Veuillez remplire tous les champs", error: 400 };
    }
    if (!req.files) {
      throw { message: "Veuillez ajouter une photo du produit", error: 400 };
    }

    const user = await User.findById(req.id);
    // console.log(user);
    const newOffer = new Offer({
      product_name: req.body.title,
      product_description: req.body.description,
      product_price: req.body.price,
      product_details: [
        { MARQUE: req.body.brand },
        { TAILLE: req.body.size },
        { ETAT: req.body.condition },
        { COULEUR: req.body.color },
        { EMPLACEMENT: req.body.city },
      ],
      product_image: {},
      owner: user._id,
    });

    //Conversion de mon image en base64
    const convertedPicture = convertToBase64(req.files.picture);
    // Envoie de mon image sur Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      convertedPicture,
      { folder: `/vinted/offers/${newOffer._id}` }
    );

    newOffer.product_image = cloudinaryResponse;
    await newOffer.save();
    return res
      .status(201)
      .json(
        await newOffer.populate({ path: "owner", select: ["account", "_id"] })
      );
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});
//Read
//Affichage des différentes annonce avec possibilité de trie
router.get("/offers", async (req, res) => {
  try {
    const { title, priceMine, priceMax, sort, page } = req.query;
    console.log(req.query);
    console.log(title);
    const filter = { found: {} };
    if (title) {
      filter.found.product_name = new RegExp(title, "i");
    }
    if (priceMine && priceMax) {
      filter.found.product_price = {
        $gte: Number(priceMine),
        $lte: Number(priceMax),
      };
    } else if (!priceMine && priceMax) {
      filter.found.product_price = { $lte: Number(priceMax) };
    } else if (priceMine && !priceMax) {
      filter.found.product_price = { $gte: Number(priceMine) };
    }
    if (sort) {
      filter.sort = { product_price: sort.slice(6) };
    }
    const offer = await Offer.find(filter.found)
      .sort(filter.sort)
      .skip((page - 1) * 5)
      .limit(5)
      .select("product_name product_price");

    const offersLength = await Offer.countDocuments(filters);
    console.log(offersLength);

    return res.status(200).json({ count: offersLength, offers: offer });
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});

//récupérer les détails concernant une annonce, en fonction de son id route doit être placée après toutes les autres routes /offer
router.get("/offer/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (offer) {
      return res.status(200).json(offer);
    }
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});

//Update

//Delete

//export des routes
module.exports = router;
