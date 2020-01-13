import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { join } from 'path';
import { mkdir } from 'fs';

export const fileAvatarOption: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const avatarDir = join('media', 'avatars', req.params.id);
      mkdir(avatarDir, {recursive: true}, () => cb(null, avatarDir));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
};
