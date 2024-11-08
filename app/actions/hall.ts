'use server';

import dbConnect from "../lib/mongodb";
import Hall, { HallDTO } from "../models/Hall";
import { Types } from "mongoose";

// Fetch halls for a specific university
export async function fetchHalls(universityId: string): Promise<HallDTO[]> {
    await dbConnect();

    // Ensure universityId is treated as an ObjectId
    const halls = await Hall.find({ universityId: new Types.ObjectId(universityId) }).lean();

    // Transform each document to convert _id to a string
    return halls.map((hall) => ({
        _id: hall._id.toString(),
        name: hall.name,
        universityId: hall.universityId.toString(),
    }));
}

// Add a new hall for a specific university
export async function addHall(name: string, universityId: string): Promise<HallDTO> {
    await dbConnect();

    // Create a new Hall document
    const newHall = new Hall({
        name,
        universityId: new Types.ObjectId(universityId),
    });

    // Save the new hall to the database
    const savedHall = await newHall.save() as unknown as HallDTO;

    // Return the saved hall as a DTO with transformed _id
    return {
        _id: savedHall._id.toString(),
        name: savedHall.name,
        universityId: savedHall.universityId.toString(),
    };
}
