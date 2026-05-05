const fs = require('fs');
const path = require('path');

// Cargar variables de entorno de Vercel o local
const apiUrl = process.env.API_URL || 'YOUR_PRODUCTION_API_URL';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUDINARY_NAME';
const apiKey = process.env.CLOUDINARY_API_KEY || 'YOUR_CLOUDINARY_API_KEY';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'YOUR_CLOUDINARY_API_SECRET';

const isProduction = true; // El script se corre para el build de Vercel

const envConfigFile = `export const environment = {
  production: ${isProduction},
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

// Sobrescribir AMBOS archivos para asegurar que no se use el valor viejo
const paths = [
  path.join(__dirname, '../src/environments/environment.prod.ts'),
  path.join(__dirname, '../src/environments/environment.ts')
];

paths.forEach(targetPath => {
  fs.writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(`Error al generar ${targetPath}:`, err);
      process.exit(1);
    }
    console.log(`✅ ${path.basename(targetPath)} generado con éxito.`);
  });
});
