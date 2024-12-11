import React, { useState } from 'react';
import { initMercadoPago, Payment, StatusScreen } from '@mercadopago/sdk-react';
import api from '../../services/api';


const StatusScreenModal = ({ paymentId }) => {
    
    const initialization = {
        paymentId: paymentId, // id do pagamento a ser mostrado
    };
  
  
    const onError = (error) => {
      console.error('Erro no Brick:', error);
    };
  
    const onReady = () => {
      console.log('Brick pronto!');
    };
  
    return (
        <StatusScreen
            initialization={initialization}
            onReady={onReady}
            onError={onError}
        />
    );
};

export default StatusScreenModal;
