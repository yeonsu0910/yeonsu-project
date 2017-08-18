const express = require('express');
const router = express.Router();
const controller = require('./group_controller');

router.post('/makeGroup', controller.create);


router.post('/showGroup',controller.showgroup);

router.post('/showGroup/members', controller.look);

router.post('/edit',controller.update);


router.post('/deleteFriends',controller.destroyFriends);


router.post('/deleteGroups',controller.destroy);




module.exports = router;
