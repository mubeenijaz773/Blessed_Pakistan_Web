"use client";
import React, { useState} from "react";
import { CldUploadWidget } from 'next-cloudinary';
import { GoogleMap, LoadScript, MarkerF , OverlayView  } from '@react-google-maps/api';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{cities} from '@/app/GetList'

import { MdSlowMotionVideo } from "react-icons/md";
import { FaImages, FaVideo } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import  Image  from 'next/image';
import {Add_Projects} from "../action/projects";
import LoadingSpinner from "../Loader/page";
import Navbarunique from "../Navbar/page";

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
  







  // upload Images on cloudinary
  const [uploadedImagesUrls, setUploadedImagesUrls] = useState([]);

  const handleUploadImagesSuccess = (response) => {
    const uploadedUrl = response.info.url;
 
    // Update the state to include the new uploaded URL and name
    setUploadedImagesUrls((prevUrls) => [...prevUrls, { name: uploadedUrl }]);
};



  



  const [uploadedVideoUrls, setUploadedVideosUrls] = useState([]);


  // upload videos on cloudinary

  const handleUploadVideosSuccess = (response) => {
    const uploadedUrl = response.info.url;
    // console.log("Uploaded URL:", uploadedUrl);

    // Update the state to include the new uploaded URL
    setUploadedVideosUrls((prevUrls) => [...prevUrls, { name: uploadedUrl }]);
  };










  //  Submit ADS butoon

  const handleUpload = async () => {
    // Check if all fields are filled
    if (
    name &&
    description && 
    location && 
    selectedCity &&
  longitude &&
    latitude

    ) {
      // If all fields are filled, show loading state
      setLoading(true);
  
 
      try {
        const response = await Add_Projects(
          name, description, location, selectedCity,
         latitude, longitude ,  uploadedImagesUrls,
          uploadedVideoUrls
        )
            if (response.status === 200) {
          
              toast.success("Project Added Successfully")
           
  setUploadedImagesUrls([]);
  setUploadedVideosUrls([]);
  setLoading(false);
            } else {
              toast.error("Error to Added")
             
              setLoading(false);
  
            }
      } catch (error) {
        toast.error("Error to Added")
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields.")
    
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
    <main >
      <Navbarunique />
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
                  <CldUploadWidget
                    uploadPreset="next_cloudinary_web_app"
                    onSuccess={handleUploadImagesSuccess}
                    onError={(error) => toast.error(error)}
                    maxFiles={5} // set limits
                  >
                    {({ open }) => (
                      <button
                        onClick={() => open()}
                        className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        <FaImages className="w-4 h-4 " />
                        Upload Image
                      </button>
                    )}
                  </CldUploadWidget>
                
                </div>
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
      <CldUploadWidget
                    uploadPreset="next_cloudinary_web_app"
                    onSuccess={handleUploadVideosSuccess}
                    onError={(error) => toast.error(error)}
                    maxFiles={5} // set limits
                    resourceType="video" // specify resource type as video
                  >
                    {({ open }) => (
                      <button
                        onClick={() => open()}
                        className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        <MdSlowMotionVideo className="w-4 h-4" />
                        Upload Video
                      </button>
                    )}
                  </CldUploadWidget>
      </div>
      
     
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
