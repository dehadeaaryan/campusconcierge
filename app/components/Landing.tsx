'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UniversityDTO } from "../models/University";
import { Select, MenuItem, FormControl, InputLabel, Button, Typography, SelectChangeEvent } from "@mui/material";

export default function Landing({ universities }: { universities: UniversityDTO[] }) {
    const router = useRouter();
    const [selectedUniversity, setSelectedUniversity] = useState<string>("");

    const handleUniversityChange = (e: SelectChangeEvent<string>) => {
        const universityId = e.target.value as string;
        setSelectedUniversity(universityId);
        router.push(`/${universityId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <section className="flex flex-col items-center justify-center text-center py-12 px-4">
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Campus Concierge
                </Typography>
                <Typography variant="body1" paragraph>
                    A front desk log for simple community management.
                </Typography>
            </section>

            <Typography variant="h5" component="h3" gutterBottom>
                Select Your University
            </Typography>

            <FormControl fullWidth variant="filled" className="bg-white">
                <InputLabel>University</InputLabel>
                <Select
                    value={selectedUniversity}
                    onChange={handleUniversityChange}
                    label="University"
                    className="border rounded p-2"
                >
                    <MenuItem value="">
                        <em>Select a university</em>
                    </MenuItem>
                    {universities.map((uni) => (
                        <MenuItem key={uni._id} value={uni._id}>
                            {uni.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
