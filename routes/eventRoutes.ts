import { Router } from 'express';
import { addEvent, getUpcomingEvents, getEventsByCategory, searchEvent, getEventDetail, deleteEvent, editEvent, confirmEvent, getEventCountsForSeller, getUpcomingEventsForSeller } from '../controllers/eventController';
import { authenticateToken,  authorizeRole } from '../middleware/authMiddleware';
import uploadImage from '../config/upload';

const router: Router = Router();

router.post('/addevent', authenticateToken, authorizeRole('seller'), uploadImage.single('image'), addEvent);

router.get('/dashboard', getUpcomingEvents);

router.get('/dashboardbycategory/:category', getEventsByCategory);

router.get('/dashboardsearch', searchEvent);

router.get('/eventdetail/:id', getEventDetail);

router.put('/admin/confirmevent/:id', authenticateToken, authorizeRole('admin'), confirmEvent);

router.put('/admin/editevent/:id', authenticateToken, authorizeRole('admin'), uploadImage.single('image'), editEvent);

router.delete('/seller/deleteevent/:id', authenticateToken, authorizeRole('seller'), deleteEvent);

router.get('/dashboardseller/eventcounts', authenticateToken, authorizeRole('seller'), getEventCountsForSeller);

router.get('/dashboardseller/upcomingevents', authenticateToken, authorizeRole('seller'), getUpcomingEventsForSeller);

export default router;