const fs = require('fs');
const path = require('path');

const timestamp = new Date().toLocaleString();
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('=== [LLAVES DETECTADAS] ===');
console.log('CLOUD:', cloudName || '❌');

if (!cloudName || !apiSecret) {
    console.error('❌ ERROR: Faltan variables en Vercel.');
    process.exit(1);
}

// RUTA RELATIVA SEGURA
const baseDir = path.resolve(__dirname, '..');
const servicePath = path.join(baseDir, 'src/app/core/services/cloudinary.service.ts');

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
    console.log('--- CLOUDINARY LIVE ---');
    console.log('Build Time: ${timestamp}');
    console.log('Cloud: ${cloudName}');
  }

  private async sign(paramsStr: string): Promise<string> {
    const msg = paramsStr + this.apiSecret;
    const buf = new TextEncoder().encode(msg);
    const hash = await crypto.subtle.digest('SHA-1', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async upload(file: File): Promise<string> {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = await this.sign(\`folder=\${this.folder}&timestamp=\${timestamp}\`);
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
console.log('✅ Servicio actualizado.');
