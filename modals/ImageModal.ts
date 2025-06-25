import mongoose, { Schema, model, models } from "mongoose";

export const IMAGE_DIMENSION = {
  width: 1080,
  height: 1920,

}

export interface IIMAGE{
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  ImageUrl: string;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}


const imageSchema = new Schema<IIMAGE>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ImageUrl: { type: String, required: true },
  transformation: {
    height: { type: Number, default: IMAGE_DIMENSION.height },
    width: { type: Number, default: IMAGE_DIMENSION.width },
    quality:{type:Number,min:1,max:100}
  },
},{timestamps:true});

const Image=models?.Image || model<IIMAGE>("Image",imageSchema)

export default Image;