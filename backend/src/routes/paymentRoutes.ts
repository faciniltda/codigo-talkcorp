import { Router } from "express";
import { createPayment } from "../controllers/PaymentController";

const router = Router();

router.post("/createPayment", createPayment);

export default router;
