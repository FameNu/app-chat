
// BASE_URL get from env or hard code
const API_URI: string = import.meta.env.VITE_API_URI as string

export async function fetchData(endpoint: string): Promise<Response> {
  const customRequest = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return await fetch(`${API_URI}/${endpoint}`, customRequest)
}
