"use client"

import "../globals.css";
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { RiLoginBoxLine, RiVoiceprintFill } from "react-icons/ri";
import { setCookie, getCookie } from "cookies-next";
import { Josefin_Sans } from 'next/font/google'

const inter = Josefin_Sans({
    weight: "400",
    subsets: ["latin"],
    display: 'swap',
})

type Props = {}

const logout = async () => {
    setCookie('token', '', { path: '/' })
    console.log('logout success')
    window.location.href = '/login'
}

export default function Sidebar({ }: Props) {
    const [ToggleCollapse, setToggleCollapse] = useState(false)
    const [pages, setPage] = useState(1)
    const [tokken, setTokken] = useState('')

    useEffect(() => {
        const token = getCookie('token') || ''
        setTokken(token)
    }, [])

    const Menu = [
        {
            index: 1,
            title: "Home",
            link: "/home/"
        },
        {
            index: 2,
            title: "Content",
            link: "/generate/"
        },
        {
            index: 3,
            title: "Video",
            link: "/video/"
        },
        {
            index: 4,
            title: "login",
            link: "/login/"
        },
        {
            index: 5,
            title: "History Log",
            link: "/history/"
        }
    ]

    return (
        <div className={`flex h-screen ${ToggleCollapse ? "w-72" : "w-16"} px-4 pt-8 pb-4 bg-white justify-between flex-col shadow-2xl duration-300`}>
            <div className={`flex flex-col`}>
                <div className={`flex items-center justify-between relative`}>
                    <div className={`flex item-center pl-1 gap-4 cursor-pointer`} onClick={() => { window.location.href = '/' }}>
                        <AiOutlineAppstoreAdd className={`text-4xl text-indigo-500 ${ToggleCollapse && "rotate-[360deg]"} duration-1000`} />
                        <span className={`text-3xl font-mono ${!ToggleCollapse && "scale-0"} duration-200`}>GenTicXPert</span>
                    </div>
                    <div className={`${!ToggleCollapse ? "absolute" : "flex"} ${!ToggleCollapse ? "ml-10" : "ml-5"}`}>
                        <BsArrowRightShort className={`text-2xl border border-indigo-800 hover:bg-gray-100 cursor-pointer rounded-full bg-white -right-2 top-3 ${ToggleCollapse && "rotate-180"} duration-500`} onClick={() => { setToggleCollapse(!ToggleCollapse) }} />
                    </div>
                </div>
                <div className='pt-2'>
                    {
                        Menu.map((menu) => (
                            <React.Fragment key={menu.index}>
                                {(!tokken && menu.title === "login") && (
                                    <Link href={`${menu.link}`}>
                                        <li key={menu.index} className='text-gray-800 text-1xl flex items-center gap-x-7 cursor-pointer p-2 hover:bg-indigo-200'>
                                            <span className='block float-left'>{menu.title === "login" ? <RiLoginBoxLine className='text-xl' /> : menu.title === "Generate video" ? <RiVoiceprintFill className='text-xl' /> : <MdDashboard className='text-xl' />}</span>
                                            <span className={`rounded-md ${!ToggleCollapse && "scale-0"}`}>{menu.title}</span>
                                        </li>
                                    </Link>
                                )}

                                {(tokken && menu.title !== "login") && (
                                    <Link href={`${menu.link}`}>
                                        <li key={menu.index} className='text-gray-800 text-1xl flex items-center gap-x-7 cursor-pointer p-2 hover:bg-indigo-200'>
                                            <span className='block float-left'>{menu.title === "login" ? <RiLoginBoxLine className='text-xl' /> : menu.title === "Generate video" ? <RiVoiceprintFill className='text-xl' /> : <MdDashboard className='text-xl' />}</span>
                                            <span className={`rounded-md ${!ToggleCollapse && "scale-0"}`}>{menu.title}</span>
                                        </li>
                                    </Link>
                                )}
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
            <div>
                {tokken && (
                    <ul className='pt-2'>
                        <li className='text-white text-1xl flex items-center gap-x-7 cursor-pointer p-2 bg-red-500' onClick={logout} key="logout">
                            <span className='block float-left'><RiLoginBoxLine className='text-xl' /></span>
                            <span className={`rounded-md ${!ToggleCollapse && "scale-0"}`}>Logout</span>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}