"use client";

import "../globals.css";
import { Josefin_Sans } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import { getCookie } from "cookies-next";

const inter = Josefin_Sans({
  weight: "700",
  subsets: ["latin"],
  display: 'swap',
});

type Props = {
  params: { slug: string };
}

export default function Home({ params }: Props) {
  const { slug } = params;
  const [username, setUsername] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on the client side
    setIsMounted(true);
    const user = getCookie('username') as string;
    if (user) setUsername(user);
  }, []);

  if (!isMounted) {
    return (
      <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline'>
        <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
          <div className="flex justify-center items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
            <h1 className="inline-block align-middle font-sans italic">
              Loading...
            </h1>
          </div>
        </div>     
      </div>
    );
  }

  return (
    <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline'>
      <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
        <div className="flex-col justify-center items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
          <div className="text-center">
            <h1 className="inline-block align-middle font-sans italic mt-60 ml-4">
              {username ? `ยินดีต้อนรับ ${username}` : 'Welcome'}
            </h1>
          </div>
          <button className="btn w-64 rounded-full mt-4 ml-96" onClick={() => { window.location.href = "/generate" }}>
              ไปหน้าสร้าง Generative AI กันเลย
            </button>
        </div>
      </div>     
    </div>
  );
}
