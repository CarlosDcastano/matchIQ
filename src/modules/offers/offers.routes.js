/* import { Router } from 'express';
import { createOffer } from './offers.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('company'),
  createOffer
);

export default router;
 */