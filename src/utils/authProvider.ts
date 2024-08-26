import { AuthProvider } from 'react-admin';
import { AccessToken, authenticate } from '../api/adminApi';
import { jwtDecode } from 'jwt-decode';

// @ts-ignore
// @ts-ignore
/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        return authenticate({ identity: username, password: password })
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.data;
            })
            .then((auth) => {
                const user: AccessToken = jwtDecode(auth.accessToken);
                console.log(user);
                // if(!user.roles.includes("ROLE_ADMIN")){
                //    throw new Error("Access denied")
                // }

                localStorage.setItem('access-token', auth.accessToken);
                localStorage.setItem('refresh-token', auth.refreshToken);
            });
    },
    logout: () => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => (localStorage.getItem('access-token') ? Promise.resolve() : Promise.reject()),
    getPermissions: () => {
        return Promise.resolve(undefined);
    },
    getIdentity: () => {
        const token = localStorage.getItem('access-token');
        const user: AccessToken | undefined | null = token ? jwtDecode(token) : null;

        return Promise.resolve({
            id: user?.businessId,
            fullName: user?.identity,
            roles: user?.roles,
        });
    },
};

export default authProvider;
