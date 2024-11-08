'use client';

import { useEffect, useState } from "react";
import { Button, TextField, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box, CircularProgress } from "@mui/material";
import { addLink, fetchLinks } from "@/app/actions/link";
import { useRouter } from "next/navigation";
import { LinkDTO } from "@/app/models/Link";
import Link from "next/link";
import { Folder } from "@mui/icons-material";
import Container from "@/app/components/base/Container";

interface LinksPageProps {
    params: { universityId: string; hallId: string };
}

export default function LinksPage({ params }: LinksPageProps) {
    const { universityId, hallId } = params;
    const [links, setLinks] = useState<LinkDTO[]>([]);
    const [newLinkTitle, setNewLinkTitle] = useState("");
    const [newLinkUrl, setNewLinkUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Fetch the links data for the given universityId and hallId

    useEffect(() => {
        const loadLinks = async () => {
            try {
                setLoading(true);
                const fetchedLinks = await fetchLinks(universityId, hallId);
                setLinks(fetchedLinks);
            } catch (err) {
                setError("Failed to load links.");
            } finally {
                setLoading(false);
            }
        };
        loadLinks();
    }, [universityId, hallId]);

    const handleAddLink = async () => {
        if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;

        try {
            setLoading(true);
            // Here you'd normally make a request to the server to add a new link
            const newLink: LinkDTO = { _id: Date.now().toString(), title: newLinkTitle, url: newLinkUrl, universityId, hallId };
            addLink(newLink.title, newLink.url, newLink.universityId, newLink.hallId);
            setLinks((prevLinks) => [...prevLinks, newLink]);
            setNewLinkTitle("");
            setNewLinkUrl("");
        } catch (err) {
            setError("Failed to add link.");
        } finally {
            setLoading(false);
            console.log("not loading")
        }
    };

    if (loading) {
        console.log("loading")
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box sx={{ padding: 3 }}>
                <Typography textAlign={"center"} variant="h4" gutterBottom>
                    Important Links
                </Typography>

                {/* Display error message if any */}
                {error && <Typography color="error">{error}</Typography>}

                {/* Display links if available */}
                {links.length > 0 ? (
                    <List>
                        {links.map((link) => (
                            <ListItem key={link._id} className="bg-white text-black rounded-2xl" sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f4f4f4" } }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: "#4d1979" }}>
                                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                            <Avatar className="bg-[#4d1979]">
                                                <Folder />
                                            </Avatar>
                                        </Link>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={link.title}
                                    secondary={link.url}
                                    onClick={() => window.open(link.url, "_blank")}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        No links found for this hall.
                    </Typography>
                )}

                {/* Form to add a new link */}
                <Box sx={{ marginTop: 4 }} className="bg-white p-2">
                    <TextField
                        label="New Link Title"
                        variant="outlined"
                        fullWidth
                        value={newLinkTitle}
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                        disabled={loading}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="New Link URL"
                        variant="outlined"
                        fullWidth
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        disabled={loading}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddLink}
                        disabled={loading || !newLinkTitle.trim() || !newLinkUrl.trim()}
                        fullWidth
                    >
                        Add Link
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
