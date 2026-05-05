const fs = require('fs');
const path = require('path');

const timestamp = new Date().toLocaleString();
const apiUrl = process.env.API_URL || 'https://encuentreme.onrender.com';
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [BUILD INJECTION] ===');
console.log('Hora de Build:', timestamp);

if (!cloudName || !apiSecret) {
    console.error('❌ ERROR: No hay llaves de Cloudinary en Vercel.');
    process.exit(1);
}

// 1. ACTUALIZAR GLOBAL COMPONENT (Para la API)
const globalPath = path.join(process.cwd(), 'src/app/global-component.ts');
const globalContent = `
export const GlobalComponent = {
    API_URL  : '${apiUrl}/',
    AUTH_API : '${apiUrl}/api/Auth/',
    headerToken: { 'Authorization': \`Bearer \${localStorage.getItem('cw_token')}\` },
    buildInfo: '${timestamp}'
};
`;
fs.writeFileSync(globalPath, globalContent);
console.log('✅ GlobalComponent actualizado.');

// 2. ACTUALIZAR CLOUDINARY SERVICE (Directamente)
const servicePath = path.join(process.cwd(), 'src/app/core/services/cloudinary.service.ts');
const serviceContent = `
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private readonly cloudName  = '${cloudName}';
  private readonly apiKey     = '${apiKey}';
  private readonly apiSecret  = '${apiSecret}';
  private readonly folder     = 'encuentreme';

  constructor() {
    console.log('--- CLOUDINARY SERVICE INSTANCIADO ---');
    console.log('Build Time:', GlobalComponent.buildInfo);
    console.log('Cloud Name cargado:', this.cloudName);
  }

  private async sign(paramsStr: string): Promise<string> {
    const msg = paramsStr + this.apiSecret;
    const buf = new TextEncoder().encode(msg);
    const hash = await crypto.subtle.digest('SHA-1', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async upload(file: File): Promise<string> {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = \`folder=\${this.folder}&timestamp=\${timestamp}\`;
    const signature = await this.sign(paramsToSign);
    const form = new FormData();
    form.append('file', file);
    form.append('api_key', this.apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('folder', this.folder);
    const res = await fetch(\`https://api.cloudinary.com/v1_1/\${this.cloudName}/image/upload\`, { method: 'POST', body: form });
    if (!res.ok) throw new Error(\`Cloudinary error \${res.status}\`);
    const data = await res.json();
    return data.secure_url;
  }
}
`;
fs.writeFileSync(servicePath, serviceContent);
console.log('✅ CloudinaryService inyectado directamente.');
