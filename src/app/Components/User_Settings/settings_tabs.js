"use client";
import React, { useEffect, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GetUser, UpdateUserById } from "../../action/user";
import { useRouter } from "next/navigation";
import {
  UpdateData,
  UpdatePassword,
  UserById,
} from "../../api/changepassowrd/passchange";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserChangePassword } from "../../action/user";
import { DotSpinner } from "@uiball/loaders";

const SettingsTabs = () => {
  const [openTab, setOpenTab] = useState(1);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var id = localStorage.getItem("_id");
      const user = await GetUser(id);
      console.log(user, "user data");
      setUserData(user["Get"]);
    };

    fetchData();
  }, []);

  const tabClassName = (tabNumber) =>
    `text-xs font-bold uppercase px-5 py-3  block leading-normal ${
      openTab === tabNumber
        ? "text-white bg-blue-600 shadow-xl rounded-full hover:scale-105 transform transition duration-500 "
        : "text-black bg-slate-100 rounded-full opacity-30 "
    }`;

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 bg-slate-100 rounded-lg px-4 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={tabClassName(1)}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                href="#link1"
                role="tab"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Profile
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={tabClassName(2)}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                href="#link2"
                role="tab"
              >
                <i className="fas fa-briefcase text-base mr-1"></i> Change
                Passwords
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {userData.length === 0 ? (
                    // Render loading state or any other content while data is being fetched
                    <>
                      <div className="flex justify-center items-center">
                        <DotSpinner size={40} speed={0.9} color="blue" />
                      </div>
                    </>
                  ) : (
                    // Map through the userData array and render ProfileSection for each item
                    userData.map((item, index) => (
                      <ProfileSection key={index} user={item} />
                    ))
                  )}
                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <ChangePassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsTabs;

// Profile page section

const ProfileSection = ({ user }) => {
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setEditedUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const update = await UpdateUserById(
      user._id,
      editedUsername,
      editedEmail
    );
  
  console.log(update , "update User")
    if (update["status"] == 200) {

         // Update the local storage
         const updatedUserDataForStorage = JSON.stringify(update);
         localStorage.setItem("current_user", updatedUserDataForStorage);
      toast.success(update["message"]);
      setIsLoading(false);
    
    } else if (update["status"] == 400) {
      toast.error(update["message"]);
      setIsLoading(false);
    } else if (update["status"] == 404) {
      toast.error(update["message"]);
      setIsLoading(false);
    }else{
      toast.error("Error to Save ")
      setIsLoading(false);
    }
   };


  return (
    <div className="bg-white  rounded-lg p-6 flex flex-col   min-h-screen">
      {/* <div className="mt-2 mb-6 flex flex-row gap-3 bg-blue-600 shadow-md w-[200px] justify-center items-center py-3 rounded-lg">
        <img src="/profile.png" className=" h-10 w-10 " />
        <button className="font-sans text-white text-xl font-bold">
          Edit Profile
        </button>
      </div> */}
      {/* <div className="flex flex-row justify-start mt-[30px] items-center gap-3">
        <div className="relative border-8 border-blue-600 bg-white shadow-lg rounded-full w-[220px] h-[220px] flex justify-center items-center">
          <img src="/pro.png" className="rounded-full h-28 w-28 object-cover" />
          <div className="absolute bottom-1 p-2 border-4 border-blue-600 rounded-full bg-white shadow-xl right-4">
            <FaCameraRetro className="w-6 h-6  text-blue-600 hover:text-blue-700 cursor-pointer" />
          </div>
        </div>
      </div> */}

      <div className="w-full mx-auto mt-8 p-8 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedUsername}
                onChange={handleUsernameChange}
                className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedEmail}
                onChange={handleEmailChange}
                className="mt-1 p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* Add more input fields for other user data as needed */}
            {isLoading ? (
              <div className="flex justify-center mt-[60px] mb-[60px] items-center">
                <DotSpinner size={40} speed={0.9} color="blue" />
              </div>
            ) : (
              <>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </form>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

// chnage password

const PasswordInput = ({ name, placeholder, value, onChange }) => {
  return (
    <div className="mt-[30px]">
      <label
        htmlFor={name}
        className="flex flex-row mt-2 mb-2 items-center gap-3"
      >
        <img
          src="/password1.png"
          className="rounded-full h-5 w-5"
          alt="Password Icon"
        />
        {name}
      </label>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        className="block w-full px-4 py-4 rounded-lg border border-gray-100 shadow-md bg-blue-50 focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Current Password") setCurrentPassword(value);
    else if (name === "New Password") setNewPassword(value);
    else if (name === "Confirm Password") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    var id = localStorage.getItem("_id");

    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const changeUser = await UserChangePassword(
          id,
          currentPassword,
          newPassword
        );
        console.log(changeUser, "Change User");
        if (changeUser["status"] === 200) {
          toast.success(changeUser["message"]);
          setIsLoading(false);
          localStorage.removeItem("current_user");
          localStorage.removeItem("_id");
          localStorage.removeItem("role");
          router.push("/Components/Login");
        } else if (changeUser["status"] == 400) {
          toast.error(changeUser["message"]);
          setIsLoading(false);
        } else if (changeUser["status"] == 404) {
          toast.error(changeUser["message"]);
          setIsLoading(false);
        }
      } else {
        toast.error("New password and confirm password do not match");
        setIsLoading(false);
      }
    } else {
      toast.error("Plzz Fill All the required Feilds");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col min-h-screen">
      <ToastContainer />
      {/* <div className="mt-2 mb-6 flex flex-row gap-3 bg-blue-600 shadow-md w-[300px] justify-center items-center py-3 rounded-lg">
        <img
          src="/password.png"
          className="rounded-full h-10 w-10 shadow-xl"
          alt="Password Icon"
        />
        <button className="font-sans text-white text-xl font-bold">
          Changed Password
        </button>
      </div> */}

      <div className="flex justify-center h-full w-full items-center rounded-tl-3xl rounded-tr-3xl">
        <div className="mt-6 bg-white shadow-lg w-[600px] h-auto border-2 border-gray-100 p-5 rounded-tl-3xl rounded-tr-3xl">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-blue-600 shadow-lg rounded-full w-[100px] h-[100px] flex justify-center items-center">
              <img
                src="/password.png"
                className="rounded-full h-14 w-14 object-cover"
                alt="Password Icon"
              />
            </div>

            <div className="mt-4 w-full">
              <form onSubmit={handleSubmit} className="w-full h-full">
                <PasswordInput
                  name="Current Password"
                  placeholder="Enter your Current Password"
                  value={currentPassword}
                  onChange={handleChange}
                />
                <PasswordInput
                  name="New Password"
                  placeholder="Enter your New Password"
                  value={newPassword}
                  onChange={handleChange}
                />
                <PasswordInput
                  name="Confirm Password"
                  placeholder="Enter your Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-blue-700 w-full mt-[50px] mb-[30px] text-white py-3 px-4 rounded-lg text-center hover:bg-blue-600"
                >
                  {isLoading ? (
                    <div className="flex gap-1 justify-center items-center text-blue-600 text-xs">
                      {/* Replace with your loading spinner */}
                      Loading...
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      Submit
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
