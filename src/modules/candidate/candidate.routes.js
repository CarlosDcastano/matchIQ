// src/modules/candidate/candidate.routes.js
import { Router } from 'express';
import { candidateController } from './candidate.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = Router();

// Ambas rutas protegidas: debes estar logueado y ser candidato
router.put('/profile', authenticate, authorize('candidate'), candidateController.completeProfile);
router.get('/profile', authenticate, authorize('candidate'), candidateController.getMyProfile);

export default router;