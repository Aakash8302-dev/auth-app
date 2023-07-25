import express from "express"
import { passwordEmailReset, resetPassword, verifyToken } from "../controllers/appController";
import { Authentication, dynamicProtect } from "../middlewares/authMiddleware";
const router = express.Router();

router.route('/reset').post(passwordEmailReset)
router.route('/resetpass').post(dynamicProtect,resetPassword)
router.route('/verify').get(dynamicProtect,verifyToken)

export default router