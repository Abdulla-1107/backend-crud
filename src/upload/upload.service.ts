// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const base64 = file.buffer.toString('base64');

    const formData = new FormData();
    formData.append('image', base64);
    formData.append('key', process.env.IMGBB_API_KEY!);

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!data.success) throw new Error('Rasm yuklanmadi!');

    return data.data.url;
  }
}
