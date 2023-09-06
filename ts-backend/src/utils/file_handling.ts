import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Request } from "express";
import { FileFilterCallback, Options as MulterOptions, DiskStorageOptions } from "multer";

export function checkFileExists(path: string): boolean {
    if (!fs.existsSync(path)) return false;
    return fs.statSync(path).isFile();
}

export async function deleteFile(path: string): Promise<void> {
    if (!checkFileExists(path)) return;
    await fs.promises.unlink(path);
}

//https://www.npmjs.com/package/multer

export function multerFileFilter(
    acceptedFiles: string[]
): NonNullable<MulterOptions["fileFilter"]> {
    return (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted
        // To reject this file pass `false`, like so: cb(null, false)
        // To accept the file pass `true`, like so: cb(null, true)
        // You can always pass an error if something goes wrong: cb(new Error('I don\'t have a clue!'))
        if (!file) return;
        if (acceptedFiles.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
}

export function genMulterDestination(
    path: string
): Exclude<DiskStorageOptions["destination"], string | undefined> {
    return (_req, _file, cb) => {
        //recursive indicates whether parent directories should be created.
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    };
}

export const genMulterFileName: NonNullable<DiskStorageOptions["filename"]> = (
    _req: Request,
    file: Express.Multer.File,
    cb
) => {
    const newFileName =
        [
            Date.now(),
            // file.fieldname.replace(/\./g, ""),
            file.originalname
                .split(".")[0]
                .replace(/[\\:]+/g, "")
                .replace(/\s/g, "-"), // File name after removing unwanted characters
            crypto.randomUUID(),
        ].join("_") + path.extname(file.originalname);
    cb(null, newFileName);
};
