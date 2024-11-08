"use client";

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuBar from "../MenuBar";

// Define the theme for the MUI components
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

// Define the Container component's props
interface ContainerProps {
    children: React.ReactNode;
}

// Container component to wrap pages with a consistent theme and navigation bar
export default function Container({ children }: ContainerProps) {
    return (
        <ThemeProvider theme={theme}>
            <main className="flex min-h-screen flex-col items-center">
                <MenuBar />
                {children}
            </main>
        </ThemeProvider>
    );
}
