import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Radio_Canada, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";
import Providers from "@/components/Providers";

const fontStyle = Inter({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "DiscussHub",
    description: "A modified discussion platform using Nextjs and TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn("bg-white text-slate-900 antialiased", fontStyle.className)}>
            <body className="min-h-screen pt-12 bg-slate-50 antialiased">
                <Providers>
                    {/* @ts-expect-error Server Component */}
                    <Navbar />
                    <div className="container max-w-7xl mx-auto h-full pt-12">{children}</div>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
