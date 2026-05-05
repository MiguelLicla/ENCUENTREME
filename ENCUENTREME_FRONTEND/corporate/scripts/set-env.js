const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL || 'https://encuentreme.onrender.com';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [LLAVES DETECTADAS EN VERCEL] ===');
console.log('CLOUD_NAME:', cloudName ? '✅ OK' : '❌ NO ENCONTRADA');

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ ERROR CRÍTICO: Faltan llaves de Cloudinary en Vercel.');
  process.exit(1); 
}

const globalComponentContent = `
export const GlobalComponent = {
    API_URL  : '${apiUrl}/',
    AUTH_API : '${apiUrl}/api/Auth/',
    headerToken: { 'Authorization': \`Bearer \${localStorage.getItem('cw_token')}\` },
    cloudinary: {
        cloudName: '${cloudName}',
        apiKey: '${apiKey}',
        apiSecret: '${apiSecret}',
        folder: 'encuentreme'
    }
};
`;

// Ruta absoluta a GlobalComponent
const targetPath = path.resolve(__dirname, '../src/app/global-component.ts');

try {
    fs.writeFileSync(targetPath, globalComponentContent);
    console.log('✅ GlobalComponent actualizado con éxito en:', targetPath);
} catch (err) {
    console.error('❌ Error al escribir GlobalComponent:', err);
    process.exit(1);
}
