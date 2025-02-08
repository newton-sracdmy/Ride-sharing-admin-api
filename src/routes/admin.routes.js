const Router = require('koa-router');
const { adminLogin } = require('../controllers/admin.controller');

const router = new Router();
router.post('/api/admin/login', adminLogin);

module.exports = router;
