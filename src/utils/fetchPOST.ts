import { ApiResponse, ResponseData } from "../interfaces/interfaces";
import { error, success } from "./alert";


type RequestBody<T> = T;

export async function fetchPOST<T>(url: string, body?: RequestBody<T>, alert:boolean = true): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result: ResponseData = await response.json();
    // console.log(result);
    
    if (result.error) {
      {alert && error(result.message || "Error al realizar la Accion");}
      return { error: true };
    }

    {alert && success(result.message || "Accion Exitosa")}
    return { data: result, error: false, message: result.message};
    
  } catch (error) {
    return { data: null, error: `Error: ${error}` };
  }
}