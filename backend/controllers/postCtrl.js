const Post = require('../models/postModel');
const fs = require('fs');

//controlleur pour la creation d'une nouvelle publication
exports.createPostCtrl = (req, res, next) => {
  const postObj = {
    titre: req.body.titre,
    UserId: req.body.UserId
  }
  const post = Post.build({ // creation du nouvel objet sauce grace au model pré-établie
    ...postObj,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //creation URL image
  });
  post.save() // sauvegarde dans la bdd
    .then(() => res.status(201).json({ message: 'publication créée !'}))
    .catch(error => res.status(400).json({ error }));
};
/*
//controlleur pour modifier une publication existante
exports.modifyArticle = (req, res, next) => {
  let postObj // creation d'une variable pour l'objet modifié
  if (req.file) { // si il ya une modification de l'image
    Article.findByPk(req.params.id)
      .then(article => {
        const filename = article.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => { //suppression de l'ancienne image de la bdd
          if (err) throw err;
        });
      })
      .then( postObj = { // nouvel objet modifié avec la nouvelle image
        ...JSON.parse(req.body.article),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      })
      .catch(error => res.status(500).json({ error }));
  } else { //si aucun changement image juste changer avec le corps de la requete directement en json
    postObj = { ...req.body};
  }
  console.log(postObj);
  Article.update({
      ...postObj
  }, {
      where: {
          id: req.params.id
      }
  }) // applique les modification dans la bdd avec le nouvel objet modifié
    .then(() => res.status(200).json({ message: 'article modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
//controlleur qui renvoi une publication en fonction de son id
exports.getOneArticle = (req, res, next) => {
    Article.findByPk(req.params.id)
      .then(article => res.status(200).json(article))
      .catch(error => res.status(500).json({ error }));
};
*/
// controlleur qui renvoi toutes les publications de la bdd de la plus recente a la plus ancienne
exports.getAllPostsCtrl = (req, res, next) => {
    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    })
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(500).json({ error }));
};

exports.getOnePostCtrl = (req, res, next) => {
    Post.findByPk(req.params.id)
      .then(post => res.status(200).json(post))
      .catch(error => res.status(500).json({ error }));
};

// controlleur qui supprime un article de la bdd
exports.deletePostCtrl = (req, res, next) => {
    Post.findByPk(req.params.id) //trouve la pubblication en question dans la bdd par son id
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { // supprime l'image de la bdd
        post.destroy() // supprime l'article trouvé
          .then(() => res.status(200).json({ message: 'publication supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//controlleur pour la gestion des like/dislike des sauces
exports.likePostCtrl = (req, res, next) => {
  const like = req.body.like;
  const user = req.body.userId.toString();
  const postId = req.params.id;
  
  Post.findByPk(postId)
  .then((post) => {
    let newDislikes = 0;
    let newLikes = 0;

    if (like == 1) { // si like
      newLikes = post.likes + 1;
      post.update({
        likes: newLikes,
        userLiked: post.userLiked.concat(' ', user)
      })
      .then(() => res.status(200).json({ message: "ajouté un like"}))
      .catch(error => res.status(500).json({ error: error }));
    }
    else if (like == -1) { // si dislike
      newDislikes = post.dislikes + 1;
      post.update({
        dislikes: newDislikes,
        userDisliked: post.userDisliked.concat(' ', user)
      })
      .then(() => res.status(200).json({ message: "ajouté un dislike"}))
      .catch(error => res.status(500).json({ error: error }));
    } else {
      // sinon like == 0
      if (post.userLiked.includes(user)) { // on verifie si le userId est present dans le tableau des liked
        console.log(user)
        newLikes = post.likes - 1;
        post.update({
          likes: newLikes,
          userLiked: post.userLiked.replace(user, '')
        })
        .then(() => res.status(200).json({ message: "enlevé un like"}))
        .catch(error => res.status(400).json({ error: error }));
      } else { // sinon  le user doit etre dans les disliked
        newDislikes = post.dislikes - 1;
        post.update({
          dislikes: newDislikes,
          userDisliked: post.userDisliked.replace(user, '')
        })
        .then(() => res.status(200).json({ message: "enlevé un dislike"}))
        .catch(error => res.status(400).json({ error: error }));
      }
    }
  })
  .catch(error => res.status(500).json({ error: error }));
}