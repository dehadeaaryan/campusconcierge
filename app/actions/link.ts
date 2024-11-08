'use server';

import dbConnect from "../lib/mongodb";
import Link, { LinkDTO } from "../models/Link";

// Fetch links for a given university and hall
export async function fetchLinks(universityId: string, hallId: string): Promise<LinkDTO[]> {
    await dbConnect();

    const links = await Link.find({ universityId, hallId }).lean();

    return links.map(link => ({
        _id: (link._id as unknown as string).toString(),
        title: link.title,
        url: link.url,
        universityId: link.universityId.toString(),
        hallId: link.hallId.toString(),
    }));
}

export async function addLink(title: string, url: string, universityId: string, hallId: string): Promise<LinkDTO> {
    await dbConnect();

    const newLink = new Link({
        title,
        url,
        universityId,
        hallId,
    });

    const savedLink = await newLink.save() as unknown as LinkDTO;

    return {
        _id: savedLink._id.toString(),
        title: savedLink.title,
        url: savedLink.url,
        universityId: savedLink.universityId.toString(),
        hallId: savedLink.hallId.toString(),
    };
}
