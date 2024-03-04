"use client";
import React, { useState,  Suspense, ReactNode } from "react";

import {Add_Agencies} from "@/app/action/Agency";
import { useSearchParams } from "next/navigation";
import {
  GoogleMap,
  LoadScript,
  MarkerF,

} from "@react-google-maps/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from 'next-cloudinary';
import {
  MdDeleteOutline,
  MdOutlinePersonAddAlt1,
  MdOutlineSubtitles,

} from "react-icons/md";
import { FaImages, FaMagento, FaVideo } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { useRouter } from "next/navigation";
import { BsPersonVcardFill } from "react-icons/bs";
import { TbAddressBook } from "react-icons/tb";
import { SiGooglemaps } from "react-icons/si";
import { IoSaveOutline } from "react-icons/io5";
import { BiSolidError } from "react-icons/bi";
import Image from "next/image";
import { cities } from "../GetList";
import Select from 'react-select';
import Navbarunique from "../Navbar/page";

// Define the type for the children prop as ReactNode
interface SuspenseBoundaryProps {
  children: ReactNode;
}

// Use the defined type for the children prop
const SuspenseBoundary = ({ children }: SuspenseBoundaryProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);
const WrapComponent = () =>{

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  var email:any = params.get("email");
  const [selectedCity, setSelectedCity] = useState(null);
  const [agencyName, setAgencyName] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;

    // Update the state based on the input field's name
    switch (name) {
      case "agencyName":
        setAgencyName(value);
        break;
      case "ceoName":
        setCeoName(value);
        break;
      case "address":
        setAddress(value);
        break;

      default:
      // Handle other input fields or unknown names if needed
    }
  };

  const containerStyle = {
    width: "70%",
    height: "300px",
  };

  const center = {
    lat: 0, // Add your initial latitude here
    lng: 0, // Add your initial longitude here
  };

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleMapClick = (e:any) => {
    const newLatitude = e.latLng.lat();
    const newLongitude = e.latLng.lng();

    setLatitude(newLatitude);
    setLongitude(newLongitude);
  };

  const [members, setMembers] = useState([
    { name: "", designation: "", phone: "" },
  ]);

  const handleInputChangee = (index:any, field:any, value:any) => {
    const newMembers:any = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
    console.log(newMembers);
  };

 
  const handleCityChange = (city:any) => {
 
    setSelectedCity(city)
 
  };







  const addMember = () => {
    if (members.length < 5) {
      setMembers([...members, { name: "", designation: "", phone: "" }]);
    } else {
      setError("You are not to allowed to add members more then 5");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const deleteMember = (index:any) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };
  const [uploadedImagesUrls, setUploadedImagesUrls]:any = useState([]);

  // upload Images on cloudinary

  const handleUploadImagesSuccess = (response:any) => {
    const uploadedUrl = response.info.url;
 
    // Update the state to include the new uploaded URL and name
    setUploadedImagesUrls((prevUrls:any) => [...prevUrls, { name: uploadedUrl }]);
};



  



  const [uploadedBannerUrls, setUploadedBannerUrls]:any = useState([]);


  // upload videos on cloudinary

  const handleUploadBannerSuccess = (response:any) => {
    const uploadedUrl = response.info.url;
    // console.log("Uploaded URL:", uploadedUrl);

    // Update the state to include the new uploaded URL
    setUploadedBannerUrls((prevUrls:any) => [...prevUrls, { name: uploadedUrl }]);
  };



  //  Submit ADS butoon

  const handleUpload = async () => {
    // Check if all fields are filled
    if (
      agencyName &&
      address &&
      selectedCity &&
      ceoName &&
      longitude &&
      latitude &&
      members.length > 0 
    ) {
    
      try {
        const response = await Add_Agencies(
          agencyName, ceoName, address, selectedCity,
          email, latitude, longitude, members ,  uploadedImagesUrls,
          uploadedBannerUrls
        )
            if (response.status === 200) {
          
              toast.success("Agency Added Successfully")
            setSuccess("Agency Created Success")
  setUploadedImagesUrls([]);
  setUploadedBannerUrls([]);
  router.push('/Login')
            } else {
              toast.error("Error to Added")
              setError("Error to Add");
      
  
            }
      } catch (error) {
        setError("Error to Add");
     
      }
    } else {
      setError("Please fill in all required fields.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <Navbarunique />
      <div className="bg-white border p-10">
        <ToastContainer />
        <div className="flex flex-row gap-12 justify-center w-[100%]">
          <div className="flex flex-col gap-2  w-[15%] ">
            <div className="border border-gray-100 bg-gray-100 p-2 rounded-lg w-10 h-10 flex justify-center items-center  ">
              <FaMagento className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Add Agency Information</h2>
          </div>

          <div className="flex-cols w-[65%]">
            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <FaMagento className="w-5 h-5 text-blue-600" />
              </div>
              <label className="block text-gray-900 text-sm font-bold mt-2">
                Agency Name
              </label>
            </div>

            <input
              type="text"
              name="agencyName"
              placeholder="Agency Name"
              value={agencyName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded  p-2 w-full py-3 mb-4 mt-5 text-xs focus:outline-none focus:border-blue-500"
            />

            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <BsPersonVcardFill className="w-5 h-5 text-blue-600" />
              </div>

              <label className="block text-gray-900 text-sm font-bold mt-2">
                Ceo Name
              </label>
            </div>

            <input
              type="text"
              name="ceoName"
              placeholder="CEO Name"
              value={ceoName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full py-3 mb-4 mt-5 text-xs focus:outline-none focus:border-blue-500"
            />

            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <MdOutlinePersonAddAlt1 className="w-5 h-5 text-blue-600" />
              </div>
              <label className="block text-gray-900 text-sm font-bold mt-2">
                Members
              </label>
            </div>

            {members.map((member, index) => (
              <div key={index} className="mt-5 relative mb-10">
                <div className="flex flex-row gap-3">
                  <div className="w-8 text-center">{index + 1}.</div>
                  <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-600 mb-2 flex gap-2">
                      <MdOutlinePersonAddAlt1 className="text-blue-600 w-4 h-4" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) =>
                        handleInputChangee(index, "name", e.target.value)
                      }
                      className="border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-600 mb-2 flex gap-2">
                      <MdOutlineSubtitles className="text-blue-600 w-4 h-4" />
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Designation"
                      value={member.designation}
                      onChange={(e) =>
                        handleInputChangee(index, "designation", e.target.value)
                      }
                      className="border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-600 mb-2 flex gap-2">
                      <IoMdPhonePortrait className="text-blue-600 w-4 h-4" />
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={member.phone}
                      onChange={(e) =>
                        handleInputChangee(index, "phone", e.target.value)
                      }
                      className="border border-gray-300  rounded p-2 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {index === 0 ? null : (
                  <button
                    onClick={() => deleteMember(index)}
                    className="absolute right-0 -top-5  text-red-500 bg-white  p-2 border rounded-lg hover:text-red-700 focus:outline-none"
                  >
                    <MdDeleteOutline className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}

            {error && (
              <div className="flex gap-2">
                <BiSolidError className="w-5 h-5 text-red-600" />
                <p className="text-red-600 text-sm text-start">{error}</p>
              </div>
            )}
            <button
              onClick={addMember}
              className="flex gap-2 mt-5  text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                className="bi bi-plus mr-1 relative z-10"
                viewBox="0 0 16 16"
              >
                <path d="M7.5 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8v5.5a.5.5 0 0 1-1 0V8H1.5a.5.5 0 0 1 0-1H7V1.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              More Members
            </button>

            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <TbAddressBook className="w-4 h-4 text-blue-600" />
              </div>
              <label className="block text-gray-900 text-sm mt-2 font-bold">
                Address
              </label>
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full py-3 mb-4 mt-5 text-xs focus:outline-none focus:border-blue-500"
            />
        
        <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <TbAddressBook className="w-4 h-4 text-blue-600" />
              </div>
              <label className="block text-gray-900 text-sm mt-2 font-bold">
               City
              </label>
            </div>

          <CityDropdown selectedCity={selectedCity} onChange={handleCityChange}  />
        
          </div>
        
        </div>
      </div>








      <div className="bg-white border p-10">
        <div className="flex flex-row gap-12 justify-center  w-[100%] ">
          <div className="flex flex-col  w-[15%] gap-2">
            <div className="border border-gray-100 bg-gray-100 p-2 rounded-lg w-10 h-10 flex justify-center items-center  ">
              <SiGooglemaps className="w-6 h-6 text-blue-500" />
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
              <MarkerF position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <div className="bg-white  border  p-10">
        <div className="flex flex-row gap-12 justify-center w-[100%]">
          <div className="flex flex-col gap-2  w-[15%] ">
            <div className="border border-gray-100 bg-gray-100 p-2 rounded-lg w-12 h-12 flex justify-center items-center  ">
              <Image src="/image.png" width={40} height={40} alt={"logo"} />
            </div>
            <h2 className="text-xl font-semibold">
              Property Images And Videos
            </h2>
          </div>

          <div className="flex flex-col w-[65%] ">
            <div className="flex flex-row gap-3 mt-5">
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image width={30} height={30} src="/image.png" alt={"logo"} />
              </div>

              <label className="block text-gray-900 text-sm font-bold mt-2">
                Upload Your Images
              </label>
            </div>

            <div className="border-dotted border-gray-500 p-4 rounded-lg border-2 mt-2">
              <div className="flex gap-5 w-[50%] ">
                <div className=" flex justify-center items-center border border-gray-100 bg-gray-100  rounded-full w-20 h-20  ">
                  <Image width={70} height={70} src="/image.png" alt={"logo"} />
                </div>

                <div>
                  <h1 className="text-sm font-semibold mb-4">
                    Logo Image Upload
                  </h1>
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
              <div className="border border-gray-100 bg-gray-100 p-2 rounded-full  ">
                <Image width={30} height={30} src="/image.png" alt={"logo"} />
              </div>

              <label className="block text-gray-900 text-sm font-bold mt-2">
                Upload Banner Image
              </label>
            </div>

            <div className="border-dotted border-2 border-gray-500 p-4 rounded-lg mt-2">
              <div className="flex gap-5 w-[50%] ">
                <div className=" flex justify-center items-center border border-gray-100 bg-gray-100  rounded-full w-20 h-20  ">
                  <Image width={70} height={70} src="/image.png" alt={"logo"} />
                </div>

                <div>
                  <h1 className="text-sm font-semibold mb-4">Banner Upload</h1>
                  <CldUploadWidget
                    uploadPreset="next_cloudinary_web_app"
                    onSuccess={handleUploadBannerSuccess}
                    onError={(error) => toast.error(error)}
                    maxFiles={5} // set limits
                  >
                    {({ open }) => (
                      <button
                        onClick={() => open()}
                        className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        <FaImages className="w-4 h-4 " />
                        Upload Banner Image
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

           
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end mt-10">
          {error && (
            <div className="flex gap-2 mb-3 mt-3">
              <BiSolidError className="w-5 h-5 text-red-600" />
              <p className="text-red-600 text-sm text-start">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex gap-2 mb-3 mt-3">
              <Image width={5} height={5} src="/success.png" alt={"logo"} />
              <p className="text-red-600 text-sm text-start">{success}</p>
            </div>
          )}
          <button
            onClick={handleUpload}
            className="flex justify-end gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-10 py-3.5 text-center mr-2 mb-2"
          >
            <IoSaveOutline className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </main>
  );  
}








const Add_Agency = () => {




return(
  <>
    
    <SuspenseBoundary>
  <WrapComponent />
</SuspenseBoundary>
  </>
)



};

export default Add_Agency;







// City dropdown

const CityDropdown = ( {selectedCity , onChange  }) => {
  const options = cities.map((city) => ({ value: city, label: city }));

  return (
    <div>

   
    <Select
      options={options}
      value={{ value: selectedCity, label: selectedCity }}
      onChange={(selectedOption) => onChange(selectedOption.value)}
      placeholder="Select a city..."
      isSearchable
      className={`text-xs hover:bg-gray-100 text-gray-700`}
    />
  
     </div>
  );
};







