import React from "react";
import Image from "next/image";
import { PiArrowUpRightBold } from 'react-icons/pi'
import Footer from "../../Footer/page";

const SindhLandrecode = () => {
  return (
    <main className="bg-white" >
<div className="bg-white  min-h-screen  relative" >
      <div className="w-full relative h-[400px] shadow-lg bg-white">
        <Image
            src="/land6.jpeg"
            alt="Land Image"
            layout="fill"
            className="object-cover absolute top-0 left-0 transition-transform group-hover:scale-105"
        />
        <div className="w-full h-full bg-black opacity-10 absolute top-0 left-0" />
      </div>
      <div className="absolute ml-[20px] mt-[-400px] text-center">
         <h1 className="text-4xl font-sans font-bold  mt-[450px] ">
       Land Record Sindh
        </h1>
        <p className="text-lg px-10 mt-5 text-white w-[550px] ml-[315px]">
        Enhance transparency by using computerised land records to find verified details of any property
        </p>
       <div className="bg-white flex shadow-lg w-[1200px] h-[400px] rounded-lg mt-10" >
       <div className="w-[40%] h-[400px] overflow-hidden relative rounded-lg" >
<Image layout="fill" src="/quid.jpeg" className=" object-cover rounded-lg transform transition duration-500 hover:scale-150 " />

       </div>
       <div className="w-[60%] h-[400px] overflow-hidden " >
       <h1 className="text-3xl font-sans font-bold mt-20">
       Sindh Land Record
            </h1>
            <p className="text-gray-500 text-xl px-9 ml-[100px] w-[550px] mt-7 font-sans">
            Get all the details of any property unit in Sindh, such as transfer, location, and ownership history.
            </p>
            <div className="px-20 mt-20">
              <button className="mt-5 justify-center items-center w-full flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xl px-5 py-4 text-center mr-2 mb-5">
                Sindh Authority Land Record
                <PiArrowUpRightBold className="w-5 h-5" />
              </button>
            </div>
       </div>

</div>
      </div>
    
      </div>
      <SindhContent/>
      <Footer/>
 </main>
  );
};

export default SindhLandrecode;

const SindhContent=()=>{
    return(
<main className="bg-white h-full p-10 mt-[400px]">
    
<h1 className="text-black font-sans font-bold text-3xl w-full py-10 mt-[100px] " >About Land Records in Sindh</h1>
<p className="text-black font-sans  text-sm w-full text-left" > Most of the world has seen a shift from manual to digitised records, which also became one of the main purposes of initialising the Sindh Authority Land Records (SALR). For this, the computerisation of the Land Administration and Revenue Management Information System (LARMIS) has been carried out by the provincial Board of Revenue (BOR). The LARMIS is 6 terabytes in size, making it the largest database in Sindhi language. Millions of pages of land ownership records will alter the culture of corruption and bribery within and outside the department. Furthermore, following this example, other provinces in the country are also moving towards a computerised database of land records. Utilising a Geodatabase System (GIS), encroachments on state land have been identified on private, institutional, and park sites. The digitisation of land records has provided transparency and efficiency within property sphere of the province. The automation of stamps and registration of land records has offered the following benefits: - Automation of distribution of stamps & Demand Generation processes - Prevention of forgery in original documents - Access to status & online report generation of each land record - Transparency in stamp sales and revenue generation - Statistical analysis of full management reports Major benefits offered to the general public of Sindh: - Online access to property documents - Restriction on duplicate registrations - Instant search of missing/old records The computerised database of land records in Sindh will help reduce land ownership disputes, and increase the efficiency of real estate authentication. The newly designed system shows authenticated ownership records and the exact location of any said property. Not only this, the SALR aims to create a secure and transparent investment environment within the real estate industry of the province. At the same time, old settlement records and maps are preserved through chemical processing and digitisation.</p>

</main>

    );
}