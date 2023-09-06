//https://mongoosejs.com/docs/typescript/statics-and-methods.html
import mongoose, { HydratedDocument, Model, SchemaTimestampsConfig } from "mongoose";
import mime from "mime";

interface MediaProps extends SchemaTimestampsConfig {
    path: string;
    fileType: string;
}

interface MediaMethods {
    buildFields(args: Pick<MediaDocument, "path">): void;
}

export type MediaDocument = HydratedDocument<MediaProps, MediaMethods>;

export type MediaModel = Model<MediaProps, Record<string, never>, MediaMethods>;

const mediaSchema = new mongoose.Schema<MediaProps, MediaModel, MediaMethods>(
    {
        path: {
            type: String,
            required: true,
            trim: true,
        },
        fileType: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

//Alternative way: https://mongoosejs.com/docs/api/schema.html#Schema.prototype.loadClass()
mediaSchema.methods.buildFields = function ({ path }) {
    if (path) {
        this.path = path;
        this.fileType = mime.getType(path);
    }
};

const Media = mongoose.model<MediaProps, MediaModel>("Media", mediaSchema);
export default Media;
