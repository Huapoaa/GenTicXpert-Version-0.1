'use client'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { getCookie } from "cookies-next"; // Add this import

interface Hashtag {
  no: number;
  hashtag: string;
  view: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]); // Initialize with an empty array
  const [selectedOption, setSelectedOption] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [username, setUsername] = useState<string>(''); // Add username state
  
  
  // Fetch hashtags when the selected option changes
  useEffect(() => {
    if (selectedOption === "option2") {
        fetchHashtags_cosmetics();
    } else if (selectedOption === "option3") {
        fetchHashtags();
    }
  }, [selectedOption]);

    // Add useEffect to get username from cookies when component mounts
    useEffect(() => {
      const storedUsername = getCookie('username') as string;
      if (storedUsername) {
        setUsername(storedUsername);
        console.log('Username from cookie:', storedUsername);
      }
    }, []);

  const fetchHashtags = async () => {
    try {
      const response = await fetch('http://localhost:8765/api/hashtags/sci-fi');
      if (response.ok) {
        const data = await response.json();
        setHashtags(data.hashtags);
      } else {
        console.error('Failed to fetch hashtags');
      }
    } catch (error) {
      console.error('Error fetching hashtags:', error);
    }
  };

  const fetchHashtags_cosmetics = async () => {
    try {
      const response = await fetch('http://localhost:8765/api/hashtags/cosmetics');
      if (response.ok) {
        const data = await response.json();
        setHashtags(data.hashtags); // Ensure this matches the backend response format
      } else {
        console.error('Failed to fetch hashtags');
      }
    } catch (error) {
      console.error('Error fetching hashtags:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedAudioFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:8765/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Image uploaded successfully: ${data.fileUrl}`);
      } else {
        alert('Image upload failed!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image!');
    }
  };

  const handleAudioUpload = async () => {
    if (!selectedAudioFile) {
      alert("Please select an audio file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append('audio', selectedAudioFile);
  
    try {
      const response = await fetch('http://localhost:8765/api/upload-audio', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`Audio uploaded successfully: ${data.fileUrl}`);
      } else {
        alert('Audio upload failed!');
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      alert('Error uploading audio!');
    }
  };

  const handleGenerateVideo = async () => {
    try {
      const response = await fetch('http://localhost:8765/api/generate-video', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setVideoUrl(data.videoUrl);
      } else {
        alert('Video generation failed!');
      }
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Error generating video!');
    }
  };

 // Update the handleOptionChange function
 const handleOptionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedOption(value);
  
  if (value === "option2" || value === "option3") {
    const hashtag = value === "option2" ? "รีวิวเครื่องสำอาง" : "เรื่องเล่าวิทยาศาสตร์(Sci-fi)";
    
    try {
      const response = await fetch('http://localhost:8765/API/Update_Hashtag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // Now using the username from cookies
          hashtag: hashtag
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update hashtag');
      }

      console.log('Hashtag updated successfully for user:', username);
      
      // Fetch appropriate hashtags based on selection
      if (value === "option2") {
        fetchHashtags_cosmetics();
      } else if (value === "option3") {
        fetchHashtags();
      }
    } catch (error) {
      console.error('Error updating hashtag:', error);
    }
  }
};
  


  return (
    <div className='flex justify-center border border-black h-screen -m-4 items-center shadow-outline'>
      <div className="border border-red-50 items-center min-w-[1000px] h-5/6 bg-gray-100 rounded-md text-black">
        <div>
          <h1 className="text-center py-4 text-2xl font-bold">Export Video</h1>
        </div>
        
        <div className="m-2 h-5/6 flex justify-between items-stretch">
          {/* First section */}
          <div className="w-1/3 p-2 flex flex-col justify-center items-center">
            <div className="w-full mb-4 text-center">
              <h1 className="text-lg py-2 px-2 font-bold">รูปภาพ</h1>
              <input className='ml-20' type="file" onChange={handleFileChange} />
              <button className="p-2 w-32 rounded-md bg-indigo-500 text-white mx-auto mt-2" onClick={handleUpload}>อัพโหลดรูปภาพ</button>
            </div>

            <div className="w-full mt-8 text-center">
              <h1 className="text-lg py-2 px-2 font-bold">Audio</h1>
              <input className='ml-20' type="file" onChange={handleAudioFileChange} accept="audio/*" />
              <button className="p-2 w-32 rounded-md bg-indigo-500 text-white mx-auto mt-2" onClick={handleAudioUpload}>อัพโหลดเสียง</button>
            </div>
          </div>
          
          {/* Second section (Video) */}
          <div className="w-1/3 p-2 flex flex-col justify-center items-center">
            {videoUrl ? (
              <video 
                ref={videoRef}
                className="max-w-full h-auto" 
                controls 
                key={videoUrl} // Add a key to force re-render when URL changes
              >
                <source src={videoUrl} type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>ยังไม่ได้สร้างวิดิโออวตาร์</p>
            )}
            <button className="p-2 w-32 mt-12 rounded-md bg-red-500 text-white mx-auto" onClick={handleGenerateVideo}>สร้างอวตาร์ AI</button>
          </div>
          
          {/* Third section */}
          <div className="w-1/3 p-2 flex flex-col justify-start items-center">
            <h1 className="text-lg py-2 px-2 font-bold">Hashtag</h1>
            <select 
              className="mt-4 p-2 w-48 rounded-md bg-gray-200 text-black"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="option1">เลือก Hashtag</option>
              <option value="option2">รีวิวเครื่องสำอาง</option>
              <option value="option3">เรื่องเล่าวิทยาศาสตร์(Sci-fi)</option>
            </select>

            {/* Display hashtags */}
            {selectedOption === "option3" && hashtags && hashtags.length > 0 && (
              <div className="mt-4 w-full px-4 max-h-128 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Hashtags ยอดนิยม:</h2>
                <div className="space-y-2">
                  {hashtags.map((tag) => (
                    <div key={tag.no} className="bg-white p-3 rounded-lg shadow" >
                      <p className="text-sm font-medium">{tag.hashtag}</p>
                      <p className="text-xs text-gray-600">Views: {tag.view}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedOption === "option2" && hashtags && hashtags.length > 0 && (
              <div className="mt-4 w-full px-4 max-h-128 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Hashtags ยอดนิยม:</h2>
                <div className="space-y-2">
                  {hashtags.map((tag) => (
                    <div key={tag.no} className="bg-white p-3 rounded-lg shadow">
                      <p className="text-sm font-medium">{tag.hashtag}</p>
                      <p className="text-xs text-gray-600">Views: {tag.view}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}