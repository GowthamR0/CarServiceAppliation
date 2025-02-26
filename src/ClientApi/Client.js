import axios from 'axios'
export async function client(payLoad) {
    try {
        const fetchData = {
            method: payLoad.method,
            url: payLoad.url,
            data: payLoad.data,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(fetchData)
        return response
    }
    catch {
        console.log("Error Message 404")
    }
}