import { Router } from 'express';
import { createTransaction } from '../controllers/transactionController';
import { authenticateToken,  authorizeRole } from '../middleware/authMiddleware';

const router: Router = Router();

router.post('/user/buyticket', authenticateToken, authorizeRole('user'), createTransaction);

export default router;