import express from "express"
import { getAllPortfolios } from "../controllers/ActiveFreelancers.js"
const router=express.Router()
router.get("/",getAllPortfolios)
export default router