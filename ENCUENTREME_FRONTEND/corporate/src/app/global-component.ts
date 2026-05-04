import { environment } from "../environments/environment";

export const GlobalComponent = {
    API_URL  : `${environment.apiUrl}/`,
    AUTH_API : `${environment.apiUrl}/api/Auth/`,
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('cw_token')}` },
};
