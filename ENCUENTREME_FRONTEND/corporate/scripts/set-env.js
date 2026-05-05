const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== DEBUG ENTORNO VERCEL ===');
console.log('API_URL:', apiUrl ? 'PRESENTE' : 'AUSENTE (Falta en panel Vercel)');
console.log('CLOUDINARY_CLOUD_NAME:', cloudName ? 'PRESENTE' : 'AUSENTE');
console.log('============================');

// Si falta la URL, lanzamos un error para que el build se detenga y nos obligue a revisar Vercel
if (!apiUrl) {
  console.error('❌ ERROR CRÍTICO: La variable API_URL no está definida en Vercel.');
  console.error('Asegúrate de haberla agregado en Settings -> Environment Variables y que esté marcada para "Preview" y "Production".');
  process.exit(1);
}

const envConfigFile = `export const environment = {
  production: true,
  defaultauth: 'api',
  apiUrl: '${apiUrl}',
  adsenseClientId: 'ca-pub-2715739910930216',
  cloudinary: {
    cloudName: '${cloudName || 'YOUR_CLOUDINARY_NAME'}',
    apiKey: '${apiKey || 'YOUR_CLOUDINARY_API_KEY'}',
    apiSecret: '${apiSecret || 'YOUR_CLOUDINARY_API_SECRET'}',
    folder: 'encuentreme'
  },
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
`;

const paths = [
  path.join(__dirname, '../src/environments/environment.prod.ts'),
  path.join(__dirname, '../src/environments/environment.ts')
];

paths.forEach(targetPath => {
  fs.writeFileSync(targetPath, envConfigFile);
  console.log(`✅ Generado: ${targetPath}`);
});

console.log('=== CONTENIDO GENERADO (Verifica que no diga YOUR_...) ===');
console.log(envConfigFile);
console.log('========================================================');
