import { MethodsOfDelivery } from "../interfaces/components";

 const MethodsDelivery: MethodsOfDelivery = {
    homeDelivery:{
        correoArg:{
            value:"homeDelivery_correoArg",
            title:"Correo Argentino Clasico | Envio a domicilio",
            subtitle:"Llega entre miércoles 22/05 y lunes 27/05",
            price:"$ 1.600"
        }
    },
    withdrawal:{
        localVersa:{
            value:"withdrawal_localVersa",
            title:"Retira en Local Versa",
            subtitle:"Av. Saenz, Pompeya, Local 21",
            price:"Gratis"
        },
        correoArg:{
            value:"withdrawal_correoArg",
            title:"Correo Argentino Clasico | Retiro",
            subtitle:"Llega entre miércoles 22/05 y lunes 27/05",
            price:"$ 1.000"
        }
    }

}

export default MethodsDelivery;