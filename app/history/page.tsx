"use client";
import "../globals.css";
import { Josefin_Sans } from 'next/font/google';
import React, { useState, useEffect } from 'react';
import { getCookie } from "cookies-next";
import axios from 'axios';

const inter = Josefin_Sans({
  weight: "700",
  subsets: ["latin"],
  display: 'swap',
});

interface UserData {
  _id: string;  // Add _id to interface
  username: string;
  instruction: string;
  Hashtag: string;
  date: string;
}

export default function History() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = getCookie('username') as string;
        if (storedUsername) {
          setUsername(storedUsername);
          const response = await axios.get(`http://localhost:8765/API/get_user_data/${storedUsername}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getInstructionDisplay = (code: string) => {
    switch(code) {
      case 'cos':
        return 'cos';
      case 'sci-fi':
        return 'sci-fi';
      default:
        return code;
    }
  };

  return (
    <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline'>
      <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
        <div className="block justify-center items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
          <div className="overflow-x-auto overflow-y-auto h-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>MongoDB ID</th>  {/* Add new column header */}
                  <th>Name</th>
                  <th>Instruction</th>
                  <th>Hashtag</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data, index) => (
                  <tr key={data._id}>  {/* Use _id as key instead of index */}
                    <td className="font-mono text-sm">{data._id}</td>  {/* Display MongoDB ID */}
                    <td>{data.username}</td>
                    <td>{getInstructionDisplay(data.instruction)}</td>
                    <td>{data.Hashtag}</td>
                    <td>{formatDate(data.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button 
            className="btn btn-block mt-8" 
            onClick={() => { window.location.href = "/dashboard" }}
          >
            ดูกราฟ
          </button>
        </div>
      </div>     
    </div>
  );
}