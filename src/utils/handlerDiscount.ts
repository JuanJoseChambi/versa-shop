

export default function hanlderDiscount (price:number, discount:number) {
    // const montoDescuento = price * (discount / price);
    // const precioConDescuento = price - montoDescuento
    // return precioConDescuento
    const discountDecimal = discount / 100;
    // Calcular el precio con descuento
    const discountedPrice = price * (1 - discountDecimal);
    return Math.floor(discountedPrice);
}

