import type { Metadata } from "next";
import { Google_Sans_Code, Google_Sans_Flex } from "next/font/google";
import "./globals.css";

const flex = Google_Sans_Flex({
  variable: "--font-flex",
  subsets: ["latin"],
  axes: ["ROND", "wdth", "opsz"],
});

const code = Google_Sans_Code({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swati Tiwari — Full stack developer",
  description:
    "Software engineer building web apps end to end: Next.js and React on the front, Node.js, APIs and databases behind.",
};

// Applies the saved theme before first paint so there's no light/dark flash
const themeScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${flex.variable} ${code.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
