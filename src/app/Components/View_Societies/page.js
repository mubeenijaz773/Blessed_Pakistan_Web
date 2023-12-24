// pages/landing.js
"use client"
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ServiceUrl } from "../../global";
import LoadingSpinner from "../Loader/page";
import {cities} from '../../GetList'

 












// Define custom styles for the Select component
const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '200px', // Adjust the width to match your input field
      height: '60px',
      paddingLeft: '6px',
      borderRadius: '6px',
      backgroundColor: 'white',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adjust the shadow
      outline: 'none',
      border: 'none',
      '&:hover': {
        borderColor: 'transparent', // Hide border on hover if needed
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray', // Change the placeholder text color if needed
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'blue', // Change the dropdown indicator color if needed
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'blue' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: 'blue', // Change the background color of the options on hover
        color: 'white',
      },
    }),
  };
  







export  default function SocietiesPage() {
 

  const [images, setImages] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // Initialize with null
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchImages();
   // Filter images when the search query changes
   if (searchQuery) {
    const filteredData = images.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredImages(filteredData);
  } else {
    // If no search query, show all data
    setFilteredImages(images);
  }
}, [searchQuery, images]);



  const fetchImages = async () => {
    try {
      const response = await fetch(`${ServiceUrl}/Fetch_Societies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImages(data["Productdata"]);
      console.log(images, data["Productdata"], "data in agency");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Options for the select dropdown
  const options = cities.map(city => ({ value: city, label: city }));

  // Event handler to handle city selection
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  return (
    <div className="bg-gray-100 min-h-screen w-full">
    <div className=" mx-auto py-12 w-full bg-slate-900 text-white ">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Explore Societies in Pakistan
        </h1>
        <p className="text-lg text-white mt-2">
          Discover the creative and beautiful side of Pakistan
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
  placeholder="Search Societies"
  className="w-[650px] h-[60px] pl-6 rounded-lg text-black focus:outline-none shadow-lg focus:ring-2 focus:ring-blue-500 border border-gray-300 hover:border-gray-400 transition-colors"
  style={{
    fontSize: '16px',
    backgroundColor: '#F7F7F7',
  }}
/>

      {/* <button className="absolute right-4 p-4 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-md bg-blue-500 text-white shadow-lg focus:outline-none">
        Search
      </button> */}
    </div>


            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {filteredImages.filter(society => !selectedCity || society.city === selectedCity.value).map((society, index) => (
    <div
      key={index}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 duration-300"
    >
      <div className="relative">
        <img
          className="w-full h-[400px] object-cover transition transform scale-100 hover:scale-105"
          src={`${ServiceUrl}/Add_Society/?filename=${society.images[0]["name"]}`}
          alt={society.name}
        />
        <h1 className='absolute text-white top-0 font-bold p-4 text-3xl' >{society.name}</h1>
        <h1 className='absolute text-white top-[40px] p-4 font-semibold' >{society.city}</h1>
        <div className="absolute inset-0 flex flex-col justify-center mt-[170px] m-7  opacity-0 hover:opacity-100 transition-opacity duration-300">
         
          <p className="text-white text-xs mt-2">{society.description}</p>
        </div>
      </div>
   
    </div>
  ))}
</div>

  </div>
  );
}

