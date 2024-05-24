// import { ResponseData } from "../interfaces/interfaces";

import { ApiResponse, ResponseData } from "../interfaces/interfaces";
import { error, success } from "./alert";


export async function fetchDELETE<T> (url:string): Promise<ApiResponse<T>> {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url, options);
        const result:ResponseData = await response.json();
        // console.log(result);

        if(result.error) { error(result.message) ;}

        success(result.message)
        return { error: false }
    } catch (error) {
        return {error: true}
    }
}