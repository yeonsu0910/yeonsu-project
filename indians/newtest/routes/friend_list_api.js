const express = require('express');
const router = express.Router();
const controller = require('./friend_list_controller');

router.post('/search',controller.search);
router.post('/addFriend', controller.create);
router.post('/showFriend', controller.show);
router.post('/editName', controller.edit);
router.post('/dropFriend',controller.destroy);

module.exports = router;
