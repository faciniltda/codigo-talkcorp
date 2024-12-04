import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    options: { timeout: 5000 },
});

const payment = new Payment(client);

export const CreatePaymentService = async (paymentData: any) => {
    console.log(process.env.MERCADO_PAGO_ACCESS_TOKEN)
    try {
        const body = {
            transaction_amount: paymentData.amount,
            description: paymentData.description,
            payment_method_id: paymentData.paymentMethodId,
            payer: {
                email: paymentData.email,
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
