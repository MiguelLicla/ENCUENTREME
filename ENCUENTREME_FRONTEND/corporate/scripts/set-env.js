const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [LLAVES DETECTADAS EN VERCEL] ===');
console.log('API_URL:', apiUrl ? apiUrl.substring(0, 10) + '...' : '❌ NO ENCONTRADA');
console.log('CLOUD_NAME:', cloudName ? cloudName : '❌ NO ENCONTRADA');
console.log('API_KEY:', apiKey ? apiKey.substring(0, 5) + '...' : '❌ NO ENCONTRADA');
console.log('API_SECRET:', apiSecret ? 'Recibido (Protegido)' : '❌ NO ENCONTRADA');

// SI FALTA ALGO, DETENEMOS EL BUILD PARA NO SUBIR ALGO QUE NO FUNCIONA
if (!apiUrl || !cloudName || !apiKey || !apiSecret) {
  console.error('❌ ERROR CRÍTICO: Una o más variables faltan en el panel de Vercel.');
  console.error('Por favor, revisa Settings -> Environment Variables.');
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

const envDir = path.join(process.cwd(), 'src', 'environments');
if (!fs.existsSync(envDir)) fs.mkdirSync(envDir, { recursive: true });

// SOBRESCRIBIR ABSOLUTAMENTE TODO
const files = ['environment.prod.ts', 'environment.ts', 'environment.development.ts'];

files.forEach(file => {
  const targetPath = path.join(envDir, file);
  fs.writeFileSync(targetPath, envConfigFile);
  console.log(`✅ Forzado en: ${file}`);
});

console.log('=== [INYECCIÓN COMPLETADA] ===');
