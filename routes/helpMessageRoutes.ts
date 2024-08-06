import { Router } from 'express';
import { saveMessage, getMessages, downloadMessageExcel } from '../controllers/helpMessageController';

const router: Router = Router();

router.post('/helpmessage', saveMessage);

router.get('/admin/getmessage', getMessages);

router.get('/admin/downloadmessageexcel', downloadMessageExcel);

export default router;