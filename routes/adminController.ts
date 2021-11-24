import { Router } from 'express';

// error
import ErrorMiddleware from '@Middleware/error/errorMiddleware';

// common, validation
import deleteCommentValidation from '@Middleware/admin/board/comment/delete/_validation';
import deleteBoardValidation from '@Middleware/admin/board/delete/_validation';
import deleteApproveValidation from '@Middleware/admin/notice/approve/delete/_validation';
import patchApproveValidation from '@Middleware/admin/notice/approve/patch/_validation';
import deleteNoticeValidation from '@Middleware/admin/notice/delete/_validation';
import GetNoticeValidation from '@Middleware/admin/notice/get/_validation';
import patchNoticeValidation from '@Middleware/admin/notice/patch/_validation';
import postNoticeValidation from '@Middleware/admin/notice/post/_validation';
import deleteUserValidation from '@Middleware/admin/user/delete/_validation';
import getUserValidation from '@Middleware/admin/user/get/_validation';
import patchUserValidation from '@Middleware/admin/user/patch/_validation';
import postUserValidation from '@Middleware/admin/user/post/_validation';
import checkValidation from '@Middleware/common/checkValidation';

// verify
import checkAdmin from '@Middleware/admin/common/checkAdmin';
import getUserFromToken from '@Middleware/user/jwt/getUserFromToken';
import verifyToken from '@Middleware/user/jwt/verifyToken';

// user
import deleteUser from '@Middleware/admin/user/delete/deleteUser';
import getUser from '@Middleware/admin/user/get/getUser';
import patchUser from '@Middleware/admin/user/patch/patchUser';
import postUser from '@Middleware/admin/user/post/postUser';

// notice
import deleteApprove from '@Middleware/admin/notice/approve/delete/deleteApprove';
import patchApprove from '@Middleware/admin/notice/approve/patch/patchApprove';
import deleteNotice from '@Middleware/admin/notice/delete/deleteNotice';
import getNotice from '@Middleware/admin/notice/get/getNotice';
import patchNotice from '@Middleware/admin/notice/patch/patchNotice';
import postNotice from '@Middleware/admin/notice/post/postNotice';

// board, comment
import deleteComment from '@Middleware/admin/board/comment/delete/deleteComment';
import deleteBoard from '@Middleware/admin/board/delete/deleteBoard';

//hanseithon
import getHanseithonUser from '@Middleware/admin/hanseithon/getUser';
import getHanseithonUserValidation from '@Middleware/admin/hanseithon/_validation';


const router: Router = Router();

router.use(verifyToken, getUserFromToken, checkAdmin);

router.get('/user', getUserValidation);
router.post('/user', postUserValidation);
router.patch('/user', patchUserValidation);
router.delete('/user', deleteUserValidation);
router.get('/notice', GetNoticeValidation);
router.post('/notice', postNoticeValidation);
router.patch('/notice', patchNoticeValidation);
router.delete('/notice', deleteNoticeValidation);
router.patch('/notice/approve', patchApproveValidation);
router.delete('/notice/approve', deleteApproveValidation);
router.delete('/board', deleteBoardValidation);
router.delete('/comment', deleteCommentValidation);
router.post('/hanseithon/user', getHanseithonUserValidation);

router.use(checkValidation);

router.get('/user', getUser);
router.post('/user', postUser);
router.patch('/user', patchUser);
router.delete('/user', deleteUser);
router.get('/notice', getNotice);
router.post('/notice', postNotice);
router.patch('/notice', patchNotice);
router.delete('/notice', deleteNotice);
router.patch('/notice/approve', patchApprove);
router.delete('/notice/approve', deleteApprove);
router.delete('/board', deleteBoard);
router.delete('/comment', deleteComment);
router.post('/hanseithon/user', getHanseithonUser)

router.use(ErrorMiddleware);

export default router;
