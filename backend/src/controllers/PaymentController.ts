import { Request, Response } from "express";
import { CreatePaymentService } from "../services/PaymentService/CreatePaymentService";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;

    if (!paymentData.amount || !paymentData.description || !paymentData.paymentMethodId || !paymentData.email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const paymentResult = await CreatePaymentService(paymentData);
    return res.status(201).json(paymentResult);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};
