import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata = {
  title: "VG-Ranker",
  description: "Video Game Ranker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={orbitron.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
