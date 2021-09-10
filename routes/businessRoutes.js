const router =  require('express').Router();
const controllers = require('../controllers')


router.get('/seed-bling', controllers.business.seedBling)


module.exports = router