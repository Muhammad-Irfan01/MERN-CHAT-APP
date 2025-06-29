import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, sendMEssage, sideBarUsers } from '../controller/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, sideBarUsers);

router.get('/:id', protectRoute, getMessages);

router.post('/send/:id', protectRoute, sendMEssage);
export default router;