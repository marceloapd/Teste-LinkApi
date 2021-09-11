const router =  require('express').Router();
const controllers = require('../controllers')


router.get('/seed-bling', controllers.business.seedBling)

router.get('/get-bling', controllers.business.getBling)


module.exports = router