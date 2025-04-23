// b2.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class B2Service {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('cloudinary.cloud_name'),
      api_key: this.configService.get('cloudinary.api_key'),
      api_secret: this.configService.get('cloudinary.api_secret'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    filename: string,
    folder: string,
  ) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `IPUC${folder ? '/' + folder : ''}`,
          public_id: filename ? filename : file.originalname,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }

  async deleteImage(publicId: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
