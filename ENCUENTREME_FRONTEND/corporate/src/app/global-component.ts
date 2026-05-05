import { environment } from "../environments/environment";

export const GlobalComponent = {
    API_URL  : 'https://encuentreme.onrender.com/',
    AUTH_API : 'https://encuentreme.onrender.com/api/Auth/',
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('cw_token')}` },
};
