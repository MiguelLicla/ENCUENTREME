import { environment } from "../environments/environment";

export const GlobalComponent = {
    API_URL  : '/api/',
    AUTH_API : '/api/Auth/',
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('cw_token')}` },
};
