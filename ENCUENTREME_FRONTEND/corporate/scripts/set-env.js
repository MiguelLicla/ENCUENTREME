const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== VERIFICACIÓN DE ENTORNO ===');
console.log('API_URL:', apiUrl ? '✅ OK' : '❌ AUSENTE');
console.log('CLOUDINARY:', cloudName ? '✅ OK' : '❌ AUSENTE');

if (!apiUrl) {
  console.error('❌ ERROR: API_URL no definida. El build fallará.');
  process.exit(1);
}

const envConfigFile = `export const environment = {
  production: true,
  defaultauth: 'api',
  apiUrl: '${apiUrl}',
  adsenseClientId: 'ca-pub-2715739910930216',
  cloudinary: {
    cloudName: '${cloudName || ''}',
    apiKey: '${apiKey || ''}',
    apiSecret: '${apiSecret || ''}',
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
  console.log(`✅ Archivo generado: ${targetPath}`);
});
