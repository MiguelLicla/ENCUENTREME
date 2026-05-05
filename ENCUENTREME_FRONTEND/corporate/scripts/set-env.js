const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [BUILD STEP] INYECTANDO VARIABLES ===');
console.log('Directorio actual:', process.cwd());

const envFolder = path.join(__dirname, '../src/environments');
if (!fs.existsSync(envFolder)) {
  console.log('Creando carpeta de entornos...');
  fs.mkdirSync(envFolder, { recursive: true });
}

if (!apiUrl || !cloudName) {
  console.error('❌ ERROR: Faltan variables críticas (API_URL o CLOUD_NAME).');
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

const paths = [
  path.join(envFolder, 'environment.prod.ts'),
  path.join(envFolder, 'environment.ts')
];

paths.forEach(targetPath => {
  fs.writeFileSync(targetPath, envConfigFile);
  console.log('✅ Archivo inyectado en:', targetPath);
});

console.log('=== [BUILD STEP] COMPLETADO ===');
