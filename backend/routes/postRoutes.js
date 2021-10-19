const auth        = require('../middleware/auth');
const postCtrl    = require('../controllers/postCtrl');
const router      = require('express').Router();

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
router.post('/post', auth, multer, postCtrl.createPostCtrl);
router.post('/:id/like', postCtrl.likePostCtrl)
router.get('/post', auth, postCtrl.getAllPostsCtrl);
router.delete('/:id', auth, postCtrl.deletePostCtrl);

module.exports = router;