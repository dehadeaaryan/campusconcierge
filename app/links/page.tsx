"use client";

import { Folder } from "@mui/icons-material";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";

const links = [
    {
        name: 'desk log',
        href: 'https://drive.google.com/drive/folders/1QscELOACQey96YqlGjFe0_hcdxMNClpB',
        type: 'folder',
    },
]

export default function Page() {
    return (
        <div>
            <List sx={{ width: '100%' }}>
                {links.map((link) => (
                    <ListItem key={link.name}>
                        <ListItemAvatar>
                            <Link href={link.href} >
                                <Avatar>
                                    <Folder />
                                </Avatar>
                            </Link>
                        </ListItemAvatar>
                        <ListItemText primary={link.name} secondary={link.href} onClick={() => { location.href = link.href }} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}