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

export interface MailMessageRequest {
    recipientId: string,
    subject: string,
    body: string
    senderId: string
}

export interface InternalNotificationRequest {
    id: string
    login: string
    serviceId: string
    content: InternalMessage
}

export interface InternalMessage {
    content: string
    recipients: RecipientId[]
}

export interface RecipientId {
    id: string
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

 export const recalculateDevelopersPopularityRate = () => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/admin-users/recalculate-developers-popularity-rate", {method: "POST"})
 }

 export const recalculateJobOffersPopularityRate = () => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/admin-job-offers/recalculate-popularity-rate", {method: "POST"})
 }

 export const clearUserCache = () => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/cache/users/clear", {method: "POST"})
 }

 export const clearJobOfferCache = () => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/cache/job-offers/clear", {method: "POST"})
 }

 export const mailMessage = (request: MailMessageRequest) => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/mail-messages", {method: "POST",
        body: JSON.stringify(request)
    })
 }

 export const archiveJobOffer = (id: string) => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/admin-job-offers/archive/" + id, 
        {method: "POST"}
    )
 }
 
 export const sendNotification = (request: InternalNotificationRequest) => {
    return httpClient(import.meta.env.VITE_SIMPLE_REST_URL + "/notifications/internalSync", {method: "POST", body: JSON.stringify(request)})
 }