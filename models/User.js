//importation des packages requis
const mongoose = require("mongoose");

//création du modèle
const User = mongoose.model("User", {
  email: String,
  account: {
    username: String,
    avatar: Object, // nous verrons plus tard comment uploader une image
  },
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
});

// exportation du modèle
module.exports = User;
