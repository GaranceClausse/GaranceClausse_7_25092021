const Post = require('../models/postModel');
const fs = require('fs');
const { post } = require('jquery');

//controlleur pour la creation d'une nouvelle publication
exports.createPostCtrl = (req, res, next) => {
  const postObj = {
    title: req.body.title,
    content: req.body.content,
    UserId: req.body.UserId
  }
  const post = Post.build({ // creation du nouvel objet post grace au model pré-établie
    ...postObj,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //creation URL image
  });
  post.save() // sauvegarde dans la bdd
    .then(() => res.status(201).json({ message: 'publication créée !' }))
    .catch(error => res.status(400).json({ error }));
};

//controlleur pour modifier une publication existante
exports.modifyPostCtrl = (req, res, next) => {
  const postObj = req.file ? // creation d'une variable pour l'objet modifié
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    } : { ...req.body };
  Post.update({
    ...postObj
  }, {
    where: {
      id: req.params.id
    }
  }) // applique les modification dans la bdd avec le nouvel objet modifié
    .then(() => res.status(200).json({ message: 'post modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

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


// controlleur qui supprime un article de la bdd
exports.deletePostCtrl = (req, res, next) => {
  Post.findByPk(req.params.id) //trouve la pubblication en question dans la bdd par son id
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { // supprime l'image de la bdd
        post.destroy() // supprime l'article trouvé
          .then(() => res.status(200).json({ message: 'publication supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//controlleur pour la gestion des like/dislike des sauces
exports.likePostCtrl = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId.toString();
  const postId = req.params.id;

  Post.findByPk(postId)

    .then((post) => {
      let newLikes = 0;
      let newDislikes = 0;

      if (like == 1) {
        newLikes = post.likes + 1;
        post.update({

          userLiked: post.userLiked.concat(' ', userId),
          likes: newLikes,
        }
        )
          .then(() => res.status(200).json('post likée'))
          .catch(error => res.status(400).json({ error: error }));

      } else if (like == -1) {

        newDislikes = post.dislikes + 1;
        post.update({
          dislikes: newDislikes,
          userDisliked: post.userDisliked.concat(' ', userId)
        })
          .then(() => res.status(200).json('post dislikée'))
          .catch(error => res.status(400).json({ error: error }));

      } else {
        if (post.userLiked.includes(userId)) {
          console.log(post.userLiked)
          newLikes = post.likes - 1;
          post.update({
            likes: newLikes,
            userLiked: post.userLiked.replace(userId, '')
          })
            .then(() => { res.status(200).json({ message: 'Vous ne likez plus ce post !' }) })
            .catch(error => res.status(400).json({ error }))
        } else if (post.userDisliked.includes(userId)) {
          newLikes = post.dislikes - 1;
          post.update({
            dislikes: newDislikes,
            userDisliked: post.userDisliked.replace(userId, '')
          })
            .then(() => { res.status(200).json({ message: 'Vous ne dislikez plus ce post !' }) })
            .catch(error => res.status(400).json({ error }))
        }
      }
    })

    .catch(error => res.status(500).json({ error: 'la fonction ne marche pas' }))
}