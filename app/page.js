"use client";

import VideoGameList from '../components/VideoGameList';

export default function Home() {
  return (
    <div className="bg-no-repeat bg-cover bg-gradient-grid">
      {/* <h1 className="p-8 text-3xl font-bold text-center text-white">Video Game Ranker</h1> */}
      <VideoGameList />
    </div>
  );
}