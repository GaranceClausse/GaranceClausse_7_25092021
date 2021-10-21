const auth        = require('../middleware/auth');
const router      = require('express').Router();
const userCtrl    = require('../controllers/userCtrl');
const rateLimit = require('express-rate-limit');
const multer = require('../middleware/multer'); //gestion des fichiers images

// rateLimit pour les connexions
const connexionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // bloque apres 5 requetes
    skipSuccessfulRequests: true,
  });


router.post('/signup', userCtrl.signupCtrl);
router.post('/login', connexionLimiter, userCtrl.loginCtrl);
router.get('/:id', auth, userCtrl.getOneUserCtrl);
router.put('/:id', auth, multer, userCtrl.modifyUserCtrl);
router.delete('/:id', auth, userCtrl.deleteUserCtrl);

module.exports = router;