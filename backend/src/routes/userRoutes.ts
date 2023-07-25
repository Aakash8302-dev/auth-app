import express from 'express'
import { createUser, getAllUsers, deleteUser, getUserById, loginUser} from "../controllers/userController";
import { Authentication, dynamicProtect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
.get(dynamicProtect, getAllUsers)
.post(createUser);

router.route('/:id')
.delete(dynamicProtect,deleteUser)
.get(dynamicProtect,getUserById);

router.route('/login').post(loginUser);

export default router

