"use client";

import * as React from 'react';
import MenuBar from "../MenuBar";
import { Button, createTheme } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import Link from 'next/link';
import Landing from '../Landing';
import { UniversityDTO } from '@/app/models/University';

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

export default function Home({ universities }: { universities: UniversityDTO[] }) {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <main className="flex min-h-screen flex-col items-center">
                    <MenuBar />
                    <section className="flex flex-col items-center justify-center text-center py-12 px-4">
                        <h1 className="text-4xl font-bold">Welcome to Campus Concierge</h1>
                        <p className="text-lg mt-4">A front desk log for simple community management. Only supporting Waits Hall at TCU</p>
                    </section>
                    <Link href={'/links'} ><Button variant="contained" color="primary">Links</Button></Link>
                    <Landing universities={universities} />
                </main>
            </ThemeProvider>
        </React.StrictMode>
    );
}