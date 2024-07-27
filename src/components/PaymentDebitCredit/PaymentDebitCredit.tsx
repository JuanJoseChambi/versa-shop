import { Payment } from '@mercadopago/sdk-react';
import { error as errorAlert, normal } from '../../utils/alert';
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
      creditCard: "all" as "all",
      debitCard: "all" as "all",
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
      
      formData.description = "Debito o credito";
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
    errorAlert(error)
  };
  const onReady = async () => {
      /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
     */
    normal("Brick Listo!")
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






// import { useEffect, useRef } from 'react';
// const {VITE_MP_P_KEY_BRICKS } = import.meta.env

// declare global {
//     interface Window {
//       MercadoPago: any;
//     }
//   }

// interface PaymentBrickProp {
// preferenceId: string;
// }

// function PaymentDebitCredit  ({preferenceId}: PaymentBrickProp) {
//   const paymentBrickContainerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const loadScript = (src: string) => {
//       return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = src;
//         script.async = true;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.body.appendChild(script);
//       });
//     };

//     const initializePaymentBrick = async () => {
//       try {
//         await loadScript('https://sdk.mercadopago.com/js/v2');
//         const mp = new window.MercadoPago(VITE_MP_P_KEY_BRICKS, {
//           locale: 'es'
//         });
//         const bricksBuilder = mp.bricks();

//         const settings = {
//           initialization: {
//             amount: 10000,
//             preferenceId: preferenceId,
//             payer: {
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//             },
//             },
//             customization: {
//                 visual: {
//                     hideFormTitle: true,
//                     style: {
//                     theme: "default",
//                     },
//                 },
//                 paymentMethods: {
//                     creditCard: "all",
// 		                debitCard: "all",
// 		                bankTransfer: "all",
// 		                atm: "all",
//                     maxInstallments: 1  
//                 },
//             },
//             callbacks: {
//             onReady: () => {
//                 console.log('Payment brick is ready');
//             },
//             onSubmit: ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: any, formData: any }) => {
//                 console.log(selectedPaymentMethod);
//                 console.log(formData);
                
//                 return new Promise((resolve, reject) => {
//                   fetch('/process_payment', {
//                       method: 'POST',
//                       headers: {
//                           'Content-Type': 'application/json',
//                       },
//                       body: JSON.stringify(formData),
//                   })
//                     .then((response) => response.json())
//                     .then((response) => {
//                         resolve(response);
//                     })
//                     .catch((error) => {
//                         reject(error);
//                     });
//                 });
//             },
//             onError: (error: any) => {
//                 console.error('Payment brick error:', error);
//             },
//             },
//         };

//         if (paymentBrickContainerRef.current) {
//             await bricksBuilder.create('payment', 'paymentBrick_container', settings);
//         }
//         } catch (error) {
//         console.error('Error loading MercadoPago script:', error);
//         }
//     };

//     initializePaymentBrick();
//   }, []);

//   return <div className='w-full' id="paymentBrick_container" ref={paymentBrickContainerRef}></div>;
// };

// export default PaymentDebitCredit;