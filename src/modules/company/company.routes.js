// src/modules/company/company.routes.js
import { Router } from 'express';
import { companyController } from './company.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = Router();

router.put('/profile', authenticate, authorize('company'), companyController.completeProfile);
router.get('/profile', authenticate, authorize('company'), companyController.getMyProfile);

export default router;