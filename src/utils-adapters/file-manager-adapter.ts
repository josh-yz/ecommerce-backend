import fs from 'fs';
import { IFileManager } from "../infrastructure/web/interfaces/file-manager";

export class FileManagerAdapter implements IFileManager {
    private basePath: string
    constructor() {
        this.basePath = `${__dirname}/../../public`;
    }
    deleteFile(filename: string) {
        // Verifica que el archivo exista en la ruta base
        const filePath = `${this.basePath}/${filename}`;
        if (!fs.existsSync(filePath)) {
            return 
        }

        // Elimina el archivo
        fs.unlinkSync(filePath);
    }


}