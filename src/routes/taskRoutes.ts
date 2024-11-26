// routes/taskRoutes.ts
import { Router } from 'express';
import { listUserTasks, addTask, editTask, removeTask } from '#controllers/taskController';
import { requireAuth } from '#middlewares/authMiddleware';

const router = Router();

router.get('/', requireAuth, listUserTasks);
router.post('/', requireAuth, addTask); 
router.put('/:id', requireAuth, editTask);
router.delete('/:id', requireAuth, removeTask);

export default router;
