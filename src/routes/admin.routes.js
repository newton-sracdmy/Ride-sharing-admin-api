const Router = require('koa-router');
const { adminLogin } = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { getAllRides, getRideById, getRidesSummary } = require('../controllers/rides.controller');
const { getAllUsers, getUserById } = require('../controllers/users.controller');
const { getPaymentList, getPaymentFilterByDate } = require('../controllers/payment.controller');

const router = new Router();
router.post('/api/admin/login', adminLogin);
router.get("/api/admin/rides/:id", authMiddleware,getRideById );
router.get("/api/admin/rides", authMiddleware, getAllRides);
router.get("/api/admin/users/:id", authMiddleware, getUserById);
router.get("/api/admin/users",authMiddleware, getAllUsers );
router.get("/api/admin/RidesSummary",authMiddleware, getRidesSummary);
router.get("/api/admin/payments", getPaymentList );
router.get("/api/admin/paymentsFilter", getPaymentFilterByDate);


module.exports = router;
