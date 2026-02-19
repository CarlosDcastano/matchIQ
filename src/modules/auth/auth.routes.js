import { Router } from 'express';
import { authController } from './auth.controller.js';

const router = Router();

router.post('/register/candidate', authController.registerCandidate);
router.post('/register/company', authController.registerCompany);

export default router;
