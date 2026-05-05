const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel
const apiUrl = process.env.API_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Debug: Verificar qué variables se detectan (sin mostrar el secret completo)
console.log('--- Verificando Variables de Entorno en Vercel ---');
console.log('API_URL:', apiUrl ? '✅ Detectada' : '❌ NO DETECTADA');
console.log('CLOUDINARY_CLOUD_NAME:', cloudName ? '✅ Detectado' : '❌ NO DETECTADO');
console.log('CLOUDINARY_API_KEY:', apiKey ? '✅ Detectada' : '❌ NO DETECTADA');
console.log('CLOUDINARY_API_SECRET:', apiSecret ? '✅ Detectado' : '❌ NO DETECTADO');
console.log('------------------------------------------------');

if (!apiUrl || !cloudName || !apiKey || !apiSecret) {
  console.error('⚠️ ALERTA: Faltan variables de entorno. Se usarán marcadores de posición.');
}

const envConfigFile = `export const environment = {
  production: true,
  defaultauth: 'api',
  apiUrl: '${apiUrl || 'YOUR_PRODUCTION_API_URL'}',
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

// USAR VERSION SINCRONA PARA EVITAR CONDICION DE CARRERA
paths.forEach(targetPath => {
  try {
    fs.writeFileSync(targetPath, envConfigFile);
    console.log(`✅ Archivo generado: ${targetPath}`);
  } catch (err) {
    console.error(`❌ Error al escribir en ${targetPath}:`, err);
    process.exit(1);
  }
});
