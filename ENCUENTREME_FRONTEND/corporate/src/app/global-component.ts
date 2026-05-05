
export const GlobalComponent = {
    // URL de Render directa
    API_URL  : 'https://' + 'encuentreme' + '.onrender' + '.com/',
    AUTH_API : 'https://' + 'encuentreme' + '.onrender' + '.com/api/Auth/',
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('cw_token')}` },
    version: '1.0.final'
};

console.log('%c=== SISTEMA ENCUENTREME ACTUALIZADO ===', 'color: white; background: green; font-size: 20px;');
