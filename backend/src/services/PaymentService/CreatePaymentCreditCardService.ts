import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    options: { timeout: 5000 },
});

const payment = new Payment(client);


export const CreatePaymentCreditCardService = async (paymentData: any) => {
    try {
        const body = {
            transaction_amount: paymentData.transaction_amount,
            token: paymentData.token,
            description: '<DESCRIPTION>',
            installments: paymentData.installments,
            payment_method_id: paymentData.payment_method_id,
            issuer_id: paymentData.issuer_id,
            payer: {
                email: paymentData.payer.email,
                identification: {
                number: paymentData.payer.identification.number,
                type: paymentData.payer.identification.type,
                },
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
