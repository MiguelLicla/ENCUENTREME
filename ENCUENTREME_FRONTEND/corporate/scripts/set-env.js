const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [DEBUG] PROCESO DE INYECCIÓN ===');
console.log('API_URL:', apiUrl ? 'PRESENTE' : 'AUSENTE');
console.log('CLOUD_NAME:', cloudName ? 'PRESENTE' : 'AUSENTE');

// FALLO CRITICO SI FALTA ALGO
if (!apiUrl || !cloudName || !apiKey || !apiSecret) {
  console.error('❌ ERROR: Faltan variables de entorno en Vercel. EL BUILD SE DETENDRÁ.');
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
  firebaseConfig: { apiKey: '', authDomain: '', databaseURL: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '', measurementId: '' }
};
`;

// Asegurar que escribimos en la ruta correcta relativa al script
const targetProd = path.resolve(__dirname, '../src/environments/environment.prod.ts');
const targetDev = path.resolve(__dirname, '../src/environments/environment.ts');

fs.writeFileSync(targetProd, envConfigFile);
fs.writeFileSync(targetDev, envConfigFile);

console.log('✅ Archivos de entorno generados con éxito.');
console.log('=== [DEBUG] FIN INYECCIÓN ===');
