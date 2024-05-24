"use client";

import VideoGameList from '../components/VideoGameList';

export default function Home() {
  return (
    <div className='bg-gray-500'>
      <h1 className="p-8 text-3xl font-bold text-center">Video Game Ranker</h1>
      <VideoGameList />
    </div>
  );
}