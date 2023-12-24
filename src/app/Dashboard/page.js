"use client";

import React from "react";

import Navbar from "../Components/DashboardSection/NavBAr";
import NavbarUnique from '../Navbar/page'



const Dashboard = () => {
  return (
    <div>
      <div className="w-full h-screen relative">
        <video
          autoPlay
          loop
          muted
          src="/video.mp4" // Update with the correct video path
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="w-full h-full bg-black opacity-50 absolute top-0 left-0"></div>
        <div className="w-full h-[1000px] absolute top-0 left-0">
         <NavbarUnique />
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
