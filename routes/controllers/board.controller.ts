import { Router } from 'express';

// error
import ErrorMiddleware from '@Middleware/error/errorMiddleware';

// common
import checkUserType from '@Middleware/common/checkUserType';

// validation
import deleteCommentValidation from '@Middleware/board/comment/delete/_validation';
import getCommentValidation from '@Middleware/board/comment/get/_validation';
import patchCommentValidation from '@Middleware/board/comment/patch/_validation';
import PostCommentValidation from '@Middleware/board/comment/post/_validation';
import deleteBoardValidation from '@Middleware/board/delete/_validation';
import getBoardValidation from '@Middleware/board/get/_validation';
import getBoardLikeValidation from '@Middleware/board/like/get/_validation';
import postBoardlikeValidation from '@Middleware/board/like/post/_validation';
import patchBoardValidation from '@Middleware/board/patch/_validation';
import postBoardValidation from '@Middleware/board/post/_validation';
import reportValidation from '@Middleware/board/report/_validation';
import checkValidation from '@Middleware/common/checkValidation';

// board
import deleteBoard from '@Middleware/board/delete/deleteBoard';
import getBoard from '@Middleware/board/get/getBoard';
import patchBoard from '@Middleware/board/patch/patchBoard';
import postMulter from '@Middleware/board/post/boardMulter';
import postBoard from '@Middleware/board/post/postBoard';
import postBoardImage from '@Middleware/board/post/postBoardImage';

// report
import report from '@Middleware/board/report/report';

// comment
import deleteComment from '@Middleware/board/comment/delete/deleteComment';
import getComment from '@Middleware/board/comment/get/getComment';
import patchComment from '@Middleware/board/comment/patch/patchComment';
import postComment from '@Middleware/board/comment/post/postComment';

// like
import getBoardLike from '@Middleware/board/like/get/getBoardLike';
import postBoardlike from '@Middleware/board/like/post/postBoardLike';

const router: Router = Router();

router.get('/', getBoardValidation);
router.post('/', checkUserType(['student', 'graduate']), postMulter, postBoardValidation);
router.patch('/', checkUserType(['student', 'graduate']), patchBoardValidation);
router.delete('/', checkUserType(['student', 'graduate']), deleteBoardValidation);
router.post('/report', reportValidation);
router.get('/comment', getCommentValidation);
router.post('/comment', checkUserType(['student', 'graduate']), PostCommentValidation);
router.patch('/comment', checkUserType(['student', 'graduate']), patchCommentValidation);
router.delete('/comment', checkUserType(['student', 'graduate']), deleteCommentValidation);
router.get('/like', getBoardLikeValidation);
router.post('/like', postBoardlikeValidation);

router.use(checkValidation);

router.get('/', getBoard);
router.post('/', postBoardImage, postBoard);
router.patch('/', patchBoard);
router.delete('/', deleteBoard);
router.post('/report', report);
router.get('/comment', getComment);
router.post('/comment', postComment);
router.patch('/comment', patchComment);
router.delete('/comment', deleteComment);
router.get('/like', getBoardLike);
router.post('/like', postBoardlike);

router.use(ErrorMiddleware);

export default router;
