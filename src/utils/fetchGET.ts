import { ApiResponse } from "../interfaces/interfaces";

export async function fetchGET <T>(url:string):Promise<ApiResponse<T>> {
    
    try {
        const response = await fetch(url);

    if (!response.ok) throw new Error (`${response.status}`)

    const data: T = await response.json();

    return { data:data, error:null }
    } catch (error) {
        return {data:null, error:`Error: ${error}`}
    }
}