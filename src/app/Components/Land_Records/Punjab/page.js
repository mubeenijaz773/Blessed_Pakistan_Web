import React from "react";
import Image from "next/image";
import { PiArrowUpRightBold } from 'react-icons/pi'
import Footer from "../../Footer/page";

const PunjabLandrecode = () => {
  return (
    <main className="bg-white" >
<div className="bg-white  min-h-screen  relative" >
      
      <div className="w-full relative h-[400px] shadow-lg bg-white">
        <Image
         src="/land6.jpeg"
         alt="Land Image"
        className=" object-cover absolute top-0 left-0 transition-transform group-hover:scale-105"
        layout="fill"
        />
      </div>
      <div className="absolute ml-[20px] mt-[-400px] text-center">
         <h1 className="text-4xl font-sans font-bold  mt-[450px] ">
        Punjab Land Records
        </h1>
        <p className="text-lg px-10 mt-5 text-white w-[550px] ml-[315px]">
        Easily conduct your property transactions using certified documentation via computerised land records
        </p>
       <div className="bg-white flex shadow-lg w-[1200px] h-[400px] rounded-lg mt-10" >
       <div className="w-[40%] h-[400px] overflow-hidden relative rounded-lg" >
<Image layout="fill" src="/badsha.jpeg" className=" object-cover rounded-lg transform transition duration-500 hover:scale-150 " />

       </div>
       <div className="w-[60%] h-[400px] overflow-hidden " >
       <h1 className="text-3xl font-sans font-bold mt-20">
       Punjab Land Record Authority
            </h1>
            <p className="text-gray-500 text-xl px-9 ml-[100px] w-[550px] mt-7 font-sans">
            Get all the details of any property unit in Punjab, such as transfer, location, and ownership history.
            </p>
            <div className="px-20 mt-20">
              <button className="mt-5 justify-center items-center w-full flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xl px-5 py-4 text-center mr-2 mb-5">
                Punjab Land Record
                <PiArrowUpRightBold className="w-5 h-5" />
              </button>
            </div>
       </div>

</div>
      </div>
    
      </div>
      <Content/>
      <Footer/>
 </main>
  );
};

export default PunjabLandrecode;

const Content=()=>{
    return(
<main className="bg-white h-full p-10 mt-[400px]">
    
<h1 className="text-black font-sans font-bold text-3xl w-full py-10 mt-[100px] " >About Punjab Land Records</h1>
<p className="text-black font-sans  text-sm w-full text-left" > Punjab Land Records Authority (PLRA) is a platform that allows citizens to find verified property details. By computerising the land records in the province, PLRA enables you to explore information regarding any forms of ownership details and also seek data about its exact and official location — All within 30 minutes at the Arazi Record Centres (ARC). Land ownership and its administrative issues stand at the heart of property disputes in Pakistan. Keeping in view the fact that agriculture is the backbone of the economy and contributes around 18.9 % to Pakistan’s GDP, equitable land distribution holds paramount importance. Unfortunately, the problem of land acquisition and tenure insecurity have been growing with the passage of time. This necessitates the demand for computerising all the land records, thus, saving the rights of those hailing from the lower segments of the society. In this regard, the Government of Pakistan formulates its Poverty Reduction Strategy Paper — an in-depth four-pronged strategy to combat poverty. The most important objective of the project is to initiate a prompt and improved land records service delivery in the provinces to contribute long-lasting tenure security. Furthermore, for a more robust action, a project called Land Record Management and Information System (LRMIS) was put in place in Punjab by the joint collaboration of the federal government and the World Bank (WB) in 2007. The main objectives of this initiative were to: - Give complete access to land records in Punjab - Enhance transparency in land transactions - Increase the tenure security of land right holders Once the Project LRMIS was completed, the Government of Punjab stepped ahead to form the Punjab Land Records Authority (PLRA); the latter was formed through PLRA Act-2017. Administered by the provincial Board of Revenue, PLRA achieved many milestones in a short span of time. One of its outstanding achievements was the formation of Arazi Record Centers (ARC) in all the districts of Punjab. Apart from helping in the timely issuance of fards, the system eases down the process of registration of land mutation. All in all, in order to secure the rights of the poor farmers and landowners in Punjab, digital titling is extremely important. The computerising of land records in Punjab helps in extracting details, easily highlighting the rightful property owner with a click of a button. Now, people can easily find out details about the property and its ownership and online fards. Not only this, they can also get their property registered online within no time. </p>

</main>

    );
}