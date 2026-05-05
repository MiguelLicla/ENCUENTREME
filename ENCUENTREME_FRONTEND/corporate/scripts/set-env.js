const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel o local
const apiUrl = process.env.API_URL || 'YOUR_PRODUCTION_API_URL';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUDINARY_NAME';
const apiKey = process.env.CLOUDINARY_API_KEY || 'YOUR_CLOUDINARY_API_KEY';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'YOUR_CLOUDINARY_API_SECRET';

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

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error al generar environment.prod.ts:', err);
    process.exit(1);
  }
  console.log('✅ environment.prod.ts generado con éxito usando variables de entorno.');
});
