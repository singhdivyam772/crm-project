import { Router } from 'express';
import auth from '../middleware/auth.js';
import { submitEnquiry, getUnclaimed, getMyLeads, claim } from '../controllers/enquiryController.js';

const router = Router();
router.post('/public', submitEnquiry); // no auth
router.get('/unclaimed', auth, getUnclaimed);
router.get('/my', auth, getMyLeads);
router.post('/:id/claim', auth, claim);
export default router;
