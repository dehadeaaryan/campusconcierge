import mongoose, { Schema, Document, Model } from "mongoose";

// Define the document interface
export interface UniversityDocument extends Document {
    name: string;
}

export interface UniversityDTO {
    _id: string;
    name: string;
}

// Define the model interface for additional model-level methods (optional)
export interface UniversityModel extends Model<UniversityDocument> { }

// Define the schema
const UniversitySchema = new Schema<UniversityDocument>({
    name: { type: String, required: true, unique: true },
});

// Helper function to initialize the model safely
function getUniversityModel(): UniversityModel {
    // If the model is already created, return it directly
    return (mongoose.models.University as UniversityModel) ||
        mongoose.model<UniversityDocument, UniversityModel>("University", UniversitySchema);
}

// Export the initialized model
const University = getUniversityModel();
export default University;
