const express = require('express');
const router = express.Router();
const controller = require('./chat_controller');
var crypto = require('crypto');

router.post('/makeRooms',controller.create);



router.get('/delete/:room',controller.delete);


router.post('/invite', controller.push);
router.post('/invite/groups',controller.group);
module.exports=router;
