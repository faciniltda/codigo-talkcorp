// PaymentPage.jsx
import React from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';


initMercadoPago('TEST-63e21d49-306e-491f-9a48-d7956cbf1d7a', {
  locale: 'pt-BR',
});

const PaymentBrick = () => {
  const initialization = {
    amount: 100,
    preferenceId: '<PREFERENCE_ID>',
  };

  const customization = {
    paymentMethods: {
      bankTransfer: 'all',
      creditCard: 'all',
      mercadoPago: 'all',
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/gateway/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Pagamento processado:', response);
          resolve();
        })
        .catch((error) => {
          console.error('Erro ao processar pagamento:', error);
          reject();
        });
    });
  };

  const onError = async (error) => {
    console.error('Erro no Brick:', error);
  };

  const onReady = async () => {
    console.log('Brick pronto!');
  };

  return (
    <div>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};

export default PaymentBrick;
