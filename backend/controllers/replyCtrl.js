const Reply = require('../models/replyModel');

//controlleur pour la creation d'un nouveau commentaire
exports.createReplyCtrl = (req, res, next) => {
  const reply = Reply.build({ // creation du nouvel objet sauce grace au model pré-établie
    commentaire: req.body.commentaire,  // recuperation du commentaire
    nom: req.body.nom,
    UserId: req.body.UserId,
    PostId: req.body.PostId
  });
  reply.save() // sauvegarde dans la bdd
    .then(() => res.status(201).json({ message: 'commentaire créé !'}))
    .catch(error => res.status(400).json({ error }));
};

// controlleur qui renvoi tous les commentaires de la bdd du plus recent au plus ancien
exports.getRepliesCtrl = (req, res, next) => {
    Reply.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            PostId: req.params.id
        }
    })
      .then(replies => res.status(200).json(replies))
      .catch(error => res.status(500).json({ error }));
};

// controlleur qui supprime un commentaire de la bdd
exports.deleteReplyCtrl = (req, res, next) => {
    Reply.findByPk(req.params.id) //trouve le commentaire en question dans la bdd par son id
    .then(reply => {
        reply.destroy() // supprime le commentaire trouvé
          .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};