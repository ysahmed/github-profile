const router = require('express').Router();
const controller = require('../controllers/unifiedController');

router.route('/repos').get(controller.reposCount);
router.route('/commits').get(controller.commitsCount);
router.route('/languages').get(controller.languages);
router.route('/achievements').get(controller.achievements);

module.exports = router;
