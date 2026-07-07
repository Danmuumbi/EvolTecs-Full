import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Admin only routes
router.get('/all', authenticate, requireAdmin, UserController.getAllUsers);
router.get('/:id', authenticate, requireAdmin, UserController.getUserById);
router.put('/:id/role', authenticate, requireAdmin, UserController.updateUserRole);
router.delete('/:id', authenticate, requireAdmin, UserController.deleteUser);

export default router;