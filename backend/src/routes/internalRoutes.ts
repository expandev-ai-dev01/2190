/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as weightGoalsController from '@/api/internal/weight-goals/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Weight Goals routes - /api/internal/weight-goals
 */
router.get('/weight-goals', weightGoalsController.listHandler);
router.post('/weight-goals', weightGoalsController.createHandler);
router.get('/weight-goals/:id', weightGoalsController.getHandler);
router.put('/weight-goals/:id', weightGoalsController.updateHandler);
router.delete('/weight-goals/:id', weightGoalsController.deleteHandler);
router.post('/weight-goals/:id/revise', weightGoalsController.reviseHandler);

export default router;
