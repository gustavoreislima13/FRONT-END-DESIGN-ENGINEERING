import type { Metadata } from "next";

export const metadata: Metadata = {
title: "Agendamentto",
description: "Generated by create next app",
};

export const viewport = {
initialScale: 1.0,
width: "device-width",
colorScheme: "light",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return <div>{children}</div>;
}