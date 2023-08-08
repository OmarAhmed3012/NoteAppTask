import express from 'express';
import { NotificationController } from '../controllers/notificationController';

const notificationRoutes = express.Router();
const notificationController = new NotificationController();

notificationRoutes.get('/notifications', notificationController.getAllNotifications);
notificationRoutes.post('/notifications', notificationController.scheduleNotifications);

export default notificationRoutes;