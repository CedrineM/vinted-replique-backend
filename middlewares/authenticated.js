//importation des modèles requis
const User = require("../models/User");

//fonction qui permet l'authentification
const authenticated = async (req, res, next) => {
  //   console.log(req.headers.authorization); // si existant affiche le token avec Bearer devant
  try {
    if (!req.headers.authorization) {
      throw {
        message: "you are not authorized, your need to connect",
        error: 401,
      };
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    // console.log(token);
    const userFind = await User.findOne({ token: token });
    // console.log(userFind);
    if (!userFind) {
      throw {
        message: "you are not authorized, your need to connect",
        error: 401,
      };
    }
    req.id = userFind._id;
    next(); //permet de passer au middleware suivant
  } catch (error) {
    console.error;
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server Error" });
  }
};

// exportation du middleware
module.exports = authenticated;
