import { useEffect, useRef } from 'react';
const {VITE_MP_P_KEY } = import.meta.env

declare global {
    interface Window {
      MercadoPago: any;
    }
  }

interface PaymentBrickProp {
preferenceId: string;
}

function PaymentDebitCredit  ({preferenceId}: PaymentBrickProp) {
  const paymentBrickContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializePaymentBrick = async () => {
      try {
        await loadScript('https://sdk.mercadopago.com/js/v2');
        const mp = new window.MercadoPago(VITE_MP_P_KEY, {
          locale: 'es'
        });
        const bricksBuilder = mp.bricks();

        const settings = {
          initialization: {
            amount: 10000,
            preferenceId: preferenceId,
            payer: {
                firstName: "",
                lastName: "",
                email: "",
            },
            },
            customization: {
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
            },
            callbacks: {
            onReady: () => {
                console.log('Payment brick is ready');
            },
            onSubmit: ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: any, formData: any }) => {
                return new Promise((resolve, reject) => {
                fetch('/process_payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            },
            onError: (error: any) => {
                console.error('Payment brick error:', error);
            },
            },
        };

        if (paymentBrickContainerRef.current) {
            await bricksBuilder.create('payment', 'paymentBrick_container', settings);
        }
        } catch (error) {
        console.error('Error loading MercadoPago script:', error);
        }
    };

    initializePaymentBrick();
  }, []);

  return <div className='w-full' id="paymentBrick_container" ref={paymentBrickContainerRef}></div>;
};

export default PaymentDebitCredit;





// import { useEffect, useRef } from 'react';
// import { loadMercadoPago } from '@mercadopago/sdk-js';
// const {VITE_MP_P_KEY, VITE_URL_BASE} = import.meta.env


// declare global {
//     interface Window {
//       MercadoPago: any;
//     }
//   }

//   interface CardFormData {
//     paymentMethodId: string;
//     issuerId: string;
//     cardholderEmail: string;
//     amount: string;
//     token: string;
//     installments: string;
//     identificationNumber: string;
//     identificationType: string;
//   }

// const PaymentForm = () => {
//   const formRef = useRef<HTMLFormElement | null>(null);

//   useEffect(() => {
//     const initializeMercadoPago = async () => {
//         await loadMercadoPago();
//         const mp = new window.MercadoPago(VITE_MP_P_KEY);

//         const cardForm = mp.cardForm({
//         amount: '100.5',
//         iframe: true,
//         form: {
//             id: 'form-checkout',
//             cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Numero de tarjeta' },
//             expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/YY' },
//             securityCode: { id: 'form-checkout__securityCode', placeholder: 'Código de seguridad' },
//             cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular de la tarjeta' },
//             issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emisor' },
//             installments: { id: 'form-checkout__installments', placeholder: 'Cuotas' },
//             identificationType: { id: 'form-checkout__identificationType', placeholder: 'Tipo de documento' },
//             identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Número del documento' },
//             cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' },
//         },
//         callbacks: {
//             onFormMounted:  (error: any) => {
//             if (error) return console.warn('Form Mounted handling error: ', error);
//             console.log('Form mounted');
//             },
//             onSubmit: (event : React.FormEvent<HTMLFormElement>) => {
//             event.preventDefault();

//             const {
//                 paymentMethodId: payment_method_id,
//                 issuerId: issuer_id,
//                 cardholderEmail: email,
//                 amount,
//                 token,
//                 installments,
//                 identificationNumber,
//                 identificationType,
//             } = cardForm.getCardFormData() as CardFormData;

//             fetch('/process_payment', {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                 token,
//                 issuer_id,
//                 payment_method_id,
//                 transaction_amount: Number(amount),
//                 installments: Number(installments),
//                 description: 'Descripción del producto',
//                 payer: {
//                     email,
//                     identification: {
//                     type: identificationType,
//                     number: identificationNumber,
//                     },
//                 },
//                 }),
//             });
//             },
//             onFetching: (resource: any) => {
//             console.log('Fetching resource: ', resource);
//             if(!formRef || !formRef.current) return;
//             const progressBar = formRef.current.querySelector('.progress-bar');
//             progressBar?.removeAttribute('value');

//             return () => {
//                 progressBar?.setAttribute('value', '0');
//             };
//             },
//         },
//         });
//     };

//     initializeMercadoPago();
//     }, []);

//     return (
//         <div className='w-full bg-redd-500'>
//             <style>
//             {`
//                 #form-checkout {
//                 display: flex;
//                 flex-direction: column;
//                 }
//                 .container {
//                 height: 40px;
//                 display: inline-block;
//                 border: 1px solid rgb(118, 118, 118);
//                 border-radius: 2px;
//                 padding: 1px 5px;
//                 background-color: rgb(255, 255, 255);
//                 }
//             `}
//             </style>
//             <form id="form-checkout" className='w-full gap-y-3' ref={formRef}>
//                 <div className='w-full flex justify-start items-center gap-x-5 relative bg-redd-500'>
//                     <div id="form-checkout__cardNumber" className="w-[400px] h-[40px] rounded-sm border px-2 border-neutral-600 text-sm bg-white"></div>
//                     <div className='flex justify-between items-center gap-x-3'>
//                         <div id="form-checkout__expirationDate" className="w-[100px] h-[40px] rounded-sm border px-2 border-neutral-600 text-sm bg-white"></div>
//                         <div id="form-checkout__securityCode" className="w-[200px] h-[40px] rounded-sm border px-2 border-neutral-600 text-sm bg-white"></div>
//                     </div>
//                 </div>
//                 <div className='w-full flex justify-start items-center gap-x-5'>
//                     <input type="text" id="form-checkout__cardholderName" className='w-[300px] h-[40px] rounded-sm border px-2 border-neutral-600 bg-white'/>
//                     <input type="text" id="form-checkout__identificationNumber" className='w-[200px] h-[40px] rounded-sm border px-2 border-neutral-600 bg-white'/>
//                     <select id="form-checkout__identificationType" className='w-[150px] py-2 outline-none border border-neutral-600'></select>
//                 </div>
//                 <input type="email" id="form-checkout__cardholderEmail" className='w-[400px] h-[40px] rounded-sm border px-2 border-neutral-600 bg-white'/>
//                 <select id="form-checkout__issuer"></select>
//                 <select id="form-checkout__installments"></select>
//                 <button type="submit" id="form-checkout__submit">Pagar</button>
//                 <progress value="0" className="progress-bar">Cargando...</progress>
//             </form>
            
//         </div>
//     );
// };

// export default PaymentForm;