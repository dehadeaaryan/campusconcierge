import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Hall document interface
export interface HallDocument extends Document {
    name: string;
    universityId: mongoose.Types.ObjectId;
}

// Define the DTO interface for halls
export interface HallDTO {
    _id: string;
    name: string;
    universityId: string;
}

// Define the Hall model interface
export interface HallModel extends Model<HallDocument> { }

// Define the Hall schema
const HallSchema = new Schema<HallDocument>({
    name: { type: String, required: true },
    universityId: { type: Schema.Types.ObjectId, ref: "University", required: true },
});

// Create the Hall model
const Hall = (mongoose.models.Hall as HallModel) || mongoose.model<HallDocument, HallModel>("Hall", HallSchema);

export default Hall;
