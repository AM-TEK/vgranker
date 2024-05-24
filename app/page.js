"use client";

import VideoGameList from '../components/VideoGameList';

export default function Home() {
  return (
    <div className="bg-gradient-grid bg-cover bg-no-repeat">
      <h1 className="p-8 text-3xl font-bold text-center text-white">Video Game Ranker</h1>
      <VideoGameList />
    </div>
  );
}