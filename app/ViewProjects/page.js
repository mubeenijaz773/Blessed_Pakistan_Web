// pages/landing.js
"use client";
import React, { useState, useEffect , useCallback  } from "react";
import Select from "react-select";

import Navbarunique from "../Navbar/page";
import { cities } from "@/app/GetList";
import { GetAllProjects } from "@/app/action/projects";
import Footer from "../Footer/page";


// Define custom styles for the Select component
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "200px", // Adjust the width to match your input field
    height: "60px",
    paddingLeft: "6px",
    borderRadius: "6px",
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adjust the shadow
    outline: "none",
    border: "none",
    "&:hover": {
      borderColor: "transparent", // Hide border on hover if needed
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "gray", // Change the placeholder text color if needed
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "blue", // Change the dropdown indicator color if needed
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "blue", // Change the background color of the options on hover
      color: "white",
    },
  }),
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await GetAllProjects();
      if (response.status === 200) {
        setProjects(response.projects);
      } else if (response.status === 400) {
        setProjects([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Projects:", error);
      setProjects([]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    // Filter projects when the search query or selected city changes
    let filteredData = projects;

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCity) {
      filteredData = filteredData.filter((item) => item.city === selectedCity.value);
    }

    setFilteredProjects(filteredData);
  }, [searchQuery, selectedCity, projects]);

  // Options for the select dropdown
  const options = cities.map((city) => ({ value: city, label: city }));

  // Event handler to handle city selection
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="bg-gray-100 min-h-screen w-full">
       <Navbarunique />
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center "
        style={{ backgroundImage: 'url("/project.jpg")' }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Find New Projects in Pakistan
          </h1>
          <p className="text-lg text-white mt-2">
            Find exciting new real estate projects and investment opportunities
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-full ">
              <div className="flex  justify-center gap-8">
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={options}
                  placeholder="Select a city"
                  styles={customStyles}
                />

                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search Projects"
                    className="w-[650px] h-[60px] pl-6 rounded-lg text-black focus:outline-none shadow-lg focus:ring-2 focus:ring-blue-500  transition-colors"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "#F7F7F7",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-[100px] mt-[100px]">
      {isLoading ? (
  <div className="text-center text-gray-500">Loading...</div>
) : filteredProjects.length === 0 ? (
  <div className="text-center text-gray-500">No Projects Found</div>
) : (
  filteredProjects
    .filter((Project) => !selectedCity || Project.city === selectedCity.value)
    .map((Project, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 duration-300"
      >
              <div className="relative">
             
                                    <img

className="rounded-lg w-full object-cover h-[400px]"
src={Project.images[0]["name"]}
alt={Project.images[0]["name"] || 'fallback-alt-text'}
/>

                <h1 className="absolute text-white top-0 font-bold p-4 text-3xl">
                  {Project.name}
                </h1>
                <h1 className="absolute text-white top-[90px] p-4 font-semibold">
                  {Project.city}
                </h1>
                <div className="absolute inset-0 flex flex-col justify-center mt-[170px] m-7  opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs mt-2">
                    {Project.description}
                  </p>
                </div>
              </div>
            </div>
          )))}
      </div>

      {/* Footer */}

      <Footer />
    </div>
  );
}
