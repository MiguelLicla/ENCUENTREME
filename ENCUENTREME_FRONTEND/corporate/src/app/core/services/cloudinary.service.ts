import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private readonly cloudName  = environment.cloudinary.cloudName;
  private readonly apiKey     = environment.cloudinary.apiKey;
  private readonly apiSecret  = environment.cloudinary.apiSecret;
  private readonly folder     = environment.cloudinary.folder;

  /** Genera firma SHA-1 para upload firmado */
  private async sign(paramsStr: string): Promise<string> {
    const msg = paramsStr + this.apiSecret;
    const buf = new TextEncoder().encode(msg);
    const hash = await crypto.subtle.digest('SHA-1', buf);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Sube un archivo imagen a Cloudinary.
   * Devuelve la secure_url (URL HTTPS pública de la imagen).
   */
  async upload(file: File): Promise<string> {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `folder=${this.folder}&timestamp=${timestamp}`;
    const signature = await this.sign(paramsToSign);

    const form = new FormData();
    form.append('file', file);
    form.append('api_key', this.apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('folder', this.folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      { method: 'POST', body: form }
    );
    if (!res.ok) throw new Error(`Cloudinary error ${res.status}`);
    const data = await res.json();
    return data.secure_url as string;
  }
}
