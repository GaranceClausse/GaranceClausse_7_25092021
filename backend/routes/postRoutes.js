const auth        = require('../middleware/auth');
const postCtrl    = require('../controllers/postCtrl');
const router      = require('express').Router();
const multer = require('../middleware/multer'); //gestion des fichiers images

/**
 * [createPostCtrl description]
 *
 * @openapi
 * /api/posts/:
 * get:
 * description:
 * responses:
 * 200:
 * description:
 */
router.get('/', auth, postCtrl.getAllPostsCtrl);
router.post('/', auth, multer, postCtrl.createPostCtrl);
router.put('/:id', auth, multer, postCtrl.modifyPostCtrl);
router.post('/post', auth, multer, postCtrl.createPostCtrl);
router.delete('/:id', auth, postCtrl.deletePostCtrl);
router.post('/:id/like', postCtrl.likePostCtrl);

module.exports = router;