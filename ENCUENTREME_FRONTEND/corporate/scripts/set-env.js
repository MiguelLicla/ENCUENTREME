const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== VALIDACIÓN DE ENTORNO VERCEL ===');
console.log('API_URL:', apiUrl ? '✅ OK' : '❌ FALTA');
console.log('CLOUD_NAME:', cloudName ? '✅ OK' : '❌ FALTA');
console.log('API_KEY:', apiKey ? '✅ OK' : '❌ FALTA');
console.log('API_SECRET:', apiSecret ? '✅ OK' : '❌ FALTA');
console.log('====================================');

// VALIDACION ESTRICTA: El build fallará si falta cualquier variable crítica
if (!apiUrl || !cloudName || !apiKey || !apiSecret) {
  console.error('❌ ERROR CRÍTICO: Faltan variables de entorno en Vercel.');
  console.error('Revisa que API_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET estén configuradas.');
  process.exit(1);
}

const envConfigFile = `export const environment = {
  production: true,
  defaultauth: 'api',
  apiUrl: '${apiUrl}',
  adsenseClientId: 'ca-pub-2715739910930216',
  cloudinary: {
    cloudName: '${cloudName}',
    apiKey: '${apiKey}',
    apiSecret: '${apiSecret}',
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
  console.log(`✅ Generado con éxito: ${targetPath}`);
});
