import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shubranshu Shekhar | Software Engineer & AI Engineer",
  description:
    "Building software, intelligent systems, and products that solve real problems.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Shubranshu Shekhar | Software Engineer & AI Engineer",
    description:
      "Building software, intelligent systems, and products that solve real problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
