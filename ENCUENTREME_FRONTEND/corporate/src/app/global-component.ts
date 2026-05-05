
export const GlobalComponent = {
    // URL de Render decodificada
    API_URL  : atob('aHR0cHM6Ly9lbmN1ZW50cmVtZS5vbnJlbmRlci5jb20v'), 
    AUTH_API : atob('aHR0cHM6Ly9lbmN1ZW50cmVtZS5vbnJlbmRlci5jb20vYXBpL0F1dGgv'),
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('cw_token')}` }
};
