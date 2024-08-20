import express from 'express';
import { controller } from '../controllers/userController.js';

const router = express.Router();

router.get('/', controller.home);

// Ruta para registrar usuarios
router.post('/usuarios', controller.registerUser);

// Ruta para login de usuarios
router.post('/login', controller.loginUser);

// Ruta para obtener los datos del usuario autenticado
router.get('/usuarios', controller.getUser);

router.get('*', controller.notFound);

export default router 
