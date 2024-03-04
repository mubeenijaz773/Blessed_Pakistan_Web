import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import connectDB from '@/utils/dbconnect'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLESSED PAKISTAN PROPERTIES",
  description: "Generated by create next app",
};



export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // await connectDB();

  return (
     <html lang="en">
     
      <body className={inter.className}>
         <main>
         {children}
         </main>
         </body>
     </html>
   )
 }

