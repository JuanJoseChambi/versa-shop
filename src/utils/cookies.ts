

export function setCookie(nombre: string, valor: any, diasParaExpirar: number) {
    var fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasParaExpirar * 24 * 60 * 60 * 1000));
    var expires = "expires=" + fechaExpiracion.toUTCString();
    document.cookie = nombre + "=" + JSON.stringify(valor) + ";" + expires + ";path=/";
}