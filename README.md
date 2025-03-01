# 🔗 Replique-Vinted (BackEnd)

## 📌 Description

Projet réaliser au cours de ma formation au Reacteur.
Le but de ce projet est la prise en main du backend. Creation d'un serveur, d'une base de donnée (user et offres associées), mise en place d'une authentification et de la mise en ligne.

## 🛠️ Technologies utilisées

- [Langage] JavaScript
- [Framework] Express.js
- [Base de données] MongoDB
- [Outils] CORS, Cloudinary (utilisé pour héberger et gérer les images des utilisateurs et des offres), Postman (pour tester les API)

## 🏗 Architecture

### 🖼️ Modèles

_Utilisateur_

```js
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
```

_Offre_

```js
const Offer = mongoose.model("Offer", {
  product_name: {
    type: String,
    maxLength: [50, "Doit faire moins de 50 caractères"],
  },
  product_description: {
    type: String,
    maxLength: [500, "Doit faire moins de 500 caractères"],
  },
  product_price: {
    type: Number,
    max: [100000, "Le prix ne peut être supérieur à 100 000"],
  },
  product_details: Array,
  product_image: Object,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
```

### 🔧 API Endpoints

Ajoute une documentation API plus détaillée si nécessaire.

| Méthode | URL              | Description                                       | Paramètres                                                                                                                         |
| ------- | ---------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `offer/publish`  | Récupère les différente offre (système de filtre) | `{ "title" : STRING , "priceMin" : NUMBER , "priceMax" : NUMBER , "sort": price-asc or price-desc , "page": NUMBER}` (params/JSON) |
| `POST`  | `/user/signup`   | Crée un nouvel utilisateur                        | `{ "username": STRING, "email" : STRING, "password" : STRING, "newsletter" : boolean, "avatar": FILE}` (form-data/JSON)            |
| `POST`  | `/user/login`    | Connection                                        | `{ "email": "johndoe@lereacteur.io", "password": "azerty"}` (JSON)                                                                 |
| `POST`  | `/offer/publish` | Crée/Publie une offre                             | `Authorizarion : Bearer Token` + `{ "brans": STRING, "size" : STRING, "color" : STRING, "picture" : FILE}` (form-data/JSON)        |

---

#### 🛠 **Explication des colonnes** :

- **Méthode** : Type de requête HTTP (`GET`, `POST`, `PUT`, `DELETE`).
- **URL** : L'endpoint exact que ton API expose.
- **Description** : Ce que fait cet endpoint.
- **Paramètres** :
  - 🏷 **Route parameters** : Présents dans l'URL (`:id` par exemple).
  - 📩 **Body parameters** : Envoyés en JSON dans une requête `POST` ou `PUT`.

---

## 🔑 Configuration

Ajouter un fichier .env et renseigner les variables d’environnement :

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

MONGODB_URI=

PORT=3000
```

## 🚧 Améliorations possibles

Liste des améliorations envisagées

- amélioration de la routes POST `/offer/publish` pour permettre l'import de plusieurs photo
- routes DELETE pour surpprimer une offre
- routes PUT pour moddifer une offre
- route PUT pour moddifer user

## ✍️ Auteur

[@CedrineM](https://github.com/CedrineM)

## 📜 Licence

Ce projet est un exercice personnel réalisé dans le cadre de mon apprentissage.  
Il est uniquement destiné à des **fins éducatives** et ne doit pas être utilisé publiquement ou commercialement.
