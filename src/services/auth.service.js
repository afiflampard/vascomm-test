import db from '../models/index.js';
import jwt from 'jsonwebtoken';

const User = db.User;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function registerService(data) {
    return await User.create({ ...data });
}


export async function loginService(userInstance) {
    const user = userInstance.toJSON();
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: '1d',
    });

    return token;
}