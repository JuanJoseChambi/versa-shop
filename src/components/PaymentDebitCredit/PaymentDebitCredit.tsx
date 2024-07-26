import { Payment } from '@mercadopago/sdk-react';
import { initMercadoPago } from "@mercadopago/sdk-react"
import { useEffect } from 'react';
const {VITE_MP_P_KEY_BRICKS, VITE_URL_BASE } = import.meta.env

declare global {
    interface Window {
      MercadoPago: any;
    }
  }

interface PaymentBrickProp {
preferenceId: string;
}


function PaymentDebitCredit  ({preferenceId}: PaymentBrickProp) {

  useEffect(() => {
    initMercadoPago(VITE_MP_P_KEY_BRICKS, { locale: 'es-AR' })
},[])

  const initialization = {
    amount: 100,
    preferenceId: preferenceId,
  };

  
  const customization = {
    visual: {
      hideFormTitle: true,
      style: {
        theme: "default",
      },
    },
    paymentMethods: {
      creditCard: "all",
              debitCard: "all",
              bankTransfer: "all",
              atm: "all",
      maxInstallments: 1
    },
  }


  const onSubmit = async (
    { selectedPaymentMethod, formData } : {selectedPaymentMethod:any , formData:any}
  ) => {
    console.log(selectedPaymentMethod);
    
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      fetch(`${VITE_URL_BASE}/payment/process_payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
   };
   const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
   };

  return <Payment
  initialization={initialization}
  customization={customization}
  onSubmit={onSubmit}
  onReady={onReady}
  onError={onError}

/>;
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