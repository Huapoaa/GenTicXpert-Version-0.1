"use client";

import "../globals.css";
import { Josefin_Sans } from 'next/font/google'
import React, { useState } from 'react'
import axios from 'axios'
import { setCookie } from "cookies-next";
import { redirect } from "next/dist/server/api-utils";

const sever = 'http://localhost:8765/API/login'

const inter = Josefin_Sans({
  weight: "700",
  subsets: ["latin"],
  display: 'swap',
})


type Props = {
  params: { slug: string };
}

export default function Login({params}: Props) {
  const { slug } = params;
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  const login = async () => {
    console.log(username)
    console.log(password)

    //fetch data from the server port : 8765 using axios
    const response = await axios.post('http://localhost:8765/API/login', {
      username: username,
      password: password
    }).then((response) => {
      const data = response.data
      console.log(data)
      if(data.status === 'success'){
        //console.log(username, password)
        setCookie('token', data.token, {path: '/'})
        setCookie('username', username, {path: '/'})
        console.log('login success')
        window.location.href = '/home'
    }
         }   
    ).catch((error) => {
      console.log(error)
    })
  }

  const change_username = (e: any) => {
    setUsername(e.target.value)
  }
  const change_password = (e: any) => {
    setPassword(e.target.value)
  }

  
  return ( 
    <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline '>
      <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md">
             <div className={inter.className}>
                <div className="flex justify-center h-32 items-center">
                          <h1 className=" text-black text-4xl text-center justify-center pt-5 font-extrabold"> LOGIN</h1>
                </div>
                <div className="flex justify-center h-24 -m-5">
                          <h4 className=" text-2xl text-center justify-center text-gray-500 font-sans"> เข้าสู่ระบบ GenTikXPert</h4>
                </div>       
              </div>
              <div className=" h-72 w-auto">
                    <h5 className="text-gray-800 px-28 font-bold">Username: </h5>
                    <div className="px-20 py-2 flex justify-center">
                      <input className="shadow appearance-none border rounded w-11/12 py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Example" onChange={(e) => {
                        change_username(e)
                      }}/>
                    </div>
                    <h5 className="text-gray-800 px-28 font-bold pt-3">Password: </h5>
                    <div className="px-20 flex justify-center">
                      <input type="password" className="shadow appearance-none border rounded w-11/12 py-3 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password"  placeholder="***********" onChange={(e) => {
                        change_password(e)
                      }}/> 
                    </div>
                    {/* <div className="h-6 flex py-2">
                      <h6 className="text-violet-500 hover:text-violet-900  px-32 text-xs cursor-pointer font-semibold">Forgot Password ?</h6>
                    </div> */}
                    <div className="py-6 flex justify-center">
                      <button className="border border-red-white px-[365px] py-2 bg-blue-500 rounded-md hover:bg-blue-600" onClick={login}> Login</button>
                    </div>
                    <div className="flex justify-center">
                        <h5 className="text-black">ลงทะเบียนไม่มีสมาชิก</h5>
                        <h5 
                          className="text-violet-400 cursor-pointer font-bold" 
                          onClick={() => window.location.href = '/signup'}
                        >
                          &nbsp;sign up
                        </h5>
                    </div>
              </div>
      </div>     
    </div>
  )
}