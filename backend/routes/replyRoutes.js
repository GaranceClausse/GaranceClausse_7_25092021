const auth        = require('../middleware/auth');
const replyCtrl   = require('../controllers/replyCtrl');
const router      = require('express').Router();

router.post('/', auth, replyCtrl.createReplyCtrl);
router.get('/:id', auth, replyCtrl.getAllRepliesCtrl);
router.delete('/:id', auth, replyCtrl.deleteOneReplyCtrl);

module.exports = router;