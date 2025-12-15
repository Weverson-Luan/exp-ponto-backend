/**
 * IMPORTS
 */
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

export const multerPointMarkingsConfig = {
  storage: diskStorage({
    destination: './public/uploads/points',
    filename: (req, file, callback) => {
      const ext = extname(file.originalname);
      const filename = `${randomUUID()}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(
        new Error('Apenas arquivos de imagem são permitido!'),
        false,
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
