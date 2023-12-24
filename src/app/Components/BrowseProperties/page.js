"use client"
import React, { useState,useEffect,useRef } from 'react';
import { HomeList1, HomeList, AreaSize , Plots_Popular , Plots_Type , Plots_Area , Commercial_Popular , Commercial_Type , Commercial_Area } from '../../GetList';

import Link from 'next/link';
import { ServiceUrl } from '../../global';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';


function BrowseProperties({Purpose}) {
  const [images, setImages] = useState([]);
  // const [userid, setUserid] = useState('');
  const [activeTab, setActiveTab] = useState('Type');
  const [userid, setUserid] = useState('');
  const [activeTab2, setActiveTab2] = useState('Type');
  const [activeTab3, setActiveTab3] = useState('Type');
  const router = useRouter()




  useEffect(() => {
  
    setUserid(localStorage.getItem('_id'));
  }, []);

  const tabRefs = {
    Popular: React.createRef(),
    Type: React.createRef(),
    'Area Size': React.createRef(),
  };

  const moveIndicator = () => {
    const activeTabRef = tabRefs[activeTab];
    if (activeTabRef && activeTabRef.current) {
      const indicator = document.getElementById('tab-indicator');
      indicator.style.width = `${activeTabRef.current.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTabRef.current.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    moveIndicator();
  }, [activeTab]);


// Plots
  const tabRefs2 = {
    Popular: React.createRef(),
    Type: React.createRef(),
    'Area Size': React.createRef(),
  };

  const moveIndicator2 = () => {
    const activeTabRef2 = tabRefs[activeTab2];
    if (activeTabRef2 && activeTabRef2.current) {
      const indicator = document.getElementById('tab-indicator2');
      indicator.style.width = `${activeTabRef2.current.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTabRef2.current.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    moveIndicator2();
  }, [activeTab2]);

// commercials  
  const tabRefs3 = {
    Popular: React.createRef(),
    Type: React.createRef(),
    'Area Size': React.createRef(),
  };

  const moveIndicator3 = () => {
    const activeTabRef3 = tabRefs[activeTab3];
    if (activeTabRef3 && activeTabRef3.current) {
      const indicator = document.getElementById('tab-indicator3');
      indicator.style.width = `${activeTabRef3.current.offsetWidth}px`;
      indicator.style.transform = `translateX(${activeTabRef3.current.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    moveIndicator3();
  }, [activeTab3]);




  useEffect(() => {
    fetchImages();
    setUserid(localStorage.getItem('_id'));
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${ServiceUrl}/FetchProduct`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setImages(data['Productdata']);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };







  function GotToNextPage(){

    if(userid == "" || userid == null){
    
      router.push("/Components/Login")
      toast.error("You Have to First Login")
    }else{
    
  
    }
    
    
    
    }
    




    return (

      <main className='min-h-screen  p-2'>
      
      <h1 className=" text-black text-2xl font-semibold  font-sans h-full ml-[40px]  "   >Browse Property</h1>
      <div className='flex  justify-between gap-7 px-6 ' >
      {/* Homes */}
      
      
      <div className="border border-gray-300 rounded-lg bg-white shadow-lg w-[400px] h-auto my-4">
            <div className="flex p-2 mx-4">
              <img src="/r1.png" className="w-8 h-8 mt-1" />
              <h1 className="text-black p-2 relative font-semibold text-xl font-sans">Homes</h1>
            </div>
      
      
            {/* Tab bar */}
            <div className="flex justify-start gap-8 px-5 relative">
              {/* <div
                onClick={() => setActiveTab('Popular')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab === 'Popular'
                    ? 'border-b-2 font-sans font-medium border-blue-500 text-blue-500'
                    : 'text-gray-500 font-sans hover:text-blue-500 hover:border-blue-500'
                }`}
                ref={tabRefs.Popular}
              >
                Popular
              </div> */}
              <div
                onClick={() => setActiveTab('Type')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab === 'Type'
                    ? 'border-b-2 border-blue-500 font-sans font-medium text-blue-500'
                    : 'text-gray-500 hover:text-blue-500 font-sans hover:border-blue-500'
                }`}
                ref={tabRefs.Type}
              >
                Type
              </div>
              <div
                onClick={() => setActiveTab('Area Size')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab === 'Area Size'
                    ? 'border-b-2 border-blue-500 font-sans font-medium text-blue-500'
                    : 'text-gray-500 hover:text-blue-500 font-sans hover:border-blue-500'
                }`}
                ref={tabRefs['Area Size']}
              >
                Area Size
              </div>
              {/* Indicator bar */}
              <div
                id="tab-indicator"
                className="absolute bottom-0 left-0 bg-blue-500 h-2 transition-transform duration-300 ease-in-out"
                style={{ width: '160px', height: '3px' , borderRadius: '15px' }} // Set your desired height and width here
              ></div>
            </div>
      
            <div className="border border-b text-gray-950 bg-gray-950 h-0.5 rounded-lg" />
      
            {/* Content based on the active tab */}
            {/* {activeTab === 'Popular' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
            
                {HomeList1.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                  >
                   
                      <div className="flex flex-col py-2 space-x-2">
                        <text className="mt-1 font-bold text-black">{item.name}</text>
                        <p className="font-sans">{item.type}</p>
                      </div>
                 
                  </div>
                ))}
              </div>
            )} */}
      
            {/* You can add similar sections for 'Type' and 'Area Size' tabs */}
            {activeTab === 'Type' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
              {/* Populate items for the 'Popular' tab */}
              {/* Replace HomeList with your actual data */}
              {HomeList.map((item, index) => (
                <div
                  key={index}
                  className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                >
                  <Link href={`/Components/Property_Filter?purpose=${Purpose}&propertyType=Home&subType=${item.text}`}>
                    <div className="flex flex-col py-2 space-x-2">
                      <text className="mt-1 font-bold text-black ">{item.text}</text>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            )}
      
            {activeTab === 'Area Size' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
              {/* Populate items for the 'Popular' tab */}
              {/* Replace HomeList with your actual data */}
              {AreaSize.map((item, index) => (
                <div
                  key={index}
                  className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                >
                  <Link href={`/Components/Property_Filter?purpose=${Purpose}&propertyType=Home&Area_size=${item.name}`}>
                    <div className="flex flex-col py-2 space-x-2">
                      <text className="mt-1 font-bold text-black ">{item.name}</text>
                      <p className="font-sans">{item.type}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            )}
      </div>
      
      
      
      {/* Plots */}
      
      <div className="border border-gray-300 rounded-lg bg-white shadow-lg w-[400px] h-auto my-4">
            <div className="flex p-2 mx-4">
              <img src="/r1.png" className="w-8 h-8 mt-1" />
              <h1 className="text-black p-2 relative font-semibold text-xl font-sans">Plots</h1>
            </div>
      
      
            {/* Tab bar */}
            <div className="flex justify-start gap-8 px-5 relative">
              {/* <div
                onClick={() => setActiveTab2('Popular')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab2 === 'Popular'
                    ? 'border-b-2 font-sans font-medium border-blue-500 text-blue-500'
                    : 'text-gray-500 font-sans hover:text-blue-500 hover:border-blue-500'
                }`}
                ref={tabRefs2.Popular}
              >
                Popular
              </div> */}
              <div
                onClick={() => setActiveTab2('Type')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab2 === 'Type'
                    ? 'border-b-2 border-blue-500 font-sans font-medium text-blue-500'
                    : 'text-gray-500 hover:text-blue-500 font-sans hover:border-blue-500'
                }`}
                ref={tabRefs2.Type}
              >
                Type
              </div>
              <div
                onClick={() => setActiveTab2('Area Size')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab2 === 'Area Size'
                    ? 'border-b-2 border-blue-500 font-sans font-medium text-blue-500'
                    : 'text-gray-500 hover:text-blue-500 font-sans hover:border-blue-500'
                }`}
                ref={tabRefs2['Area Size']}
              >
                Area Size
              </div>
              {/* Indicator bar */}
              <div
                id="tab-indicator2"
                className="absolute bottom-0 left-0 bg-blue-500 h-2 transition-transform duration-300 ease-in-out"
                style={{ width: '100px', height: '3px' , borderRadius: '15px' }} // Set your desired height and width here
              ></div>
            </div>
      
            <div className="border border-b text-gray-950 bg-gray-950 h-0.5 rounded-lg" />
      
            {/* Content based on the active tab */}
            {/* {activeTab2 === 'Popular' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
              
                {Plots_Popular.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                  >
                
                      <div className="flex flex-col py-2 space-x-2">
                        <text className="mt-1 font-bold text-black">{item.name}</text>
                        <p className="font-sans">{item.type}</p>
                      </div>
                    
                  </div>
                ))}
              </div>
            )} */}
      
            {/* You can add similar sections for 'Type' and 'Area Size' tabs */}
            {activeTab2 === 'Type' && (
      
      <div className="grid grid-cols-3 gap-4 p-5 py-7">
                {/* Populate items for the 'Popular' tab */}
                {/* Replace HomeList with your actual data */}
                {Plots_Type.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                  >
                    <Link href={`/Components/Property_Filter?purpose=${Purpose}&propertyType=Plots&subType=${item.text}`}>
                      <div className="flex flex-col py-2 space-x-2">
                        <text className="mt-1 font-bold text-black ">{item.text}</text>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              )}
      
            {activeTab2 === 'Area Size' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
              {/* Populate items for the 'Popular' tab */}
              {/* Replace HomeList with your actual data */}
              {Plots_Area.map((item, index) => (
                <div
                  key={index}
                  className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                >
                  <Link href={`/Components/Property_Filter?purpose=${Purpose}&propertyType=Plots&Area_size=${item.name}`}>
                    <div className="flex flex-col py-2 space-x-2">
                      <text className="mt-1 font-bold text-black ">{item.name}</text>
                      <p className="font-sans">{item.type}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            )}
      </div>
      
      
      {/* Commercials */}
      
      
      
      
      <div className="border border-gray-300 rounded-lg bg-white shadow-lg w-[400px] h-auto my-4">
            <div className="flex p-2 mx-4">
              <img src="/r1.png" className="w-8 h-8 mt-1" />
              <h1 className="text-black p-2 relative font-semibold text-xl font-sans">Commercials</h1>
            </div>
      
      
            {/* Tab bar */}
            <div className="flex justify-start gap-8 px-5 relative">
              {/* <div
                onClick={() => setActiveTab3('Popular')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab3 === 'Popular'
                    ? 'border-b-2 font-sans font-medium border-blue-500 text-blue-500'
                    : 'text-gray-500 font-sans hover:text-blue-500 hover:border-blue-500'
                }`}
                ref={tabRefs3.Popular}
              >
                Popular
              </div> */}
              <div
                onClick={() => setActiveTab3('Type')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab3 === 'Type'
                    ? 'border-b-2 border-blue-500 font-sans font-medium text-blue-500'
                    : 'text-gray-500 hover:text-blue-500 font-sans hover:border-blue-500'
                }`}
                ref={tabRefs3.Type}
              >
                Type
              </div>
              <div
                onClick={() => setActiveTab3('Area Size')}
                className={`cursor-pointer py-2 text-center ${
                  activeTab3 === 'Area Size'
                    ? 'border-b-2 border-blue-500 font-sans font-medium text-blue-500'
                    : 'text-gray-500 hover:text-blue-500 font-sans hover:border-blue-500'
                }`}
                ref={tabRefs3['Area Size']}
              >
                Area Size
              </div>
              {/* Indicator bar */}
              <div
                id="tab-indicator3"
                className="absolute bottom-0 left-0 bg-blue-500 h-2 transition-transform duration-300 ease-in-out"
                style={{ width: '100px', height: '3px' , borderRadius: '15px' }} // Set your desired height and width here
              ></div>
            </div>
      
            <div className="border border-b text-gray-950 bg-gray-950 h-0.5 rounded-lg" />
      
            {/* Content based on the active tab */}
            {/* {activeTab3 === 'Popular' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
           
                {Commercial_Popular.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                  >
                   
                      <div className="flex flex-col py-2 space-x-2">
                        <text className="mt-1 font-bold text-black ">{item.name}</text>
                        <p className="font-sans">{item.type}</p>
                      </div>
                 
                  </div>
                ))}
              </div>
            )} */}
      
            {/* You can add similar sections for 'Type' and 'Area Size' tabs */}
            {activeTab3 === 'Type' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
              {/* Populate items for the 'Popular' tab */}
              {/* Replace HomeList with your actual data */}
              {Commercial_Type.map((item, index) => (
                <div
                  key={index}
                  className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                >
                  <Link href={`/Components/Property_Filter?purpose=${Purpose}&propertyType=Commercials&subType=${item.text}`}>
                    <div className="flex flex-col py-2 space-x-2">
                      <text className="mt-1 font-bold text-black ">{item.text}</text>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            )}
      
            {activeTab3 === 'Area Size' && (
              <div className="grid grid-cols-3 gap-4 p-5 py-7">
              {/* Populate items for the 'Popular' tab */}
              {/* Replace HomeList with your actual data */}
              {Commercial_Area.map((item, index) => (
                <div
                  key={index}
                  className="text-xs border flex justify-center  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500"
                >
                  <Link href={`/Components/Property_Filter?purpose=${Purpose}&propertyType=Commercials&Area_size=${item.name}`}>
                    <div className="flex flex-col py-2 space-x-2">
                      <text className="mt-1 font-bold text-black ">{item.name}</text>
                      <p className="font-sans">{item.type}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            )}
      </div>
      </div>
      </main>
      
      
      
      
      
      
      
        );
      }

export default BrowseProperties;