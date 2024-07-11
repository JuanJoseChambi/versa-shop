import { ApiResponse, ResponseData } from "../interfaces/interfaces";
import { error, success } from "./alert";

type RequestBody<T> = T;
export async function fetchPATCH<T>(url:string, body?: RequestBody<T>): Promise<ApiResponse<T>> {

    try {
        const response = await fetch(url, {
            method:"PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
    
        const result:ResponseData = await response.json()
        if(result.error) {
            error(result.message)
            return {error:true}
        }
        success(result.message)
        return {error: false}
    } catch (e) {
        error(`${e}`)
        return {error:true}
    }
}