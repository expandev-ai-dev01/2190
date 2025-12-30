/**
 * @summary
 * External API routes configuration.
 * Handles public endpoints that don't require authentication.
 *
 * @module routes/externalRoutes
 */

import { Router } from 'express';
import * as userController from '@/api/external/user/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * User registration routes - /api/external/user
 */
router.post('/user/register', userController.registerHandler);

export default router;
