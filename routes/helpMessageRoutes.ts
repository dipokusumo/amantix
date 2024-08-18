import { Router } from 'express';
import { saveMessage, getMessages, downloadMessageExcel } from '../controllers/helpMessageController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router: Router = Router();

router.post('/helpmessage', saveMessage);

router.get('/admin/getmessage', authenticateToken, authorizeRole('admin'), getMessages);

router.get('/admin/downloadmessageexcel', authenticateToken, authorizeRole('admin'), downloadMessageExcel);

export default router;