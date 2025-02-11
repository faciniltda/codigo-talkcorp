// PaymentPage.jsx
import React, { useState, useContext } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import StatusScreenModal from '../../components/StatusScreenModal'; // Importa o StatusScreen
import api from '../../services/api';
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth/AuthContext";

import moment from 'moment';

initMercadoPago('APP_USR-5d15fcb1-9d43-46cb-8876-14d6c190b80b', {
  locale: 'pt-BR',
  
});

const PaymentBrick = () => {

  const [paymentId, setPaymentId] = useState(null); // Estado para armazenar o paymentId
  const [showStatus, setShowStatus] = useState(false); // Controle para exibir o StatusScreen
  const [company, setCompany] = useState({});
  const { handleLogout, loading } = useContext(AuthContext);
  //const {plan} = useLocation().location.state || {};

  const initialization = {
    amount: JSON.parse(localStorage.getItem('choosedPlan')).value,
    preferenceId:'608654313-2f87af02-c7ee-4f58-af8a-2772e5a02c28',
  };

  const customization = {
    paymentMethods: {
      creditCard: 'all'
    },
  };

  const getCompany = async () => {
    let companyId = localStorage.getItem('companyId');
    const { data } = await api.get("/companies/"+JSON.parse(companyId));
    console.log('Empresa:', data);
    setCompany(data);
    return data;
  }

  const updateDueDate = async () => {
    try {
      let companyData = await getCompany();
      let updatedCompany = {};
      console.log('companyData:', companyData);
      if(companyData.recurrence === 'MENSAL'){
        let newDueDate = moment().add(30, 'days').toISOString();
        updatedCompany = {
          ...company,
          dueDate: newDueDate,
        };
      }else if(companyData.recurrence === 'ANUAL'){
        let newDueDate = moment().add(365, 'days').toISOString();
        updatedCompany = {
          ...company,
          dueDate: newDueDate,
        };
      }
      const { data } = await api.put("/companies/" + companyData.id, updatedCompany);
      setCompany(data.company);
      console.log('Data de vencimento atualizada:', data);
    } catch (error) {
      console.error('Erro ao atualizar a data de vencimento:', error);
    }
  }

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    
    try {
      let newData = {
        paymentMethod: selectedPaymentMethod,
        ...formData,
      }
      console.log('Formulário de pagamento:', newData);
      const { data } = await api.post('/gateway/createPayment', newData);
      console.log('Resposta do servidor:', data);

      if (data && data.status && data.status === 'approved') {
        setPaymentId(data.id);
        setShowStatus(true);
        await updateDueDate();

        setTimeout(() => {
          handleLogout();
        }, 3000);
      }
      else if(data && data.status && data.status === 'rejected'){
        toast.error('Seu pagamento rejeitado');
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
