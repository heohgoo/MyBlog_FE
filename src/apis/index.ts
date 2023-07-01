import axios from "axios";

//apis dir - 백엔드와 통신할 axios 함수 넣어줌
export const signInApi = async (data: any) => {
    const response = await axios.post("http://localhost:4040/api/auth/signIn", data).catch((error) => null);
    if (!response) return null;

    const result = response.data;
    return result;
}

export const signUpApi = async (data: any) => {
    const response = await axios.post("http://localhost:4040/api/auth/signUp", data).catch((error) => null);
    if (!response) return null;

    const result = response.data;
    return result;
}