interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Tipo genérico para el body
type RequestBody<T> = T;

export async function fetchPOST<T>(url: string, body: RequestBody<T>): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result: T = await response.json();

    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: `Error: ${error}` };
  }
}