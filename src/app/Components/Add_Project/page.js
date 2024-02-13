"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // You'll need axios or another HTTP library to make API requests
import Select from "react-select";
import { ServiceUrl } from "../../global";
import { GoogleMap, LoadScript, MarkerF , OverlayView  } from '@react-google-maps/api';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{cities} from '../../GetList'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSlowMotionVideo } from "react-icons/md";
import { FaImages, FaVideo } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import  Image  from 'next/image';

import LoadingSpinner from "../Loader/page";

const Add_Project = () => {


  const [logoimages, setLogoImages] = useState([]);
 const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  




  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name: inputName, value } = e.target;
    
    // Update the state based on the input field's name
    switch (inputName) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'location':
        setLocation(value);
        break;
    
      default:
        // Handle other input fields or unknown names if needed
    }
  };
  





  //  Upload image

  const fileInputRef = React.createRef();
  const [previewLogoImages, setPreviewLogoImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setPreviewLogoImages(newImages);
    setLogoImages([...logoimages, ...e.target.files]);
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };



//  Upload video

const [selectedVideos, setSelectedVideos] = useState([]);
const [previewVideos, setPreviewVideos] = useState([]);
const videoInputRef = React.createRef();

const handleVideoUpload = (e) => {




  const files = Array.from(e.target.files);

  const newVideos = files.map((file) => URL.createObjectURL(file));

  setPreviewVideos(newVideos)
  setSelectedVideos([...selectedVideos, ...e.target.files]);
};

const handleButtonnClick = () => {
  // Trigger the hidden video input
  videoInputRef.current.click();
};














  //  Submit ADS butoon

  const handleUpload = async () => {
    // Check if all fields are filled
    if (
    name &&
    description && 
    location && 
    selectedCity &&
    logoimages.length > 0 &&
    selectedVideos.length > 0 &&
    longitude &&
    latitude

    ) {
      // If all fields are filled, show loading state
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("city", selectedCity);
      formData.append('lat', latitude);
      formData.append('lng', longitude);
      logoimages.forEach((logo) => {
        formData.append("images", logo);
      });

      selectedVideos.forEach((video) => {
        formData.append("videofiles", video);
      });
  
 
      try {
        // Simulate API call delay (remove in production)
        setTimeout(async () => {
          const response = await axios.post(`${ServiceUrl}/Add_Project`, formData);

          if (response.status === 200) {
            // setSuccess(true);
            toast.success("Project Added Successfully")
            setLoading(false);
            // Handle success (e.g., redirect or show a success message)
          } else {
            toast.error("Error uploading file.")
            // setSuccess(false);
            setLoading(false);
            // setError("Error uploading file.");
          }
        }, 2000); // Simulated 2-second delay
      } catch (error) {

        toast.error("Error uploading file.")
        console.error("Error uploading file:", error);
        // setSuccess(false);
        setLoading(false);
        // setError("Error uploading file.");
      }
    } else {
      toast.error("Please fill in all required fields.")
      // If any required field is missing, display an error message
      // setError("Please fill in all required fields.");
    }
  };





  const containerStyle = {
    width: '70%',
    height: '300px',
  };
  
  const center = {
    lat: 0, // Add your initial latitude here
    lng: 0, // Add your initial longitude here
  };
  

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // const [address, setAddress] = useState('');
  
  
  
  
  const handleMapClick = (e) => {
    const newLatitude = e.latLng.lat();
      const newLongitude = e.latLng.lng();
  
      setLatitude(newLatitude);
      setLongitude(newLongitude);
  
     
  };
  

  return (
    <main className="h-[400vh] m-9">
      <div className="bg-white rounded-lg shadow-md mt-9 p-4">
        <div className="flex flex-row gap-12 justify-center w-[100%]">
          <div className="flex flex-col gap-2  w-[15%] ">
            <div className="border border-gray-100 bg-gray-100 p-2 rounded-lg w-10 h-10 flex justify-center items-center  ">
              <Image 
                src="/price.png"
                width={25}
                height={25}
                alt={"logo"}
                className=" text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold">Add Project Information</h2>
          </div>

          <div className="flex-cols w-[65%]">
            {/* first */}

            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image 
                src="/price.png" 
                width={15}
                height={15}
                alt={"logo"}
                 />
              </div>
              <label className="block text-gray-900 text-sm font-semibold ">
                Project Name
              </label>
            </div>

            <input
             type="text"
             name="name"
             placeholder="Project Name"
             value={name}
             onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full py-3 mb-4 mt-2 text-xs focus:outline-none focus:border-blue-500"
            
            />

            {/* second */}

            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image 
                  src="/price.png"
                  width={15}
                  height={15}
                  alt={"logo"}
                   />
              </div>

              <label className="block text-gray-900 text-sm font-semibold ">
                Description
              </label>
            </div>

            <input
               type="text"
               name="description"
               placeholder="Description"
               value={description}
               onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full py-3 mb-4 mt-2 text-xs focus:outline-none focus:border-blue-500"
          
            />

            {/* 3rd section */}

           

            {/* 4rth section */}

            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image 
                src="/price.png"
                width={15}
                height={15}
                alt={"logo"}
                />
              </div>
              <label className="block text-gray-900 text-sm font-semibold ">
                City
              </label>
            </div>

            <div>
   
      <select
        id="city"
        name="city"
        value={selectedCity}
        onChange={handleCityChange}
        className="border border-gray-300 rounded p-2 w-full py-3 mb-4 mt-2 text-xs focus:outline-none focus:border-blue-500"
      >
        <option value="">Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
   
    </div>
          </div>
        </div>
      </div>




{/*  Location from google Map */}


<div className="bg-white rounded-lg shadow-md mt-9 p-8">
     
     <div className="flex flex-row gap-12 justify-center  w-[100%] " >

     <div className="flex flex-col  w-[15%] gap-2">
      
      <div className="border border-gray-100 bg-gray-100 p-2 rounded-lg w-10 h-10 flex justify-center items-center  " >        
        <Image 
        src="/price.png"
        width={25}
        height={25}
        alt={"logo"}
        className="text-blue-500" />
</div>        
        <h2 className="text-xl font-semibold">Google Map Location</h2>
       </div>
   

       <LoadScript googleMapsApiKey="AIzaSyAq-OloyVfWl2PTCxFlXQ0OGW_VvBmhCoQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onClick={handleMapClick} // Add a click event listener
        >
         
      
            <MarkerF
              position={{ lat: latitude, lng: longitude }}
            />
       
        </GoogleMap>
      </LoadScript>


     </div>
<ToastContainer />
    <div className="flex justify-end " >
<div className="flex flex-col justify-end gap-5 w-[75%]" >

     <div className="flex flex-row gap-3 mt-11 ">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image 
                src="/price.png"
                width={15}
                height={15}
                alt={"logo"}
                  />
              </div>
              <label className="block text-gray-900 text-sm font-semibold ">
                Location
              </label>
            </div>

            <input
             type="text"  // Set the input type to "number"
             name="location"
             placeholder="location"
             value={location}
             onChange={handleInputChange}
             
              className="border border-gray-300  rounded p-2 w-full py-3 mb-4 mt-2 text-xs focus:outline-none focus:border-blue-500"
      
            />
</div>
     </div>
     </div>





      {/* Agency Images and Videos */}

      <div className="bg-white rounded-lg shadow-md mt-9 p-4">
        <div className="flex flex-row gap-12 justify-center w-[100%]">
          <div className="flex flex-col gap-2  w-[15%] ">
            <div className="border border-gray-100 bg-gray-100 p-2 rounded-lg w-10 h-10 flex justify-center items-center  ">
              <Image 
              src="/price.png"
              width={25}
              height={25}
              alt={"logo"}
               className=" text-blue-500" 
               />
            </div>
            <h2 className="text-xl font-semibold">
              Project Images
            </h2>
          </div>

          <div className="flex flex-col w-[65%] ">
            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image 
                src="/price.png"
                width={15}
                height={15}
                alt={"logo"}
                 />
              </div>
              <label className="block text-gray-900 text-sm font-semibold ">
                Upload Your Images
              </label>
            </div>

            <div className="border-dotted border-gray-500 p-4 rounded-lg border-2 mt-2">
              <div className="flex gap-5 w-[50%] ">
                <div className=" flex justify-center items-center border border-gray-100 bg-gray-100  rounded-full w-20 h-20  ">
                  <Image 
                  src="/image.png"
                  width={45}
                  height={45}
                  alt={"logo"}
                  />
                </div>

                <div>
                  <h1 className="text-sm font-semibold mb-4">Upload</h1>

                  <button
                    onClick={handleButtonClick}
                    className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    <FaImages className="w-4 h-4 " />
                    Upload  Image
                  </button>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                name="logoimages"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {previewLogoImages.map((imageUrl, index) => (
                  <div key={index} className=" relative">
                    <Image
                      src={imageUrl}
                      alt={`Uploaded Image ${index + 1}`}
                      width={250}
                      height={250}
                
                    
                      className="object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-0 right-0 text-white mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 opacity-30 hover:opacity-100 text-center mr-2 mb-2"
                      onClick={() => {
                        const updatedImages = [...previewLogoImages];
                        updatedImages.splice(index, 1);
                        setPreviewLogoImages(updatedImages);
                      }}
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-3 mt-5">
  <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  " >
 < Image 
 src="/price.png"
 width={15}
 height={15}
 />    
</div>
<label className="block text-gray-900 text-sm font-semibold ">Upload Your Videos</label>   
</div>

      <div className="border-dotted border-2 border-gray-500 p-4 rounded-lg mt-2">
      
    
      <div className="flex gap-5 w-[50%] " >

      <div className=" flex justify-center items-center border border-gray-100 bg-gray-100  rounded-full w-20 h-20  " >
 <Image 
 src="/play.png"
 width={45}
 height={45}
 alt={"logo"}
 />    
</div>

     <div>
      <h1 className="text-sm font-semibold mb-4">Video Upload</h1>
      <button
        onClick={handleButtonnClick}
        className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
      >
        <MdSlowMotionVideo className="w-4 h-4" />
          Upload Video
      </button>
     
      </div>
      
     
      </div>
      
      
      <input
        type="file"
        accept="video/*"
        multiple
        name="videofiles"
        onChange={handleVideoUpload}
        className="hidden"
        ref={videoInputRef}
      />
      <div className="mt-4 flex flex-wrap gap-6 ">
  
        {previewVideos.map((videoUrl, index) => (
          <div key={index} className="mb-4">
            <video
              src={videoUrl} 
              controls
              className="w-[300px] h-[200px] rounded-lg  "
            />
            <button
              onClick={() => {
                const updatedVideos = [...previewVideos];
                updatedVideos.splice(index, 1);
                setPreviewVideos(updatedVideos);
              }}
              className="text-white mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
           >
              <RiDeleteBin6Line />
            </button>
          </div>
        ))}
      </div>
    </div>

 </div>
           </div>
           </div>



      {/* Submit Product */}

      <div className="text-center">
    
        {loading ? (
          // Loader

          <LoadingSpinner />
        ) : (
          <>
        
            <button
              onClick={handleUpload}
              className="float-right mt-5 flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-5"
            >
              <IoIosSave className="w-4 h-4" />
              Submit Ad
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default Add_Project;
