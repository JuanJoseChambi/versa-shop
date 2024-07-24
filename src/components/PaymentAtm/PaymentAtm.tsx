import { useEffect, useRef } from 'react';
const {VITE_MP_P_KEY} = import.meta.env

declare global {
    interface Window {
      MercadoPago: any;
    }
  }

interface PaymentBrickProp {
preferenceId: string;
}

function PaymentAtm  ({preferenceId}: PaymentBrickProp) {
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
                    bankTransfer: "all",
					atm: "all",
					ticket: "all",
                    maxInstallments: 1  
                },
            },
            callbacks: {
            onReady: () => {
                console.log('Payment brick is ready');
            },
            onSubmit: ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: any, formData: any }) => {
                console.log(selectedPaymentMethod);
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

export default PaymentAtm;
