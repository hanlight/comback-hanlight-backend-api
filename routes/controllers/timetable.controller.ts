import { Router } from 'express';

import getTimeTable from '@Middleware/timetable/getTimeTable';

const router: Router = Router();

router.get('/', getTimeTable);

export default router;
