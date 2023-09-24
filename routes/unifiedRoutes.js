const router = require('express').Router();
const controller = require('../controllers/unifiedController');
require('express-async-errors');

// ? username
// ? name
// ? html link
// ? avatar
// ? or just basic
router.route('/user').get(controller.basicInfo);
router.route('/repos').get(controller.reposCount);
router.route('/commits').get(controller.commitsCount);
router.route('/languages').get(controller.languages);
router.route('/achievements').get(controller.achievements);

module.exports = router;
