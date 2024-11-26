import { Router } from 'express';
import userRoutes from './userRoutes'; 
import { loginUser } from '#controllers/authController';
import taskRoutes from './taskRoutes';

const router = Router();

router.get('/', async (req, res) => {
	res.send('todo-list-api :: online');
});

router.post('/auth', loginUser);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router;