import { Router } from 'express';

import checkValidation from '@Middleware/common/checkValidation';
import getNoticeValidation from '@Middleware/notice/_validation';
import createNoticeLog from '@Middleware/notice/createNoticeLog';
import getNotice from '@Middleware/notice/getNotice';

const router: Router = Router();

router.get('/', getNoticeValidation);

router.use(checkValidation);

router.get('/', getNotice, createNoticeLog);

export default router;
