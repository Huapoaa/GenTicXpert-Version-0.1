"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface UserData {
  _id: string;
  username: string;
  instruction: string;
  Hashtag: string;
  date: string;
}

interface DayCount {
  name: string;
  sci: number;
  cos: number;
}

export default function Dashboard() {
  const [chartData, setChartData] = useState<DayCount[]>([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        // Get username from cookie
        const username = document.cookie
          .split('; ')
          .find(row => row.startsWith('username='))
          ?.split('=')[1];

        if (username) {
          const response = await axios.get<UserData[]>(`http://localhost:8765/API/get_user_data/${username}`);
          const userData = response.data;

          // Initialize counts for each day of the week
          const emptyCounts: DayCount[] = [
            { name: 'Sun', sci: 0, cos: 0 },
            { name: 'Mon', sci: 0, cos: 0 },
            { name: 'Tue', sci: 0, cos: 0 },
            { name: 'Wed', sci: 0, cos: 0 },
            { name: 'Thu', sci: 0, cos: 0 },
            { name: 'Fri', sci: 0, cos: 0 },
            { name: 'Sat', sci: 0, cos: 0 }
          ];

          // Process the data to count instructions by day
          userData.forEach(entry => {
            const date = new Date(entry.date);
            const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
            
            if (entry.instruction === 'sci-fi') {
              emptyCounts[dayIndex].sci += 1;
            } else if (entry.instruction === 'cos') {
              emptyCounts[dayIndex].cos += 1;
            }
          });

          setChartData(emptyCounts);
        }
      } catch (error) {
        console.error('Error fetching and processing data:', error);
      }
    };

    fetchAndProcessData();
    
    // Set up an interval to refresh data every minute
    const intervalId = setInterval(fetchAndProcessData, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full p-6 space-y-6 mt-20">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-gray-700 text-lg font-semibold">Activity Overview</h3>
          <p className="text-gray-500 text-sm">Weekly statistics</p>
        </div>
        
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280' }}
                stroke="#e5e7eb"
              />
              <YAxis 
                tick={{ fill: '#6b7280' }}
                stroke="#e5e7eb"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sci" 
                name="Sci-Fi"
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="cos" 
                name="Cosmetics"
                stroke="#82ca9d" 
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}