import express from 'express'
import { createUser, getAllUsers, deleteUser, getUserById, loginUser} from "../controllers/userController";
import { Authentication } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
.get(Authentication.protect(["admin", "user"]), getAllUsers)
.post(createUser);

router.route('/:id')
.delete(Authentication.protect(["admin"]),deleteUser)
.get(Authentication.protect(["admin", "user"]),getUserById);

router.route('/login').post(loginUser);

export default router

