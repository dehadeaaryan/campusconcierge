import mongoose, { Schema, Document, Model, model } from "mongoose";

// Define the Link document interface
export interface LinkDocument extends Document {
    title: string;
    url: string;
    hallId: mongoose.Types.ObjectId;
    universityId: mongoose.Types.ObjectId;
}

// Define the DTO interface for links
export interface LinkDTO {
    _id: string;
    title: string;
    url: string;
    universityId: string;
    hallId: string;
}

// Define the Link model interface
export interface LinkModel extends Model<LinkDocument> { }

// Define the Link schema
const LinkSchema = new Schema<LinkDocument>({
    title: { type: String, required: true },
    url: { type: String, required: true },
    hallId: { type: Schema.Types.ObjectId, ref: "Hall", required: true },
    universityId: { type: Schema.Types.ObjectId, ref: "University", required: true }
});

function getLinkModel(): LinkModel {
    // If the model is already created, return it directly
    return (mongoose.models.Link as LinkModel) ||
        mongoose.model<LinkDocument, LinkModel>("Link", LinkSchema); // Use "Link" as the model name here
}

// Create the Link model
const Link = getLinkModel();

export default Link;
