import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { RequestHandler } from 'express';

const createMulterMiddleware = (folderName: string, multi : boolean): RequestHandler => {
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void {   
    const pathStorege = `${__dirname}/../../../../public/${folderName}`;
    cb(null, pathStorege);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void {    
    const ext = file.originalname.split('.').pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};


 return multer({ storage, fileFilter }).single('adjunto');
}

//const upload: RequestHandler = multer({ storage, fileFilter }).single('adjunto');

export default createMulterMiddleware;