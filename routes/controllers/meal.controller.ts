import { Router } from 'express';

// common
import checkValidation from '@Middleware/common/checkValidation';

// get
import getMealValidation from '@Middleware/meal/get/_validation';
import getMeal from '@Middleware/meal/get/getMeal';

// mealOrder
import getMealOrder from '@Middleware/meal/order/getMealOrder';

const router: Router = Router();

router.get('/', getMealValidation);

router.use(checkValidation);

router.get('/', getMeal);
router.get('/order', getMealOrder);

export default router;
