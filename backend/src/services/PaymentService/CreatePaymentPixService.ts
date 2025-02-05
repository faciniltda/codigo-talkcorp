import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    options: { timeout: 5000 },
});

const payment = new Payment(client);


export const CreatePaymentPixService = async (paymentData: any) => {
    try {
        
        const body = {
            transaction_amount: paymentData.transaction_amount,
            payment_method_id: paymentData.payment_method_id,
            payer: {
                email: paymentData.payer.email,
            },
        };
        
        const requestOptions = {
            idempotencyKey: paymentData.idempotencyKey || undefined,
        };
        const response = await payment.create({ body, requestOptions });
        return response;
    } catch (error) {
        throw new Error(`Error creating payment: ${error.message}`);
    }
};
