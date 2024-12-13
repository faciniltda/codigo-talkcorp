// PaymentPage.jsx
import React, { useState } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import StatusScreenModal from '../../components/StatusScreenModal'; // Importa o StatusScreen
import api from '../../services/api';

initMercadoPago('TEST-63e21d49-306e-491f-9a48-d7956cbf1d7a', {
  locale: 'pt-BR',
});

const PaymentBrick = () => {
  const [paymentId, setPaymentId] = useState(null); // Estado para armazenar o paymentId
  const [showStatus, setShowStatus] = useState(false); // Controle para exibir o StatusScreen

  const initialization = {
    amount: 100,
    preferenceId:'608654313-2f87af02-c7ee-4f58-af8a-2772e5a02c28',
  };

  const customization = {
    paymentMethods: {
      bankTransfer: 'all',
      creditCard: 'all',
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    
    try {
      let newData = {
        paymentMethod: selectedPaymentMethod,
        ...formData,
      }
      console.log('Formulário de pagamento:', newData);
      const { data } = await api.post('/gateway/createPayment', newData);
      console.log('Resposta do servidor:', data);

      // Define o paymentId retornado e exibe o StatusScreen
      if (data?.id) {
        setPaymentId(data.id); // Atualiza o estado com o paymentId
        setShowStatus(true); // Mostra o StatusScreen
      }
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
    }
  };

  const onError = (error) => {
    console.error('Erro no Brick:', error);
  };

  const onReady = () => {
    console.log('Brick pronto!');
  };

  return (
    <div>
      {/* Exibe o Payment Brick ou o StatusScreen dependendo do estado */}
      {!showStatus ? (
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      ) : (
        // Renderiza o StatusScreen quando showStatus for true
        <StatusScreenModal paymentId={paymentId} />
      )}
    </div>
  );
};

export default PaymentBrick;
