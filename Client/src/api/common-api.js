import axios from "axios";

export const baseURL = "http://localhost:8000"                          // Local

const api = axios.create({
    baseURL: baseURL,
    headers: {
        authorization: `Bearer ${localStorage.getItem("doc-token")}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

export const authLogin = async (payload) => {
    try {
        const data = await api.post('/api/user/login', payload)
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const authRegister = async (payload) => {
    try {
        console.log(payload)
        const data = await api.post('api/user/register', payload)
        console.log(data)
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}

export const authValidateOTP = async (payload) => {
    try {
        const data = await api.post('/otp-validate', payload)
        return data
    } catch (error) {
        if(error.response) return error.response
        else return JSON.parse(JSON.stringify(error))  
    }
}


export default api