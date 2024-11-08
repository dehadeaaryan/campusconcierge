'use server';

import dbConnect from "../lib/mongodb";
import University, { UniversityDTO } from "../models/University";

export async function fetchUniversities(): Promise<UniversityDTO[]> {
    await dbConnect();

    // Use `lean()` to return plain JavaScript objects and map to convert `_id` to a string
    const universities = await University.find({}).lean();

    // Transform the results to convert _id to a string
    const output = universities.map((university) => ({
        _id: university._id.toString(),
        name: university.name,
    }));

    return output;
}
