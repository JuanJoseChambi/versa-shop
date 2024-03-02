import { useState, useEffect } from "react";
import { ApiResponse } from "../interfaces/interfaces";

function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result: T = await response.json();
        setData(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        setError(error as Error);
    } finally {
        setLoading(false);
    }
    };

    fetchData();
}, [url]);

  return { data, error, loading };
}

export default useApi;