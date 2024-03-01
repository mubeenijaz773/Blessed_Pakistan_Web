"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // You'll need axios or another HTTP library to make API requests
import { ServiceUrl } from "@/app/global";
import { useSearchParams } from "next/navigation";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  OverlayView,
} from "@react-google-maps/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  MdDeleteOutline,
  MdOutlinePersonAddAlt1,
  MdOutlineSubtitles,
  MdSlowMotionVideo,
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

const Add_Agency = () => {
  const [logoimages, setLogoImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  var email = params.get("email");

  const [agencyName, setAgencyName] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
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

  const handleMapClick = (e) => {
    const newLatitude = e.latLng.lat();
    const newLongitude = e.latLng.lng();

    setLatitude(newLatitude);
    setLongitude(newLongitude);
  };

  const [members, setMembers] = useState([
    { name: "", designation: "", phone: "" },
  ]);

  const handleInputChangee = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
    console.log(newMembers);
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

  const deleteMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  //  Upload image

  const fileInputRef: any = React.createRef();
  const [previewLogoImages, setPreviewLogoImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file: any) => URL.createObjectURL(file));
    setPreviewLogoImages(newImages);
    setLogoImages([...logoimages, ...e.target.files]);
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  //  Upload Banner images

  const [bannerimages, setBannerImages] = useState([]);
  const [previewBannerImages, setPreviewBannerImages] = useState([]);
  const videoInputRef: any = React.createRef();

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newbanner = files.map((file: any) => URL.createObjectURL(file));
    setPreviewBannerImages(newbanner);
    setBannerImages([...bannerimages, ...e.target.files]);
  };

  const handleButtonnClick = () => {
    // Trigger the hidden video input
    videoInputRef.current.click();
  };

  //  Submit ADS butoon

  const handleUpload = async () => {
    // Check if all fields are filled
    if (
      agencyName &&
      address &&
      ceoName &&
      longitude &&
      latitude &&
      members.length > 0 &&
      logoimages.length > 0 &&
      bannerimages.length > 0
    ) {
      // If all fields are filled, show loading state
      const formData = new FormData();
      formData.append("Agencyname", agencyName);
      formData.append("ceo", ceoName);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("lat", latitude);
      formData.append("lng", longitude);
      // Stringify the members array and append it as a single value
      formData.append("members", JSON.stringify(members));

      logoimages.forEach((logo) => {
        formData.append("logoimages", logo);
      });

      bannerimages.forEach((banner) => {
        formData.append("bannerimages", banner);
      });

      try {
        // Simulate API call delay (remove in production)
        setTimeout(async () => {
          const response = await axios.post(
            `${ServiceUrl}/Add_Agency`,
            formData
          );
          if (response.status === 200) {
            // toast.success("Agent Profile Created Successfully")
            setSuccess("Agent Profile Created Successfully");
            setTimeout(() => {
              setSuccess("");
            }, 3000);
            router.push("/Components/Login");
          } else {
            setError("Error uploading file.");
            setTimeout(() => {
              setError("");
            }, 3000);
          }
        }, 2000); // Simulated 2-second delay
      } catch (error) {
        setError("Error uploading file.");
        setTimeout(() => {
          setError("");
        }, 3000);
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

          {/* <LoadScript googleMapsApiKey="AIzaSyAq-OloyVfWl2PTCxFlXQ0OGW_VvBmhCoQ">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
              onClick={handleMapClick} // Add a click event listener
            >
              <MarkerF position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>
          </LoadScript> */}
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

                  <button
                    onClick={handleButtonClick}
                    className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    <FaImages className="w-4 h-4 " />
                    Upload Logo Image
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
                  <div key={index} className="mb-4 relative">
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
                  <button
                    onClick={handleButtonnClick}
                    className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    <FaImages className="w-4 h-4" />
                    Upload Banner Image
                  </button>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                name="bannerimages"
                onChange={handleVideoUpload}
                className="hidden"
                ref={videoInputRef}
              />
              <div className="mt-4 flex flex-wrap gap-6 ">
                {previewBannerImages.map((videoUrl, index) => (
                  <div key={index} className="mb-4">
                    <Image
                      src={videoUrl}
                      alt={`Uploaded Image ${index + 1}`}
                      width={250}
                      height={250}
                      className="object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const updatedVideos = [...previewBannerImages];
                        updatedVideos.splice(index, 1);
                        setPreviewBannerImages(updatedVideos);
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
        <div className="flex flex-col items-center justify-center mt-10">
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
            className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-10 py-3.5 text-center mr-2 mb-2"
          >
            <IoSaveOutline className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default Add_Agency;
