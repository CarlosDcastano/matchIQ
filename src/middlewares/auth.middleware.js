// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  // El token llega en el header así: "Bearer eyJhbGci..."
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role } — lo guardamos para usarlo después
    next(); // pasa al siguiente paso (el controller)
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
