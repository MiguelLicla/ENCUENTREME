const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL || 'https://encuentreme.onrender.com';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [MODO REEMPLAZO DIRECTO] ===');

if (!cloudName) {
  console.error('❌ ERROR: CLOUDINARY_CLOUD_NAME no encontrada en Vercel.');
  process.exit(1);
}

// OBJETO REAL QUE VAMOS A INSERTAR
const replacement = `
    API_URL  : '${apiUrl}/',
    AUTH_API : '${apiUrl}/api/Auth/',
    cloudinary: {
        cloudName: '${cloudName}',
        apiKey: '${apiKey}',
        apiSecret: '${apiSecret}',
        folder: 'encuentreme'
    },
`;

const filePath = path.join(process.cwd(), 'src/app/global-component.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Buscamos la marca y reemplazamos
if (content.includes('// DEPLOY_KEYS_HERE')) {
    content = content.replace('// DEPLOY_KEYS_HERE', replacement);
    fs.writeFileSync(filePath, content);
    console.log('✅ CÓDIGO INYECTADO EXITOSAMENTE EN:', filePath);
} else {
    console.error('❌ ERROR: No se encontró la marca // DEPLOY_KEYS_HERE en el archivo.');
    process.exit(1);
}

console.log('=== [FIN REEMPLAZO] ===');
