// pages/landing.js
"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ServiceUrl } from "../../global";

import { cities } from "../../GetList";
import { GetAllAgencies } from "../../action/Agency";
import Footer from "../Footer/page";
import Image from "next/image";

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "200px",
    height:"50px",
    borderRadius: "0.25rem",
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3182ce" : "white",
    color: state.isSelected ? "white" : "black",
  }),
};


export default function Agents() {
  const [Projects, setProjects] = useState([]);
  const [agencylist, setAgencyList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await GetAllAgencies();
      setProjects(response["GET"]);
      setAgencyList(response["GET"]); // Set the initial list
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Projects:", error);
      setIsLoading(false);
    }
  };

  const options = cities.map((city) => ({ value: city, label: city }));

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    filterResults(searchQuery, selectedOption);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchQuery(searchTerm);
    filterResults(searchTerm, selectedCity);
  };

  const filterResults = (searchTerm, selectedCity) => {
    const filteredResults = Projects.filter((agency) => {
      const byName = agency.Agencyname.toLowerCase().includes(searchTerm);
      const byCity =
        selectedCity === null || selectedCity === undefined
          ? true
          : agency.city.toLowerCase() === selectedCity.value.toLowerCase();

      return byName && byCity;
    });

    setAgencyList(filteredResults);
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="flex flex-col items-center justify-center h-[400px] bg-blue-500"
        // style={{ backgroundImage: 'url("/project.jpg")' }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Find Top Real Estate Agents in Pakistan</h1>
          <p className="text-lg mt-2">
          Search the real estate agents in Pakistan dealing in properties for sale and rent.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-full  flex gap-4">
              <Select
                value={selectedCity}
                onChange={handleCityChange}
                options={options}
                placeholder="Select a city"
                styles={customStyles}
              />

              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search Agent"
                  className="w-[800px] h-[50px] pl-6 rounded-lg text-black focus:outline-none shadow-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                
                />
              </div>
            </div>
          </div>
        </div>
      </div>

<h1 className="p-4 font-semibold py-10 text-2xl">Agencies</h1>
      <div className="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {agencylist.map((agency, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 duration-300">
              <div className="relative">
                <Image
                  className=" object-cover transition transform scale-100 hover:scale-105"
                  src={`${ServiceUrl}/Add_Agency/?filename=${agency.Logoimages[0]['name']}`}
                  alt={agency.name}
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 flex flex-col justify-center p-4 bg-black bg-opacity-50 hover:bg-opacity-0 transition duration-300">
                  <h1 className="text-white text-xl font-bold mb-2">{agency.Agencyname}</h1>
                  <p className="text-white text-sm">{agency.CEO_Name}</p>
                  <p className="text-white text-xs mt-2">{agency.address}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};