import { Request, Response, Router } from 'express';

import board from '@Controller/board.controller';
import dev from '@Controller/dev.controller';
import notice from '@Controller/notice.controller';
import user from '@Controller/user.controller';

// token
import getUserFromToken from '@Middleware/user/jwt/getUserFromToken';
import verifyToken from '@Middleware/user/jwt/verifyToken';

// common
import getStatus from '@Middleware/common/getStatus';

const router = Router();

router.get('/status', getStatus);
router.use('/dev', dev);
router.use('/user', user);

router.use(verifyToken, getUserFromToken);

router.use('/notice', notice);
router.use('/board', board);

export default router;
