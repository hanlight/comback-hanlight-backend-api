import { Router } from 'express';

// common
import checkValidation from '@Middleware/common/checkValidation';
import passwordEncryption from '@Middleware/user/common/passwordEncryption';

// register
import userExistCheck from '@Middleware/user/common/userExistCheck';
import signKeyCheck from '@Middleware/user/register/signKeyCheck';

// login
import loginValidation from '@Middleware/user/login/_validation';
import login from '@Middleware/user/login/login';
import registerValidation from '@Middleware/user/register/_validation';
import register from '@Middleware/user/register/register';

// phone
import phoneValidation from '@Middleware/user/phone/_validation';
import fbCheckCode from '@Middleware/user/phone/fbCheckCode';
import phoneCheck from '@Middleware/user/phone/phoneCheck';
import phoneInsert from '@Middleware/user/phone/phoneInsert';
import createTermAcceptLog from '@Middleware/user/rule/createTermAcceptLog';

// exist
import existValidation from '@Middleware/user/exist/_validation';
import exist from '@Middleware/user/exist/exist';

// recovery
import recoveryIdValidation from '@Middleware/user/recovery/id/_validation';
import recoveryId from '@Middleware/user/recovery/id/recoveryId';
import recoveryPwValidation from '@Middleware/user/recovery/password/_validation';

// jwt
import getUserFromToken from '@Middleware/user/jwt/getUserFromToken';
import issueToken from '@Middleware/user/jwt/issueToken';
import verifyToken from '@Middleware/user/jwt/verifyToken';

// get
import getUser from '@Middleware/user/get/getUser';

// patch
import userPatchPassword from '@Middleware/user/patch/password/_validation';
import patchPassword from '@Middleware/user/patch/password/patchPassword';
import userPatchPhone from '@Middleware/user/patch/phone/_validation';

// profile-image
import imageMulter from '@Middleware/user/image/post/imageMulter';
import postImage from '@Middleware/user/image/post/postImage';
import updateImage from '@Middleware/user/image/post/updateImage';

const router = Router();

router.post('/register', registerValidation);
router.post('/login', loginValidation);
router.post('/phone', phoneValidation);
router.get('/exist', existValidation);
router.post('/recovery/id', recoveryIdValidation);
router.post('/recovery/password', recoveryPwValidation);
router.patch('/password', userPatchPassword);
router.patch('/phone', userPatchPhone);
router.post('/image', imageMulter);

router.use(checkValidation);

router.post('/register', userExistCheck, signKeyCheck, passwordEncryption, register);
router.post('/login', userExistCheck, passwordEncryption, login, issueToken('login'));
router.post('/phone', signKeyCheck, fbCheckCode, phoneCheck, createTermAcceptLog, phoneInsert);
router.get('/exist', exist);
router.post('/recovery/id', fbCheckCode, recoveryId);
router.post('/recovery/password', fbCheckCode, phoneCheck, issueToken('none'));

router.use('/', verifyToken, getUserFromToken);

router.get('/', getUser);
router.patch('/password', passwordEncryption, patchPassword);
router.patch('/phone', fbCheckCode, phoneCheck, phoneInsert);
router.post('/image', postImage, updateImage, getUser);

export default router;
