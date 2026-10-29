import prisma from '../lib/prisma.js';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const paginate = (req) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

const list = (where) => async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req);
    const filter = typeof where === 'function' ? where(req) : where;
    const [data, total] = await Promise.all([
      prisma.enquiry.findMany({ where: filter, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.enquiry.count({ where: filter }),
    ]);
    res.json({ success: true, page, limit, total, data });
  } catch (err) {
    next(err);
  }
};

// PUBLIC - no auth Enquiery Form
export const submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, courseInterest, message } = req.body;
    if (!name || !email || !courseInterest)
      return res.status(400).json({ success: false, message: 'name, email and courseInterest are required' });
    if (!emailRe.test(email)) return res.status(400).json({ success: false, message: 'Invalid email' });

    const enquiry = await prisma.enquiry.create({
      data: { name, email: email.trim().toLowerCase(), phone, courseInterest, message },
    });
    res.status(201).json({ success: true, message: 'Enquiry submitted', data: enquiry });
  } catch (err) {
    next(err);
  }
};

export const getUnclaimed = list({ claimedById: null });
export const getMyLeads = list((req) => ({ claimedById: req.user.id }));

// Atomic claim: UPDATE ... WHERE id = ? AND claimedById IS NULL
export const claim = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1)
      return res.status(400).json({ success: false, message: 'Invalid enquiry id' });

    const { count } = await prisma.enquiry.updateMany({
      where: { id, claimedById: null },
      data: { claimedById: req.user.id, claimedAt: new Date() },
    });

    if (count === 1) {
      const data = await prisma.enquiry.findUnique({ where: { id } });
      return res.json({ success: true, message: 'Enquiry claimed', data });
    }

    const exists = await prisma.enquiry.findUnique({ where: { id }, select: { id: true } });
    if (!exists) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.status(409).json({ success: false, message: 'Enquiry already claimed' });
  } catch (err) {
    next(err);
  }
};
