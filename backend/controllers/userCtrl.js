const User    = require("../models/userModel.js");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
const validator = require("validator");



exports.signupCtrl = async (req, res, next) => {
  try {
    const validEmail = await validator.isEmail(req.body.email);
    if (!validEmail) {
      throw({ status: 401, msg:"Adresse mail non valide."})
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.signup(req.body.name, hash, req.body.email, 0);
    res.status(201).json({ message: "Utilisateur créé !" })
  } catch(err) {
    res.status(err.status).json({ error: err.msg })
  }
}

exports.signupAdminCtrl = async (req, res, next) => {
  try {
    const validEmail = await validator.isEmail(req.body.email);
    if (!validEmail) {
      throw({ status: 401, msg:"Adresse mail non valide."})
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.signup(req.body.name, hash, req.body.email, 1);
    res.status(201).json({ message: "Administrateur créé !" })
  } catch(err) {
    res.status(err.status).json({ error: err.msg })
  }
}

exports.loginCtrl = async (req, res, next) => {
  try {
      if (req.body.name == null || req.body.password == null) {
        throw({status:401, msg:"Utilisateur ou mot de passe non renseigné."})
      }
      const user = await User.login(req.body.name, req.body.password);
      if (! await bcrypt.compare(req.body.password, user.password)){
          throw({status:401, msg:"Mot de passe erroné !"});
      }
      res.status(200).json({
        name: user.name,
        id_user: user.id,
        role: user.role,
        token: jwt.sign(
          {id_user: user.id},
          {role: user.role},
          `${process.env.RND_TKN}`, 
          {expiresIn: "24h"}
         )
      });
  }
  catch(err){
      res.status(err.status).json({ error: err.msg });
  }
};

exports.deleteUserCtrl = (req, res, next) => {
  User.deleteUser(req.body.id)
    .then(() =>
      res.status(201).json({ message: "Votre compte a été supprimé." })
    )
    .catch(() => res.status(404).json({ error: "Compte utilisateur non trouvé" }));
};