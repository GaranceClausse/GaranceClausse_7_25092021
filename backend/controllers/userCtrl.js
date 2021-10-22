const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Maskdata = require('maskdata');



exports.signupCtrl = (req, res, next) => {

  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,300}$/;
  if (re.test(req.body.password) == true) {

    bcrypt.hash(req.body.password, 10) // cryptage du mdp
      .then(hash => {
        const user = User.build({
          nom: req.body.nom,
          email: req.body.email,
          password: hash
        });
        user.save() // sauvegarde les informations utilisateur
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error : "ouuups" }));
      })
      .catch(error => res.status(500).json({ error }));
  }
  else {
    res.status(400).json({ error : "caca" });
  }
};

// controlleur de connexion des utilisateurs
exports.loginCtrl = (req, res, next) => {
  
  User.findOne({ where: { email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // verifie si le mdp est valide
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe erroné !' });
          }
          res.status(200).json({
            userId: user.id,
            nom: user.nom,
            email: user.email,
            isAdmin: user.isAdmin,
            /****fonction sign encode un nouveau token */
            token: jwt.sign(
              { userId: user.id },
              process.env.RND_TKN, // creation token de connexion
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// controlleur get one user
exports.getOneUserCtrl = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; //recuperation du token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // decodage du token grace a la clé 
    const id = decodedToken.userId;
  User.findOne(id)
    .then(user => {
      res.status(200).json({
        userId: user.id,
        nom: user.nom,
        isAdmin: user.isAdmin,
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// controlleur modify one user
exports.modifyUserCtrl = (req, res, next) => {
  const userObj = req.file?
  {
    ...JSON.parse(req.body.user),

} : { ...req.body };
User.update({
  ...userObj
}, {
  where: {
      id: req.params.id
  }
}) // applique les modification dans la bdd avec le nouvel objet modifié
.then(() => res.status(200).json({ message: 'user modifié !'}))
.catch(error => res.status(400).json({ error }));
};


// controlleur pour suppression profil
exports.deleteUserCtrl = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      bcrypt.compare(req.body.password, user.password) // verifie si le mdp est valide
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          user.destroy()
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};