const express = require('express');
const router = express.Router();
const controller = require('./comment_controller');
var crypto = require('crypto');

router.post('/posts', controller.create);
router.post('/list',controller.show);
router.post('/edit',controller.update);
router.post('/delete',controller.destroy);


router.post('/reply/posts',controller.replycreate);
router.post('/reply/list',controller.look);
router.post('/reply/edit',controller.editreply);
router.post('/reply/delete',controller.deleteReply);

module.exports = router;
