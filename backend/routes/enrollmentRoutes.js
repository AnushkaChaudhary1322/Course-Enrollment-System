import express from 'express';
import {createEnrollment, getAllEnrollments, deleteEnrollment, updateEnrollment} from '../controllers/enrollmentController.js';

const router = express.Router();
router.post('/create', createEnrollment);
router.get('/', getAllEnrollments);
router.delete('/:id', deleteEnrollment);
router.put('/:id', updateEnrollment);

export default router;
