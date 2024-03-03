"use client"
import { Ring } from "@uiball/loaders";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PiArrowUpRightBold } from "react-icons/pi";
import Footer from "../Footer/page";



const Landrecode = () => {
  const [isLoading,setIsLoading]=useState(false);
  const [isLoading1,setIsLoading1]=useState(false);

 const handlemove=()=>{
  setIsLoading1(true)
  setTimeout(() => {
    setIsLoading1(false)     
  }, 6000);
  
}

const handlemove1=()=>{
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 6000);
  
}
  return (
    <main className="bg-white" >
<div className="bg-white  min-h-screen  relative" >
      <div className="w-full relative h-[400px] shadow-lg bg-white">
        <Image
          src="/land6.jpeg"
          alt="Land Image"
          className=" object-cover  transition-transform group-hover:scale-105"
          layout="fill"
        />
        <div className="w-full h-full bg-black opacity-10 " />
      </div>

      <div className=" absolute ml-[100px] mt-[-330px]  flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-sans font-bold text-white">
  {`Blessed Pakistan Land Records`}
</h1>

        <p className="text-lg px-36 mt-5 text-white font-sans font-semibold">
          Providing you with an all-inclusive platform to help you get verified property details with digital convenience
        </p>
        <div className="flex flex-row mt-[100px] space-x-5 mb-[100px] ">
          
          <div className="bg-white  shadow-lg w-[500px] hover:border-2 hover:border-blue-500 hover:text-blue-500 h-[400px] rounded-lg  overflow-hidden group hover:shadow-xl transition-shadow">
           
            <h1 className="text-3xl font-sans font-semibold  mt-5">
              Punjab
            </h1>
            <p className="text-gray-500 px-9 mt-3 font-sans">
              Get verified land record details via Punjab Land Record Authority
              (PLRA)
            </p>
           
            <div className="px-10">
            <Link href={"/Land_Records/Punjab"} >
              <button onClick={handlemove} className="mt-5 justify-center items-center w-full flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-5">
                Punjab Land Record
                {isLoading1 ? (
                <div className="flex gap-1" >
                  <Ring
                    size={15}
                    lineWeight={5}
                    speed={2}
                    className="mt-1"
                    color="white"
                  />
                </div>
              ) : (
                <div className="flex gap-1" >
          <PiArrowUpRightBold className="w-5 h-5" />
                </div>
              )}
              </button>
              </Link>
            </div>
            <div className="h-[350px]  overflow-hidden relative">
              <Image
                src="/badsha.jpeg"
                alt="Punjab Land Record"
                className="object-cover rounded-lg transform transition duration-500 hover:scale-150"
                layout="fill"
              />
            </div>
          </div>

          <div className="bg-white w-[500px] shadow-lg rounded-lg h-[400px] hover:border-2 hover:border-blue-500 hover:text-blue-500   overflow-hidden group hover:shadow-xl transition-shadow"> 
            <h1 className="text-3xl font-sans font-semibold mt-5">
              Sindh
            </h1>
            <p className="text-gray-500 px-9 mt-3 font-sans">
              Acquire certified land record details via the Sindh Board of
              Revenue (BoR)
            </p>
            <div className="px-10">
            <Link href={"/Land_Records/Sindh"} >
            
              <button onClick={handlemove1}  className="mt-5 justify-center items-center w-full flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-5">
                Sindh Land Record
                {isLoading ? (
                <div className="flex gap-1" >
                  <Ring
                    size={15}
                    lineWeight={5}
                    speed={2}
                    className="mt-1"
                    color="white"
                  />
                </div>
              ) : (
                <div className="flex gap-1" >
          <PiArrowUpRightBold className="w-5 h-5" />
                </div>
              )}
              </button>
            </Link>
            </div>
            <div className="h-[350px] relative  overflow-hidden">
              <Image
                src="/Quid.jpeg"
                alt="Sindh Land Record"
                className=" object-cover rounded-lg  transform transition duration-500 hover:scale-150 "
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
 <Content/>
 </main>
  );
};

export default Landrecode;



const Content=()=>{
  return(
<main className="bg-white p-20 " >
<div className="flex flex-col justify-center items-center" >
<h1 className="text-black font-sans font-bold text-3xl mt-[200px] " >Information in Land Records</h1>
<p className="mt-10 w-[800px] text-center" >Prevent forgeries and counter discrepancies in documents with computerised details of original land records in your respective provinces</p>

<div className="flex flex-col  mt-[100px] w-full" >

<div className="flex flex-row justify-between" >
<div className=" bg-white rounded-full flex justify-center items-center w-[200px] h-[200px] shadow-lg relative " >
    <Image layout="fill" src="/records.jpeg" className=" rounded-full object-cover object-center " />
</div>
<div className=" bg-white rounded-full relative w-[200px] h-[200px] shadow-lg flex justify-center items-center " >
<Image layout="fill" src="/records.jpeg" className=" rounded-full object-cover object-center" />

</div>
<div className=" bg-white rounded-full relative w-[200px] h-[200px] shadow-lg  flex justify-center items-center " >
<Image layout="fill" src="/records.jpeg" className=" rounded-full object-cover object-center" />

</div>
</div>


<div className="flex flex-row justify-between mt-10 " >

<h1 className="text-black font-sans font-bold text-xl w-[250px] text-center" >All Records on Transfer of Land</h1>
<h1 className="text-black font-sans font-bold text-xl w-[250px] text-center" >Location & Addresses of Properties</h1>
<h1 className="text-black font-sans font-bold text-xl w-[200px] text-center" >All Records of Ownership</h1>

</div>

<div className="flex flex-row justify-between mt-10 " >

<p className="text-black font-sans  text-sm w-[250px] text-center" >
Save yourself from the hassle of traditional methods. Book an appointment and get your Fards and Mutation in a digital format.
</p>
<p className="text-black font-sans  text-sm w-[250px] text-center" >Find all the relevant details of any properties location, with its complete official address, including information such as tehsil, district, and tasla etc.</p>
<p className="text-black font-sans  text-sm w-[200px] text-center" >Check out all the ownership information of any property unit for transparent transactions, including possession history.</p>

</div>
</div>

<h1 className="text-black font-sans font-bold text-3xl w-full py-10 " >About Blessed Pakistan Records</h1>
<p className="text-black font-sans  text-sm w-full text-left" >As per the incumbent government’s stern stance on anti-corruption practices, the provincial Governments of Punjab and Sindh have embarked upon revolutionising the land record structure of their respective provinces. The initiative takes comprehensive steps including complete computerisation of land records in the provinces to introduce a modern change that will create a positive environment for the citizens. The modernising of land records in Punjab and Sindh will help eradicate the prevailing issues faced by the ongoing system including all forms of land ownership disputes. Having the land records in a computerised format removes the possibilities of counterfeit ownership documents and deeds, which generally take a long time to authenticate. Amongst these aforementioned objectives, another additional aim is to improve the service delivery timings and to enhance the overall perceived level of security and scrutiny of the process. It is pertinent to mention here that the government’s modern and tech-inclusive approach to transform the manual system of land records into an efficient, accountable, secure, and transparent mechanism is based on providing relief to the general population with their property transactions. Benefits of using Zameen Land Records We aim to help our customers make informed decisions, and allow them to secure their property by further elevating them to a secure investment environment. These steps have been taken by the respective governments of the provinces, however, to further increase its efficacy, Zameen Land Records provides an all-inclusive automated platform to help you with your property transactions.</p>



</div>
<Footer/>
</main>
  );
}


