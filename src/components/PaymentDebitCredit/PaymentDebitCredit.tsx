import { Payment } from '@mercadopago/sdk-react';
// import { error as errorAlert, normal } from '../../utils/alert';
const { VITE_URL_BASE } = import.meta.env

declare global {
    interface Window {
      MercadoPago: any;
    }
}

interface PaymentBrickProp {
preferenceId: string;
}


function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

function PaymentDebitCredit  ({preferenceId}: PaymentBrickProp) {

  const initialization = {
    amount: 100,
    preferenceId: preferenceId,
  };

  
  const customization = {
    visual: {
      hideFormTitle: true,
    },
    paymentMethods: {
      creditCard: "all" as "all" ,
      debitCard: "all" as "all" ,
      bankTransfer: "all",
      atm: "all",
      maxInstallments: 1
    },
  }


  async function onSubmit ( { selectedPaymentMethod, formData } : {selectedPaymentMethod:any , formData:any} ) {
    
    console.log(selectedPaymentMethod);
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve: any, reject: any) => {
      if (selectedPaymentMethod === 'wallet_purchase' || selectedPaymentMethod === 'onboarding_credits') {
        resolve();
      }
      console.log(generateUUID());
      
      formData.description = selectedPaymentMethod;
      fetch(`${VITE_URL_BASE}/payment/process_payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": generateUUID()
        },
        body: JSON.stringify({selectedPaymentMethod, formData}),
      })
        .then((response) => response.json())
        .then((response: any) => {
          // recibir el resultado del pago
          resolve(response);
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          reject(error);
        });
    });
  };
  const onError = async (error: any) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
    // errorAlert(error)
  };
  const onReady = async () => {
      /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
     */
    // normal("Brick Listo!")
  };

  return <div className='w-full'>
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
  
    />    
  </div>;
};

export default PaymentDebitCredit;