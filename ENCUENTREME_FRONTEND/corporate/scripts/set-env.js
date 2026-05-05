const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL || 'MISSING_API_URL';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'MISSING_CLOUD_NAME';
const apiKey = process.env.CLOUDINARY_API_KEY || 'MISSING_API_KEY';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'MISSING_API_SECRET';

console.log('=== [INYECCIÓN CRÍTICA] ===');
console.log('API_URL:', apiUrl.startsWith('http') ? '✅ OK' : '❌ ERROR');
console.log('CLOUD_NAME:', cloudName !== 'MISSING_CLOUD_NAME' ? '✅ OK' : '❌ ERROR');

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

// RUTA ABSOLUTA DESDE LA RAÍZ DEL PROYECTO
const envDir = path.join(process.cwd(), 'src', 'environments');

if (!fs.existsSync(envDir)) {
    fs.mkdirSync(envDir, { recursive: true });
}

const targetProd = path.join(envDir, 'environment.prod.ts');
const targetDev = path.join(envDir, 'environment.ts');

fs.writeFileSync(targetProd, envConfigFile);
fs.writeFileSync(targetDev, envConfigFile);

console.log('✅ Archivos sobrescritos en:', envDir);
console.log('=== [FIN INYECCIÓN] ===');
