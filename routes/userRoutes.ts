import { Router } from 'express';
import { registerUser, verifyEmail, loginUser, changePassword, logoutUser } from '../controllers/userController';
import authenticateToken from '../middleware/authMiddleware';

const router: Router = Router();

// Register route
router.post('/register', registerUser);

// Verify email route
router.get('/verify-email/:token', verifyEmail);

// Login route
router.post('/login', loginUser);

// User change password
router.put('/change-password', authenticateToken, changePassword);

// Logout route
router.post('/logout', authenticateToken, logoutUser);

export default router;