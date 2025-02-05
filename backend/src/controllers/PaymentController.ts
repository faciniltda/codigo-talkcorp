import { Request, Response } from "express";
import { CreatePaymentPixService } from "../services/PaymentService/CreatePaymentPixService";
import { CreatePaymentCreditCardService } from "../services/PaymentService/CreatePaymentCreditCardService";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    if(paymentData.paymentMethod === 'bank_transfer'){
      const paymentResult = await CreatePaymentPixService(paymentData);
      return res.status(201).json(paymentResult);
    }
    else if(paymentData.paymentMethod === 'credit_card'){
      const paymentResult = await CreatePaymentCreditCardService(paymentData);
      return res.status(201).json(paymentResult);
    }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};
