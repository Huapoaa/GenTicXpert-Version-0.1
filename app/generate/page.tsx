"use client";

import "../globals.css";
import { Josefin_Sans } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getCookie } from "cookies-next";

const inter = Josefin_Sans({
  weight: "700",
  subsets: ["latin"],
  display: 'swap',
})

export default function Generate() {
  const instrunction = [
    {
      index: 1,
      title: 'เขียนสคริปต์วิดิโอรีวิวเครืองสำอาง',
      code: 'cos'
    },
    {
      index: 2,
      title: "เรื่องเล่าวิทยาศาสตร์(Sci-fi)",
      code: 'sci-fi'
    },
    {
      index: 3,
      title: "สคริปต์วิดิโอ Podcast (Sci-fi)",
      code: 'sci-fi'
    },
  ]
  
  const [SelectTopic, setSelectTopic] = useState('เรื่องเล่าวิทยาศาสตร์(Sci-fi)')
  const [Data, setData] = useState('')
  const [temperature, setTemperature] = useState(1.0)
  const [pathAudio, setPathAudio] = useState('')
  const [showAudio, setShowAudio] = useState(false)
  const [pathVideo, setPathVideo] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    const storedUserId = getCookie('userId') as string;
    const storedUsername = getCookie('username') as string;
    if (storedUserId) setUserId(storedUserId);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const processText = (text: string) => {
    return text.replace(/[#?:*$]/g, '');
  };

  const getInstructionCode = (title: string) => {
    const instruction = instrunction.find(item => item.title === title);
    return instruction ? instruction.code : 'sci-fi'; // default to sci-fi if not found
  };

  const saveUserData = async () => {
    try {
      const response = await axios.post('http://localhost:8765/API/Save_Story', {
        username: username,
        instruction: getInstructionCode(SelectTopic),
        date: new Date()
      });
      console.log('Data saved:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const Description = async () => {
    try {
      setShowAudio(false);
      const result = await axios.post('http://localhost:8000/generate', { 
        content: SelectTopic, 
        temperature 
      });
      const processedResponse = processText(result.data.choices[0].message.content);
      setData(processedResponse);
      
      // Save user data with hashtag
      const response = await axios.post('http://localhost:8765/API/Save_Story', {
        username: username,
        instruction: getInstructionCode(SelectTopic),
        Hashtag: SelectTopic === "เรื่องเล่าวิทยาศาสตร์(Sci-fi)" ? "Science Fiction (Sci-fi)" : 
                 SelectTopic === "รีวิวเครื่องสำอาง" ? "Cosmetic Review" : "",
        date: new Date()
      });
      
      console.log('Data saved:', response.data);
    } catch (error) {
      console.error('Error:', error);   
      setData('An error occurred while generating the response.');
    }   
  }
  

  const AudioGenerate = async () => {
    try {
      const result = await axios.post('http://localhost:8765/API/CreateAudio', { content: Data });
      setPathAudio(result.data.audioPath);
      setTimeout(() => {
        setShowAudio(true);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);   
      setData('Cannot generate audio from the given text.');
    }   
  }

  return (
    <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline'>
      <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
        <div className="">
          <h1 className="text-center py-4 text-2xl font-bold">ระบบสร้างเนื้อหาด้วย Generative AI</h1>
        </div>
        <div className="m-2 h-5/6 justify-center items-center flex">
          <div className="h-5/6 w-1/4">
            <h1 className="text-3 py-2 px-2 font-bold">Instruction</h1>
            <>
              {instrunction.map((item) => (
                <div 
                  className="border border-black m-1 p-1 cursor-pointer rounded-md" 
                  key={item.index}
                  onClick={() => setSelectTopic(item.title)}
                >
                  <h1>{item.title}</h1>
                </div>
              ))}
            </>
          </div>
          <div className="h-5/6 w-8/12 mx-3">
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                className="flex-1 border border-black p-2 rounded-md" 
                placeholder="Enter Header" 
                value={SelectTopic}
                onChange={(e) => setSelectTopic(e.target.value)}
              />
              <select 
                className="w-32 p-2 rounded-md bg-indigo-500 text-white"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              >
                <option value={0.5}>0.5</option>
                <option value={1.0}>1.0</option>
                <option value={1.5}>1.5</option>
                <option value={2.0}>2.0</option>
              </select>
              <button 
                className="w-32 p-2 rounded-md bg-indigo-500 text-white" 
                onClick={Description}
              >
                สร้างเนื้อหา
              </button>
            </div>
            
            <div className="h-5/6">
              <textarea 
                value={Data} 
                onChange={(e) => setData(e.target.value)}
                className="border border-black p-2 w-full h-5/6 rounded-md" 
                placeholder="Enter Description" 
                style={{ resize: "none" }}
              />
              <div className="justify-between flex mt-2">
                <button 
                  onClick={async () => {
                    await AudioGenerate();
                    alert("สร้างเสียงสำเร็จ");
                  }} 
                  className="btn w-32 rounded-full"
                >
                  สร้างเสียง
                </button>
                <button 
                  className="p-2 w-3/12 rounded-md bg-indigo-500 text-white transition 
                  ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-black-500 duration-300 ..." 
                  onClick={() => { window.location.href = "/video" }}
                >
                  สร้างวิดิโอ AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}