import express from 'express';
import { getAdminPanelData } from '../contracts/admin.js';

const  router = express.Router();

// Route for fetching all admin panel data
router.get('/admin-panel-data', getAdminPanelData);

export default router;