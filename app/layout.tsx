import "./globals.css";
import Sidebar from "./sidebar/page";
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 


{
  return (
    <html>
    <body>
      <div className="h-screen flex flex-row justify-start">
        <Sidebar/>
        <div className="bg-indigo-800 flex-1 p-4 text-white">
            <main>{children}</main>
        </div>
      </div>
    </body>
    </html>
  );
}
