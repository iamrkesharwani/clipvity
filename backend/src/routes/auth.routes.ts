import { Router } from 'express';
import { register } from '../controllers/auth/register.controller.js';
import { login } from '../controllers/auth/login.controller.js';
import { logout } from '../controllers/auth/logout.controller.js';
import { getMe } from '../controllers/auth/me.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
