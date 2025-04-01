import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/protectRoute.js"
import { updateprofile  } from '../controllers/user.controller.js'
const router = express.Router();
router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

router.put("/update-profile", protectRoute ,updateprofile)

export default router;