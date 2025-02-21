//importation des package requis
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // lire le .env

//connection à la base de donnée
mongoose.connect(process.env.MONGODB_URI);

//connection au serveur cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//création du serveur
const app = express();
app.use(express.json());

//autorisation des demandes provenant de l'extérieur
app.use(cors());

//importation des différents chemins
const routerUser = require("./routes/user");
app.use(routerUser);
const routerOffer = require("./routes/offer");
app.use(routerOffer);

//chemin d'acceuil
app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Bienvenue sur Vinted" });
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
});

//Tous les chemins non existant
app.all("*", (req, res) => {
  return res.status(404).json({ message: "This page not exist" });
});

//mise en ligne du serveur (ecoute)
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
