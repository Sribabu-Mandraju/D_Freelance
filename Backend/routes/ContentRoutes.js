import express from 'express'
import { submitContent } from '../controllers/contentController.js'
const router=express.Router()
router.post("/",submitContent)
export default router