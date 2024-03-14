import { useState, useEffect } from "react";
import { ApiResponse } from "../interfaces/interfaces";

function useApi<T>(url: string, body?:T, method?: string): ApiResponse<T> {
    
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
        const requestOptions: RequestInit = {
            headers: { 'Content-Type': 'application/json' },
        }

        if (method) {
            requestOptions.method = method,
            requestOptions.body = JSON.stringify(body)  
        }

        const response = await fetch(url, requestOptions)

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        setError(error as string);
    } finally {
        setLoading(false);
    }
    };

  useEffect(() => {
    fetchData();
}, [url]);

  return { data, error, loading };
}

export default useApi;