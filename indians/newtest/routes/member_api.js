const express = require('express');
const router = express.Router();
const controller = require('./member_controller');

var models = require('./models/models');

router.post('/login',controller.login);

router.post('/signup', controller.create);
router.post('/signup/checkId',controller.checkId);
router.post('/signup/checkName',controller.checkName);


router.post('/edit',controller.update);
router.post('/drop', controller.destroy);



module.exports = router;
