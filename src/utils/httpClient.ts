import { fetchUtils } from "react-admin";
import { AccessToken, refreshToken } from "../api/adminApi";
import { jwtDecode } from "jwt-decode";

const httpClient = async (url: any, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    let token = localStorage.getItem('access-token');
    const decodedToken: AccessToken | null = token ? jwtDecode(token) : null;
    const currentTimestamp = Date.now() / 1000 | 0;
    if( !decodedToken?.exp|| decodedToken?.exp < currentTimestamp){
        const refToken = localStorage.getItem('refresh-token');
        if(refToken == null) {
            throw Error()
        }

       var response =  await refreshToken({token: refToken});
       token = response.data.accessToken
       localStorage.setItem("access-token", token);
       localStorage.setItem("refresh-token", response.data.refreshToken);
    }

    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

export default httpClient;