import { Router } from 'express';
import { createUser, getUserByEmail, updateUser, deleteUser } from '#controllers/userController';
import { requireAuth } from '#middlewares/authMiddleware';

const router = Router();

router.post('/', createUser); //register route
router.get('/:email', requireAuth, getUserByEmail); //find route - protected
router.put('/:id', requireAuth, updateUser); //edit route - protected
router.delete('/:id', requireAuth, deleteUser); //delete route - protected

export default router;