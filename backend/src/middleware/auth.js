import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export default async function auth(req, res, next) {
  try {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token)
      return res.status(401).json({ success: false, message: 'Authentication required' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await prisma.employee.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true },
    });
    if (!employee) return res.status(401).json({ success: false, message: 'Invalid token' });

    req.user = employee;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
