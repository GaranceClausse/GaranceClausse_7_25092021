const auth        = require('../middleware/auth');
const router      = require('express').Router();
const rateLimit = require('express-rate-limit');
const userCtrl    = require('../controllers/userCtrl');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // bloque apres 5 requetes
    skipSuccessfulRequests: true,
  });

router.post('/signup', userCtrl.signupCtrl);
router.post('/login', limiter, userCtrl.loginCtrl);
router.get('/infos', auth, userCtrl.getOneUserCtrl);
router.delete('/', auth, userCtrl.deleteUserCtrl);

module.exports = router;