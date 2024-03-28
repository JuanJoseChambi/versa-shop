import { useState, useEffect } from "react";
import { ApiResponse } from "../interfaces/interfaces";

function useApi<T>(url: string, token?:string): ApiResponse<T> {
    
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData () {
    try {
        const requestOptions: RequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` || ""
            },
        };
        
        const response = await fetch(url,requestOptions)

        const result: T = await response.json();
        setData(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        setError(error as string);
    } finally {
        setLoading(false);
    }
}

    useEffect(() => {
        
        fetchData()
    },[ url, token ])


  return { data, error, loading };
}

export default useApi;