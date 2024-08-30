import { Router } from 'express';
import { addSeller, registerUser, verifyEmail, loginUser, getUserProfile, changeImageProfile, updateUserPhone, changePassword, logoutUser } from '../controllers/userController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import uploadImage from '../config/upload';

const router: Router = Router();

router.post('/admin/addseller', authenticateToken, authorizeRole('admin'), addSeller)

// Register route
router.post('/register', registerUser);

// Verify email route
router.get('/verify-email/:token', verifyEmail);

// Login route
router.post('/login', loginUser);

// Get user profile
router.get('/getuserprofile', authenticateToken, authorizeRole('user'), getUserProfile);

router.post('/changeimageprofile', authenticateToken, authorizeRole('user'), uploadImage.single('image'), changeImageProfile);

// Update user profile
router.put('/updateuserphone', authenticateToken, authorizeRole('user'), updateUserPhone);

// User change password
router.put('/change-password', authenticateToken, authorizeRole('user'), changePassword);

// Logout route
router.post('/logout', authenticateToken, logoutUser);

export default router;