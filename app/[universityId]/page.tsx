'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HallDTO } from "../models/Hall";
import { fetchHalls, addHall } from "../actions/hall";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import Container from "../components/base/Container";

interface UniversityPageProps {
    params: { universityId: string };  // This gets the universityId from the URL params
}

export default function UniversityPage({ params }: UniversityPageProps) {
    const { universityId } = params;
    const [halls, setHalls] = useState<HallDTO[]>([]);
    const [newHallName, setNewHallName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Fetch halls data for the given universityId
    const loadHalls = async () => {
        try {
            setLoading(true);
            const fetchedHalls = await fetchHalls(universityId);
            setHalls(fetchedHalls);
        } catch (err) {
            setError("Failed to load halls.");
        } finally {
            setLoading(false);
        }
    };

    // Handle hall creation
    const handleAddHall = async () => {
        if (!newHallName.trim()) return;

        try {
            setLoading(true);
            // Use the server-side addHall function to add the hall
            const newHall = await addHall(newHallName, universityId);
            // Reload halls after adding a new one
            setHalls((prevHalls) => [...prevHalls, newHall]);
            setNewHallName(""); // Reset the input field
        } catch (err) {
            setError("Failed to add hall.");
        } finally {
            setLoading(false);
        }
    };

    // Load halls initially when the page is rendered
    useEffect(() => {
        loadHalls();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box className={"flex flex-col gap-8 p-16 w-full"}>
                <Typography textAlign={"center"} variant="h3" gutterBottom>Halls</Typography>

                {/* Display error message if any */}
                {error && <Typography color="error">{error}</Typography>}

                {/* Display halls if available */}
                {halls.length > 0 ? (
                    <ul>
                        {halls.map((hall) => (
                            <li key={hall._id}>
                                <Button
                                    component="a"
                                    href={`/${universityId}/${hall._id}`}
                                    variant="text"
                                    color="secondary"
                                >
                                    {hall.name} Hall
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        No halls found for this university. You can add one below:
                    </Typography>
                )}

                {/* Form to add a new hall */}
                <Box className="flex flex-col gap-2 bg-white p-4">
                    <TextField
                        label="New Hall Name"
                        color="primary"
                        variant="outlined"
                        fullWidth
                        value={newHallName}
                        onChange={(e) => setNewHallName(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddHall}
                        disabled={loading || !newHallName.trim()}
                        fullWidth
                    >
                        Add Hall
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
