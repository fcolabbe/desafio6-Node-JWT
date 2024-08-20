import bcrypt from 'bcryptjs';
import { model } from '../models/userModel.js';
import jwt from "jsonwebtoken";
import "dotenv/config";

const home = (req, res) => {
    res.send('Home page desde el Router');
};

const notFound = (req, res) => {
    res.status(404).send('Not Found');
};

const registerUser = async (req, res) => {
    const { email, password, rol, lenguage } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await model.createUser(email, hashedPassword, rol, lenguage);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await model.getUserByEmail(email);
        console.log("Usuario encontrado:", user);

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: 'Error en el login', details: error.message });
    }
};


const getUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await model.getUserByEmail(decoded.email);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

export const controller = {
    home,
    registerUser,
    loginUser,
    getUser,
    notFound
}