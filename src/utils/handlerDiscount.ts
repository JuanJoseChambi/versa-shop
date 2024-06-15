export default function hanlderDiscount (price:number, discount:number) {
    const montoDescuento = price * (discount / price);
    const precioConDescuento = price - montoDescuento
    return precioConDescuento
}