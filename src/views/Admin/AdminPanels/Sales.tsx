import useApi from "../../../hooks/useApi"


export interface Sales {
    purchase_id:   string;
    direction:     string;
    payment_id:    string;
    priceTotal:    number;
    userPurchase:  string;
    PurchaseState: PurchaseState;
    Products:      Product[];
}

export interface Product {
    product_id:      string;
    name:            string;
    image:           string;
    description:     string;
    PurchaseProduct: PurchaseProduct;
}

export interface PurchaseProduct {
    PurchaseProduct_id: string;
    cantidad:           number;
    size:               string;
    color:              string;
    PurchasePurchaseId: string;
    ProductProductId:   string;
}

export interface PurchaseState {
    state: string;
}


function Sales() {
    const {VITE_URL_BASE} = import.meta.env
    const {data} = useApi(`${VITE_URL_BASE}/purchase/all`) as {data: Sales[]};
    // async function hanlderS(params:type) {
    console.log(data);
    

  return (
    <section className="w-area h-auto"> 
        <section className="w-full h-auto">
        <h3 className="w-full text-start text-2xl font-semibold text-neutral-800 tracking-widest">VENTAS</h3>
        <section className="w-full flex justify-center items-center flex-col gap-2">
            {data?.map(purchases => (
                <div className="w-full flex justify-center items-center flex-col border border-neutral-400">
                    <div className="w-full flex justify-between items-center ">
                        <p>{purchases.direction}</p>
                        <p>{purchases.priceTotal}</p>
                        <p>{purchases.PurchaseState.state}</p>
                        <p>{purchases.payment_id}</p>
                    </div>
                    {purchases?.Products.map(product => (
                        <div className="w-full flex justify-start items-center gap-x-2">
                            <picture className="w-[100px] h-[100px] flex justify-center items-center">
                                <img src={product.image} alt="" />
                            </picture>
                            <div className="w-[40%] flex justify-start items-start flex-col">
                                <p className="text-sm text-neutral-800 font-bold">{product.name}</p>
                                <p className="text-neutral-700 text-clipping text-xs">{product.description}</p>
                            </div>
                            <div className="w-[6%] flex justify-center items-center flex-col bg-redd-500">
                                <p className="text-sm text-neutral-800 font-semibold">{product.PurchaseProduct.size}</p>
                                <p className="text-sm text-neutral-800 font-semibold">{product.PurchaseProduct.color}</p>
                                <p className="text-sm text-neutral-800 font-semibold">{product.PurchaseProduct.cantidad}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
        </section>
    </section>
  )
}

export default Sales