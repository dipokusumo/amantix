import { Router } from 'express';
import { addEvent, getUpcomingEvents, getEventsByCategory, searchEvent, getEventDetail, deleteEvent, editEvent, confirmEvent, getEventCountsForSeller, getUpcomingEventsForSeller, getAllEventsForSeller, getEventsByConfirmationStatus } from '../controllers/eventController';
import { authenticateToken,  authorizeRole } from '../middleware/authMiddleware';
import uploadImage from '../config/upload';

const router: Router = Router();

router.get('/dashboard', getUpcomingEvents);

router.get('/dashboardbycategory/:category', getEventsByCategory);

router.get('/dashboardsearch', searchEvent);

router.get('/eventdetail/:id', getEventDetail);

router.get('/seller/dashboard/eventcounts', authenticateToken, authorizeRole('seller'), getEventCountsForSeller);

router.get('/seller/dashboard/upcomingevents', authenticateToken, authorizeRole('seller'), getUpcomingEventsForSeller);

router.post('/seller/addevent', authenticateToken, authorizeRole('seller'), uploadImage.single('image'), addEvent);

router.get('/seller/allevents', authenticateToken, authorizeRole('seller'), getAllEventsForSeller);

router.delete('/seller/deleteevent/:id', authenticateToken, authorizeRole('seller'), deleteEvent);

router.get('/admin/dashboard/:isConfirm?', authenticateToken, authorizeRole('admin'), getEventsByConfirmationStatus);

router.put('/admin/confirmevent/:id', authenticateToken, authorizeRole('admin'), confirmEvent);

router.put('/admin/editevent/:id', authenticateToken, authorizeRole('admin'), uploadImage.single('image'), editEvent);

export default router;