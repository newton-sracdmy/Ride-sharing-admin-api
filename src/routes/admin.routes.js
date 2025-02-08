const Router = require('koa-router');
const { adminLogin } = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { getAllRides, getRideById } = require('../controllers/rides.controller');
const { getAllUsers } = require('../controllers/users.controller');

const router = new Router();
router.post('/api/admin/login', adminLogin);
router.get("/api/admin/rides", authMiddleware, getAllRides);
router.get("/api/admin/rides/:id", authMiddleware,getRideById );
router.get("/api/admin/users",authMiddleware, getAllUsers );

module.exports = router;
