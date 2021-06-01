import { Router } from 'express';

import getCalendarValidation from '@Middleware/calendar/get/_validation';
import getCalendar from '@Middleware/calendar/get/getCalendar';
import recentCalendar from '@Middleware/calendar/recent/recentCalendar';
import checkValidation from '@Middleware/common/checkValidation';

const router: Router = Router();

router.get('/', getCalendarValidation);

router.use(checkValidation);

router.get('/', getCalendar);
router.get('/recent', recentCalendar);

export default router;
