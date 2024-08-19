"use client";

import { ThemeProvider } from "@emotion/react";
import { Article, Folder, Input } from "@mui/icons-material";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, createTheme } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import MenuBar from "../components/MenuBar";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4d1979',
        },
        secondary: {
            main: '#a3a9ac',
        },
    },
});

const links = [
    {
        name: 'Waits 24-25',
        href: 'https://drive.google.com/drive/folders/1QscELOACQey96YqlGjFe0_hcdxMNClpB',
        type: 'folder',
    },
    {
        name: 'Desk Log',
        href: 'https://drive.google.com/drive/folders/1srePOEnQiAtuHU-TjSv_gnmLP5DwN2KP',
        type: 'folder',
    },
    {
        name: 'Desk Schedule',
        href: 'https://docs.google.com/spreadsheets/d/1gNpgUmYTXw2PEtiJ2N79hncad2UrbQU9-fZXSF7A_jA/edit?gid=1294129040#gid=1294129040',
        type: 'file',
    },
    {
        name: 'Desk Time Entry Form',
        href: 'https://forms.gle/3tsud57wDMkydJJR7',
        type: 'form',
    },
    {
        name: 'Keys',
        href: 'https://docs.google.com/spreadsheets/d/15TlYanszLAsBbaLatY3uNB0g9imGyFHLIsmlUhLrh1k/edit?gid=130349070#gid=130349070',
        type: 'file',
    },
    {
        name: 'Waits Master Roster',
        href: 'https://docs.google.com/spreadsheets/d/1gc2c0TccfN0ZFjpQVicH85b4HKUBxDJBI2lL2bq_qYY/edit?gid=507813403#gid=507813403',
        type: 'file',
    },
    {
        name: 'Staff Information',
        href: 'https://docs.google.com/spreadsheets/d/1clvG5qAVnyobMtMf-jEIZ3OfogeqQ5syIkwuoKt8Qy0/edit?usp=sharing',
        type: 'file',
    },
    {
        name: 'Community Experiences Calendar',
        href: 'https://docs.google.com/spreadsheets/d/1wu0kwi4wA5bfP_QIBRTa4bRxUmHCtANGli1KMB_SxdY/edit?usp=drive_link',
        type: 'file',
    },
    {
        name: 'Desk Inventory',
        href: 'https://docs.google.com/spreadsheets/d/1Rbc80_JGILLwtbLjI5ex4-6aGS1NI45leZ68yKuOMpU/edit?usp=drive_link',
        type: 'file',
    },
    {
        name: 'Closet Inventory',
        href: 'https://docs.google.com/spreadsheets/d/1Dby3PF8Yh8IIaI3ssJUNWzFn84Q3deRQQzYCEhxdHBI/edit?usp=drive_link',
        type: 'file',
    },
    {
        name: 'Deliveries',
        href: 'https://docs.google.com/spreadsheets/d/1OhwRoOU-3nVPU0JtxPAzVNn7LkgR_lJMIzSPrjO3cCY/edit?usp=drive_link',
        type: 'file',
    },
    {
        name: 'Equipment Checkout Form',
        href: 'https://forms.gle/RHinLoDnCRH4RCLA6',
        type: 'form',
    },
    {
        name: 'Equipment Return Form',
        href: 'https://forms.gle/weDjsxeKnaDJKgdS6',
        type: 'form',
    },
]

export default function Page() {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <main className="flex min-h-screen flex-col items-center">
                    <MenuBar />
                    <List sx={{ width: '100%' }}>
                        {links.map((link) => (
                            <ListItem key={link.name} sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                                <ListItemAvatar>
                                    <Link href={link.href} >
                                        <Avatar>
                                            {
                                                link.type === 'folder' ?
                                                    <Folder />
                                                    : link.type === 'file' ?
                                                        <Article />
                                                        :
                                                        <Input />}
                                        </Avatar>
                                    </Link>
                                </ListItemAvatar>
                                <ListItemText primary={link.name} secondary={link.href} onClick={() => { location.href = link.href }} />
                            </ListItem>
                        ))}
                    </List>
                </main>
            </ThemeProvider>
        </React.StrictMode>
    )
}