"use client";
import React, { useState, useEffect } from "react";
import { GetProductById, UpdatePropertyById } from "@/app/action/Property";
import {
  HomeList,
  Plots_Type,
  Commercial_Type,
  cities,
} from "@/app/GetList";
import { DotSpinner } from "@uiball/loaders";
import { toast, ToastContainer } from "react-toastify";
import { GoogleMap, LoadScript, MarkerF , OverlayView  } from '@react-google-maps/api';
import "react-toastify/dist/ReactToastify.css";
import { ServiceUrl } from '@/app/global';
import axios from "axios";
import { BsHouseCheck } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdSlowMotionVideo } from "react-icons/md";
import { FaImages, FaVideo } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { BiBuildingHouse, BiCheckCircle } from "react-icons/bi";
import { TbHomeSearch } from "react-icons/tb";
import { GoLocation } from "react-icons/go";
import  Image  from "next/image";
import  {GoogleMapKey} from  "@/app/global"





function EditPropertyPage({params} ) {
  const fileInputRef = React.createRef();
  const [file, setFile] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const videoInputRef = React.createRef();
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);

  const [purpose, setPurpose] = useState("");
  const [subType, setSubType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    for (var i in product) {
      setPropertyType(product[i]["propertyType"]);
      setSubType(product[i]["subType"]);
      setPurpose(product[i]["purpose"]);
      setSelectedCity(product[i]["city"]);
      setAreaSize(product[i]["Area_size"]);
      setLocation(product[i]["location"]);
      setPrice(product[i]["price"]);
      setBedrooms(product[i]["bedrooms"]);
      setBathrooms(product[i]["bathrooms"]);
      setTitle(product[i]["title"]);
      setDescription(product[i]["description"]);
      setEmail(product[i]["email"]);
      setMobile(product[i]["mobile"]);
// setLatitude(product[i]["Latitude"]);
//       setLongitude(product[i]["Longitude"]);
    }
  }, [product]);

  useEffect(() => {

    fetchData();
  }, []); 

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productId = params.id; // Replace with the actual product ID
        const result = await GetProductById(productId);
        console.log(result, "products get ");

        if (result["status"] == 200) {
          setProduct(result["Get"]); // Assuming 'product' is the key in the result
          setIsLoading(false);
        } else if (result["status"] == 400) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

  const handlePropertyChange = (e) => {
    setPropertyType(e.target.value);
  };
  const handleSubTypeChange = (e) => {
    setSubType(e.target.value);
  };

  // console.log(selectedCity , )
  // Handle changes in input fields
  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  // Handler function to update the state when the dropdown value changes
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Handler functions to update the state when input values change
  const handleAreaSizeChange = (e) => {
    setAreaSize(e.target.value);
  };
  // Handler functions to update the state when input values change
  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleBedroomsChange = (e) => {
    setBedrooms(e.target.value);
  };

  const handleBathroomsChange = (e) => {
    setBathrooms(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  //  Upload image

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(newImages);
    setFile([...file, ...e.target.files]);
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  //  Upload video

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);

    const newVideos = files.map((file) => URL.createObjectURL(file));

    setPreviewVideos(newVideos);
    setSelectedVideos([...selectedVideos, ...e.target.files]);
  };

  const handleButtonnClick = () => {
    // Trigger the hidden video input
    videoInputRef.current.click();
  };

  const containerStyle = {
    width: '100%',
    height: '500px', // Set the height as per your design
  };

  
  const center = {
    lat: 0, // Add your initial latitude here
    lng: 0, // Add your initial longitude here
  };
  
  const handleMapClick = (e) => {
    const newLatitude = e.latLng.lat();
      const newLongitude = e.latLng.lng();
  
      setLatitude(newLatitude);
      setLongitude(newLongitude);
  
     
  };
  

  
  async function SaveChanges() {
    setLoading(true);
    const updatedData = {
      purpose,
      propertyType,
      subType,
      city: selectedCity,
      location,
      Area_size: areaSize,
      price,
      bedrooms,
      bathrooms,
      title,
      description,
      email,
      mobile,
      Longitude: longitude,
      Latitude: latitude,
    };

    const result = await UpdatePropertyById(params.id, updatedData);

    const formData = new FormData();
    formData.append("_id" , params.id)
    file.forEach((image) => {
      formData.append("imagefiles", image);
    });

    selectedVideos.forEach((video) => {
      formData.append("videofiles", video);
    });

    await axios.put(`${ServiceUrl}/Edit_Property`, formData);

    if (result.status == 200) {
      setLoading(false);
      fetchData()
      toast.success("Update Your Property Success");
    } else if (result.status == 400) {
      setLoading(false);
      toast.error("Error to Update");
    } else if (result.status == 500) {
      setLoading(false);
      toast.error("Error to Update");
    } else {
      setLoading(false);
      toast.error("Error to Update");
    }
  }





  const handleDelete = async (type, _id, filename) => {
    try {

   
      const url = `${ServiceUrl}/Edit_Property?_id=${params.id}&imageFilename=${filename}&videoFilename=${filename}`;

      const response = await axios.delete(url);
    
      
      if (response.status == 200) {
        // Update your local state or fetch data again
      toast.success('Item deleted successfully');
      }
    } catch (error) {
    toast.error('Error deleting item', error);
    }
  };






  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>

      {isLoading ? (
        <>
          <div className="flex justify-center  mb-[60px] items-center">
            <DotSpinner size={40} speed={0.9} color="blue" />
          </div>
        </>
      ) : (
        <>
          {/* <form className="w-full"> */}
          <div className="flex justify-between gap-6">
            {/* purpose */}

            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="purpose"
              >
                Purpose
              </label>
              <select
                id="purpose"
                name="purpose"
                value={purpose}
                onChange={handlePurposeChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Purpose</option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            {/* property Type */}

            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="propertyType"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={propertyType} // Set the value attribute to the state variable
                onChange={handlePropertyChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select PropertyType</option>
                <option value="Home">Home</option>
                <option value="Plots">Plots</option>
                <option value="Commercials">Commercials</option>
              </select>
            </div>

            {/* Select SubType */}

            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subType"
              >
                SubType
              </label>
              <select
                id="subType"
                name="subType"
                value={subType}
                onChange={handleSubTypeChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select SubType</option>

             
                {propertyType == "Home" && (
                  <>
                    {HomeList.map((option) => (
                      <option key={option} value={option.text}>
                        {option.text}
                      </option>
                    ))}
                  </>
                )}

             
                {propertyType == "Plots" && (
                  <>
                    {Plots_Type.map((option) => (
                      <option key={option} value={option.text}>
                        {option.text}
                      </option>
                    ))}
                  </>
                )}

             
                {propertyType == "Commercials" && (
                  <>
                    {Commercial_Type.map((option) => (
                      <option key={option} value={option.text}>
                        {option.text}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          
          <div className="flex justify-between gap-6">
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select City</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 w-full">
          


              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Area_size"
              >
                Area Size
              </label>
              <input
                type="text"
                id="Area_size"
                name="Area_size"
                value={areaSize}
                onChange={handleAreaSizeChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4 w-full">
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="Location"
              >
                Location
              </label>
              <input
                type="text"
                id="Location"
                name="Location"
                value={location}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          
          <div className="flex justify-between gap-6">
            <div className="mb-4 w-full">
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Price"
              >
                Price
              </label>
              <input
                type="text"
                id="Price"
                name="Price"
                value={price}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4 w-full">
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="Bedrooms"
              >
                Bedrooms
              </label>
              <input
                type="text"
                id="Bedrooms"
                name="Bedrooms"
                value={bedrooms}
                onChange={handleBedroomsChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4 w-full">
          
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="Bathrooms"
              >
                Bathrooms
              </label>
              <input
                type="text"
                id="Bathrooms"
                name="Bathrooms"
                value={bathrooms}
                onChange={handleBathroomsChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          
          <div className="flex justify-between gap-6">
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                htmlFor="Title"
              >
                Title
              </label>
              <input
                type="text"
                id="Title"
                name="Title"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4 w-full">
          
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                htmlFor="Description"
              >
                Description
              </label>
              <textarea
                id="Description"
                name="Description"
                value={description}
                onChange={handleDescriptionChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4 w-full">
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                type="text"
                id="Email"
                name="Email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>

          

          <div className="flex justify-between gap-6">
            <div className="mb-4 w-full">
          
          
              <label
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                htmlFor="Mobile"
              >
                Mobile
              </label>
              <input
                type="text"
                id="Mobile"
                name="Mobile"
                value={mobile}
                onChange={handleMobileChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>


<div className="flex justify-between">
<h1 className="p-4 font-semibold  text-2xl">Your Property Images</h1>

<button
  onClick={handleButtonClick}
  className="flex justify-center p-4 items-center  gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs mt-7 text-center "
>
  Upload New Images
</button>
</div>


<input
  type="file"
  accept="image/*"
  multiple
  name="imagefiles"
  onChange={handleImageUpload}
  className="hidden"
  ref={fileInputRef}
/>

{previewImages.length > 0 && (
  <div className="p-4">Selected Images</div>
)}

<div className="flex flex-wrap gap-4 mb-8">
  {previewImages.map((imageUrl, index) => (
    <div key={index} className="relative">
     <div className="w-32 h-32 relative ">
      <Image
        src={imageUrl}
        alt={`Uploaded Image ${index + 1}`}
        className=" object-cover rounded-lg"
        layout="fill"
      />
      </div>
      <button
        className="absolute top-2 right-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 opacity-30 hover:opacity-100"
        onClick={() => {
          const updatedImages = [...previewImages];
          updatedImages.splice(index, 1);
          setPreviewImages(updatedImages);
        }}
      >
        <RiDeleteBin6Line className="w-4 h-4" />
      </button>
    </div>
  ))}
</div>

{product.map((item, index) => (
  <EditImages key={index} item={item} onDelete={handleDelete} />
))}




<div className="flex justify-between">
<h1 className="p-4 font-semibold  text-2xl">
            Your property Videos
          </h1>

          <button
            onClick={handleButtonnClick}
            className="flex justify-center p-4 items-center  gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs mt-7 text-center "
          >
            <MdSlowMotionVideo className="w-4 h-4" />
            Upload New Videos
          </button>
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

{previewVideos.length > 0 && 
<p className="p-4">Selected Videos</p>
}
          <div className="flex flex-wrap gap-6 ">
            {previewVideos.map((videoUrl, index) => (
              <div key={index} className="mb-4">
                <video
                  src={videoUrl}
                  controls
                  className="w-[200px] h-[200px] rounded-lg  "
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

          {product.map((item, index) => (
            <>
              <EditVideos key={index} item={item}  onDelete={handleDelete} />
            </>
          ))}





<LoadScript className="p-4" googleMapsApiKey={GoogleMapKey}>
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
      


          {Loading ? (
            <>
              <div className="flex justify-center  mb-[60px] items-center">
                <DotSpinner size={40} speed={0.9} color="blue" />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  onClick={SaveChanges}
                  type="submit"
                  className="flex justify-center p-4 items-center  gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs mt-7 text-center "
                  >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default EditPropertyPage;






// EditImages component
const EditImages = ({ item, onDelete }) => {

const [images , setImages] = useState([])


useEffect(() =>{
setImages(item.images)
},[])

const handleDelete = (type , _id , name , imageid) =>{
  const updated = images.filter((item) => item._id !== imageid);
  setImages(updated);
  onDelete(type , _id , name)
}



  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {images.map((image) => (
          <div key={image.name} className="relative">
          <div className="w-32 h-32 relative ">
           <Image
            src={`${ServiceUrl}/Product/?filename=${image.name}`}
            alt="Property Image"
            className="w-full h-full object-cover rounded-md shadow-md"
            layout="fill"
           />
           </div>
           <button
             className="absolute top-2 right-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 opacity-30 hover:opacity-100"
             onClick={() => handleDelete('image', item._id, image.name , image._id)}
           >
             <RiDeleteBin6Line className="w-4 h-4" />
           </button>
         </div>
      ))}
    </div>
  );
};

// EditVideos component
const EditVideos = ({ item, onDelete }) => {



  const [videos , setVideos] = useState([])


  useEffect(() =>{
    setVideos(item.videos)
  },[])
  
  const handleDelete = (type , _id , name , videoid) =>{
    const updated = videos.filter((item) => item._id !== videoid);
    setVideos(updated);
    onDelete(type , _id , name)
  }
  

  return (
    <div className="flex  overflow-x-auto space-x-4 p-4">
      {videos.map((video) => (
        <div key={video.name} className="w-32 h-32 flex-shrink-0 relative">
          <video
            src={`${ServiceUrl}/Product/?filename=${video.name}`}
            controls
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => handleDelete('video', item._id, video.name , video._id)}
            className="absolute top-2 right-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 opacity-30 hover:opacity-100"
            >
       <RiDeleteBin6Line className="w-4 h-4" />
          </button>
        </div>
        
      ))}
    </div>
  );
};