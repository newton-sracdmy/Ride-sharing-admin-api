const Router = require('koa-router');
const { adminLogin } = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { getAllRides, getRideById, getRidesSummary } = require('../controllers/rides.controller');
const { getAllUsers, getUserById, changeDriverStatus } = require('../controllers/users.controller');
const { getPaymentList, getPaymentFilterByDate, getPaymentById, getPaymentByUser } = require('../controllers/payment.controller');
const { getAllLocations } = require('../controllers/rideLocation.controller');

const router = new Router();
router.post('/api/admin/login', adminLogin);
router.get("/api/admin/rides/:id", authMiddleware,getRideById );
router.get("/api/admin/rides", authMiddleware, getAllRides);
router.get("/api/admin/users/:id", authMiddleware, getUserById);
router.put("/api/admin/users/:id",authMiddleware, changeDriverStatus);
router.get("/api/admin/users/:userId/payment", getPaymentByUser );
router.get("/api/admin/users",authMiddleware, getAllUsers );
router.get("/api/admin/RidesSummary",authMiddleware, getRidesSummary);
router.get("/api/admin/payments/:id", authMiddleware,getPaymentById);
router.get("/api/admin/payments",authMiddleware, getPaymentList );
router.get("/api/admin/paymentsFilter", authMiddleware, getPaymentFilterByDate);
router.get("/api/admin/locations",authMiddleware, getAllLocations);


module.exports = router;
