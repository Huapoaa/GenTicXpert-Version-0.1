"use client";
import React, { useState, useEffect } from 'react';
import { Lato } from 'next/font/google';
import { getCookie } from "cookies-next";

type Props = {};

const inter = Lato({
  weight: "700",
  subsets: ["latin"],
  display: 'swap',
});

export default function Page({ }: Props) {
  const [tokken, setTokken] = useState<string | null>(null);

  useEffect(() => {
    const storedTokken = getCookie('token');
    setTokken(storedTokken as string | null);
  }, []);

  return (
    <div className='flex justify-center h-screen -m-4 items-center'>
      <div className='h-5/6 max-w-[1000px] justify-center bg-white rounded-md'>
        <div className={`w-full ite h-24 items-center flex justify-center`}>
          <h1 className={`text-5xl text-black ${inter.className}`}>Welcome To GenTicXPert</h1>
        </div>
        <div className='h-14 flex items-end px-3 text-2xl'>
          <h1 className={`text-black ${inter.className}`}>About Us:</h1>
        </div>
        <div className='w-full ite h-62 py-4 px-3 text-black justify-center flex'>
          <p>
            We are Student in the exciting world of AI-powered video generation, transforming the static world of text into dynamic visual narratives. Imagine: crafting engaging explainer videos with just a script, creating product demos without filming actual footage, or bringing educational concepts to life with captivating animations – all through the magic of AI. Our technology empowers individuals and businesses of all sizes to unlock the potential of video storytelling, regardless of budget or technical expertise. With intuitive interfaces and powerful algorithms, we are democratizing video creation, making it accessible and efficient for everyone. Join us on this journey as we push the boundaries of creativity and reshape the way we communicate through the power of AI-generated video.
          </p>
        </div>
        <div>
          <h1 className={`text-2xl text-black ${inter.className} px-3`}>Made by:</h1>
          <div className='w-full h-12 py-4 text-black flex px-36 text-xl'>
            <p>MUCHIMA CHANPHANICH</p>
          </div>
        </div>
        <div className='w-full h-12 py-4 px-36 text-black flex text-xl'>
          <p>WISITSAK KAEMTA</p>
        </div>
        <div className='text-white h-36 flex items-center justify-center text-xl'>
          {!tokken && (
            <button
              className='bg-blue-500 hover:bg-blue-600 px-4 py-4 rounded-md'
              onClick={() => { window.location.href = '/login'; }}
            >
              Login เพื่อเข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}