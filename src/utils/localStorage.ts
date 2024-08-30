import { jwtDecode } from "jwt-decode";
import { AccessToken } from "../api/adminApi";

export const getUserId = () : string => {
    let token = localStorage.getItem('access-token');
    const decodedToken: AccessToken | null = token ? jwtDecode(token) : null;
    return decodedToken?.businessId as string;
}