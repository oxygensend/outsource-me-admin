import axios, {AxiosResponse} from "axios";
import {JwtHeader, JwtPayload} from "jwt-decode";
import httpClient from "../utils/httpClient";
import.meta.env.VITE_SIMPLE_REST_URL 

export interface AuthPayload {
    identity: string,
    password: string
}
export interface AuthResponse {
    accessToken: string,
    refreshToken: string
}

export interface AccessToken extends JwtPayload {
    businessId: string,
    identity: string,
    verified: boolean,
    roles: string[]
}

export interface RefreshTokenPayload {
    token: string
}


export const authenticate = (authPayload: AuthPayload): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post(import.meta.env.VITE_SIMPLE_REST_URL  + "/auth/access_token", authPayload)
}

export const refreshToken = (refreshTokenPayload: RefreshTokenPayload): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post(import.meta.env.VITE_SIMPLE_REST_URL  + "/auth/refresh_token", refreshTokenPayload);
}

export const loadAddresses = () => {
   return  httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/static-data/addresses/load", {method: "POST"})
}
export const loadAddressesForceStop = () => {
    return  httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/static-data/addresses/load/forceStop", {method: "POST"})
 }