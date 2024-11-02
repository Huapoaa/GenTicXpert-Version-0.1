"use client";

import "../globals.css";
import { Josefin_Sans } from 'next/font/google';
import React, { useState } from 'react';
import axios from 'axios';
import { setCookie } from "cookies-next";

const server = 'http://localhost:8765/API/register';

const inter = Josefin_Sans({
  weight: "700",
  subsets: ["latin"],
  display: 'swap',
});

type Props = {
  params: { slug: string };
}

export default function Signup({ params }: Props) {
  const { slug } = params;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const register = async () => {
    console.log(username);
    console.log(password);
    console.log(email);

    try {
      const response = await axios.post(server, {
        Username: username,
        Password: password,
        Email: email,
      });
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setCookie('username', username, { path: '/' });
        console.log('Registration success');
        setSuccessMessage('ลงทะเบียนสำเร็จ');
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const change_username = (e: any) => {
    setUsername(e.target.value);
  }
  const change_password = (e: any) => {
    setPassword(e.target.value);
  }
  const change_email = (e: any) => {
    setEmail(e.target.value);
  }

  return (
    <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline '>
      <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md">
        <div className={inter.className}>
          <div className="flex justify-center h-32 items-center">
            <h1 className=" text-black text-4xl text-center justify-center pt-5 font-extrabold"> Sign up</h1>
          </div>
          <div className="flex justify-center h-24 -m-5">
            <h4 className=" text-2xl text-center justify-center text-gray-500 font-sans"> เชิญลงทะเบียน GenTikXPert</h4>
          </div>
        </div>
        <div className=" h-72 w-auto">
          <h5 className="text-gray-800 px-28 font-bold">Username: </h5>
          <div className="px-20 py-2 flex justify-center">
            <input className="shadow appearance-none border rounded w-11/12 py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Much" onChange={change_username} />
          </div>
          <h5 className="text-gray-800 px-28 font-bold pt-3">Password: </h5>
          <div className="px-20 flex justify-center">
            <input type="password" className="shadow appearance-none border rounded w-11/12 py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="***********" onChange={change_password} />
          </div>
          <h5 className="text-gray-800 px-28 font-bold pt-3">Email: </h5>
          <div className="px-20 flex justify-center">
            <input type="text" className="shadow appearance-none border rounded w-11/12 py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Wisitsak170@gmail.com" onChange={change_email} />
          </div>
          <div className="py-6 flex justify-center">
            <button className="border border-red-white px-[365px] py-2 bg-blue-500 rounded-md hover:bg-blue-600" onClick={register}> Register</button>
          </div>
          {successMessage && (
            <div className="flex justify-center">
              <h5 className="text-green-500">{successMessage}</h5>
            </div>
          )}
          <div className="flex justify-center">
            <h5 className="text-black">ไปหน้า Login</h5>
            <h5 className="text-violet-400 cursor-pointer font-bold" onClick={() => window.location.href = '/login'}> &nbsp;Login</h5>
          </div>
        </div>
      </div>
    </div>
  )
}