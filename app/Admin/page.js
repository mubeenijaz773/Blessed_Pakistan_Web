"use client"
import React, { useEffect, useState } from 'react';
import { BiSearchAlt2, BiSolidMinusCircle } from 'react-icons/bi';
import Navbarunique from "../Navbar/page";
import { ServiceUrl } from "@/app/global"
import { Ring } from '@uiball/loaders';
import { DeleteUser } from '@/app/action/user';
import {GetAllAgencies , updateStatus} from "@/app/action/Agency"


const Admin = () => {



  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    FetchAgencies();
  }, []);

  const FetchAgencies = async () => {
    try {
      const data = await GetAllAgencies();
      setAgencies(data["GET"]); // Assuming data is an array of agencies
      setLoading(false);
    } catch (error) {
      console.error('Error fetching agencies:', error);
      setLoading(false);
    }
  };





  useEffect(() => {
    fetchData();
    var userobj = localStorage.getItem("current_user");
    // console.log(JSON.parse(userobj), "data in local object");
    setUser(JSON.parse(userobj));
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ServiceUrl}/SignUp`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserList(data.Users);
        setIsLoading(false);
      } else {
        console.error('Error fetching data:', response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };


  const [searchQuery, setSearchQuery] = useState("");

  const filteredUserList = userList.filter((user) =>
    user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase()));



const handleDeleteUSer = async (id) => {
  try {
    // Assuming DeleteUser is a function that makes a DELETE request to your API
    await DeleteUser(id);
    // Update the state to remove the deleted user from userList
    console.log("User deleted successfully");
 fetchData();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};



  return (
    <main>
       <Navbarunique />
      <nav className="navbar px-10  flex flex-row justify-between items-center bg-gray-800  h-[80px] w-full">
        <div className='relative w-[500px] h-[57px] flex justify-center items-center'>
          <input
            placeholder='by Username'
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-9 p-4 rounded-full shadow-2xl bg-white text-black text-xs'
          />
          <button className='absolute right-1 top-7 p-3 -translate-y-1/2 bg-red-800 rounded-full' >
            <BiSearchAlt2 className='w-4 h-4 text-white' />
          </button>

        </div>

        {/* <div className="mx-auto max-w-md p-4">
      {loading ? (
        <Ring color="#fff" size={30} />
      ) : (
        <select
          className="block w-full px-4 py-2 mt-1 leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
        >
        
          {agencies.map((agency , index) => (
            <option key={index} value={agency._id}>
              {agency.Agencyname}
            </option>
          ))}
        </select>
      )}
    </div> */}

        <div className='flex space-x-2' >
          <div className='flex flex-col space-y-1'>
            <span className='text-xs text-zinc-50 font-bold'>{user.username}</span>
            <span className='text-xs text-zinc-50 mr-6 flex justify-end '>{user.role}</span>
          </div>

          {/* <Image src='/1.avif' className='w-10 h-10 object-cover' /> */}
          <div  className="    bg-white   focus:outline-none focus:ring-purple-300 dark:focus:ring-white shadow-lg cursor-pointer border-none rounded-full w-[40px] h-[40px] p-3 relative ml-4 ">
              <p className="text-black text-sm text-center relative uppercase ">
                {user.username?.charAt(0)}
              </p>
            </div>
        </div>

      </nav>

      <div className="w-full min-h-screen bg-pink-100 p-5">

        <div className="border border-white shadow-lg rounded-md p-5 bg-white " >


          <div className="flex flex-row justify-between">

            <div>
              <text className="font-sans text-xl font-bold text-black" >
                All Users
              </text>

              <div className="flex flex-row" >
                <text className="font-sans text-xs text-red-800" >
                  Users /
                </text>
                <text className="font-sans text-xs text-gray-500" >
                  Users list
                </text>

              </div>
            </div>

            <button onClick={() => { fetchData(); }} type="button" className=" text-white border border-gray-200  bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              Refresh</button>

          </div>
        </div>
        <div className="bg-white mt-4 w-full shadow-lg overflow-hidden rounded-lg h-[390px]" >
          <div className="h-[60px] w-full bg-gray-800 px-8 justify-center flex items-center rounded-tl-lg rounded-tr-lg ">
            <ul className="flex justify-between w-[100%]">
              <div className="flex justify-between  w-[20%]" >
                <li className="font-bold font-sans text-white text-xs" >
                  No
                </li>
                <li className="font-bold font-sans w-full flex justify-center mr-2 text-white text-xs" >
                  UserName
                </li>

              </div>
              <li className="font-bold font-sans px-5 text-white text-start text-xs w-[30%] " >
                Email
              </li>
              <li className="font-bold font-sans px-5 text-white text-start text-xs w-[20%] " >
                Role
              </li>
              <li className="font-bold font-sans px-5 text-white text-start text-xs w-[20%] " >
                Creation Date
              </li>

              <li className="font-bold font-sans text-white text-end text-xs w-[10%] " >
                Actions
              </li>

            </ul>
          </div>


          <div className="custom-scrollbar mb-10" style={{ overflowY: 'auto', height: '340px' }}>

            <ul>
              {isLoading ? (
                <div className="flex justify-center items-center mt-[150px]" >
                  <Ring
                    size={20}
                    lineWeight={5}
                    speed={2}
                    className="mt-1"
                    color="black"
                  />

                </div>
              ) :
                filteredUserList.length === 0 ? (
                  <div className=" flex justify-center font-sans items-center mt-[100px] text-red-800">
                    No User Founded.
                  </div>
                ) : (
                  <>
                    {filteredUserList.map((user, index) => (
                      <div key={index}>
                        <div className="flex justify-between h-auto shadow px-8 w-[100%]" key={index}>
                          <div className="flex justify-between py-6 w-[20%]">
                            {/* No */}
                            <li className="font-bold font-sans text-black text-xs">{index + 1}</li>
                            {/* UserName */}
                            <li className="font-bold font-sans flex gap-2 justify-center w-full px-1 text-black text-xs break-words">
                            <div  className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 w-[30px] h-[30px] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 cursor-pointer border-none rounded-full  p-1 relative  ">
              <p className="text-white text-sm text-center relative uppercase ">
                {user.username[0]}
              </p>
            </div>
                              <div className='mt-2' > 
                              {user.username}
                              </div>
                            </li>
                          </div>
                          {/* Email */}
                          <div className="flex justify-start py-6 px-5 w-[30%]">
                            <li className="font-sans text-black text-xs break-words">{user.email}</li>
                          </div>
                          {/* Role */}
                          <div className="flex justify-start py-6 px-5 w-[20%]">
                            <li className="font-sans text-black text-xs break-words">{user.role}</li>
                          </div>
                          {/* Dates */}
                          <div className="flex justify-start py-6 px-5 w-[20%]">
                            <li className="font-sans text-black text-xs break-words">12/11/2023</li>
                          </div>
                          {/* Actions */}
                          <div onClick={() => { handleDeleteUSer(user._id); }} className="flex justify-end py-6 w-[10%] cursor-pointer">
                            <li >
                              <BiSolidMinusCircle className="w-7 h-7  hover:transform hover:scale-150 transition-transform duration-300 text-gray-800 " />

                            </li>

                          </div>

                        </div>
                        <div className="border  border-x h-0.2 w-full bg-slate-50" />
                      </div>
                    ))}
                  </>
                )}
            </ul>
          </div>
        </div>

      </div>


{/* ///////////////////////////   Agencies /////////////////////////////////////// */}


<ShowAgencies  List={agencies}  func={FetchAgencies} />



    </main>
  );
}

export default Admin;










// ////////////////////////////////////  Show Agencies /..........................





const ShowAgencies = ({ List , func }) => {
  

  const [selectedValues, setSelectedValues] = useState({});

  const handleDropdownChange = async (_id, selectedOption) => {
    setSelectedValues((prevValues) => ({ ...prevValues, [_id]: selectedOption }));
    console.log(_id, selectedOption);
    await updateStatus(_id, selectedOption);
    func();
  };





  return (


    
   
<div className="w-full mx-auto p-8">
<table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
  <thead>
    <tr>
      <th className="py-3 px-6 bg-gray-800 text-white font-bold uppercase tracking-wider text-center">Agency Name</th>
      <th className="py-3 px-6 bg-gray-800 text-white font-bold uppercase tracking-wider text-center">Ceo Name</th>
      <th className="py-3 px-6 bg-gray-800 text-white font-bold uppercase tracking-wider text-center">Status</th>
    </tr>
  </thead>
  <tbody>
    {List.map((item , index) => (
      <tr key={index} className="bg-gray-100 hover:bg-gray-200 transition duration-300">
        <td className="py-3 px-6 text-center">{item.Agencyname}</td>
        <td className="py-3 px-6 text-center">{item.CEO_Name} </td>
        <td className="py-3 px-6">
  <select
    className="block w-full px-4 py-2 leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
    value={selectedValues[item._id] || item.status}
    onChange={(e) => handleDropdownChange(item._id, e.target.value)}
  >
    <option value="Active">Active</option>
    <option value="InActive">InActive</option>
  </select>
</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  );
};