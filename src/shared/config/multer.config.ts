import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

export const multerConfig = (defaultPath?: string, defaultName?: string) => {
  return {
    storage: diskStorage({
      destination: (req: any, file, cb) => {
        req.fileFields = req.fileFields || {};

        req.fileFields.destinationPath = (body) => {
          const ultimatePath = body.filePath
            ? body.filePath
            : defaultPath
              ? defaultPath
              : '';
          const uploadPath = ultimatePath
            ? `./uploads/${ultimatePath}`
            : './uploads';

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          return uploadPath;
        };

        const tempPath = './uploads/temp';
        if (!fs.existsSync(tempPath)) {
          fs.mkdirSync(tempPath, { recursive: true });
        }
        cb(null, tempPath);
      },
      filename: (req: any, file, cb) => {
        req.fileFields = req.fileFields || {};
        req.fileFields.originalName = file.originalname;
        req.fileFields.ext = extname(file.originalname);

        const tempName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${req.fileFields.ext}`;
        req.fileFields.tempName = tempName;

        cb(null, tempName);
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  };
};
