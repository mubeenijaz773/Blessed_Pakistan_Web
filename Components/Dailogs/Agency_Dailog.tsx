import React, { useState } from "react";
import { ServiceUrl } from '@/app/global';
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import EmailDialog from "./Email_Dailog";
import CallDialog from "./Call_Dailog";



const AgencyDialog = ({ onClose, item }) => {

  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const phoneNumber = '+1234567890'; // Replace with the actual phone number

  const handleCallButtonClick = () => {
    setShowCallDialog(true);
  };

  const handleEmailButtonClick = () => {
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = (formData:any) => {
    // console.log('Email form submitted:', formData);
    setShowEmailDialog(false);
  };







  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div className="w-full h-full overflow-y-auto bg-white text-black p-8 relative z-10">
        {/* Dialog content */}
      
        <div
            onClick={() =>onClose()}
            className=" relative p-2  mb-5 flex justify-end cursor-pointer"
          >
           <MdOutlineCancel className="w-6 h-6" />
          </div>
        <div  className='bg-white' >
<div className='w-full bg-white'>

<div className='w-full h-[400px] bg-white relative'>
<Image
  className="object-cover shadow-lg"
  src={`${ServiceUrl}/Add_Agency/?filename=${item.Bannerimages[0]['name']}`}
  alt="Banner"
  layout='fill'
/>
</div>




{/* Logo Image */}
<div className="bg-white w-[186px] h-[186px] rounded-full overflow-hidden absolute top-[430px] ml-[40px]   border-4 border-white shadow-md">

<div className='w-[300px] h-[300px] bg-white relative'>
  <Image
    src={`${ServiceUrl}/Add_Agency/?filename=${item.Logoimages[0]['name']}`}
    className="w-full h-full object-cover"
    alt="Logo"
    layout='fill'
 />
</div>

</div>

</div>

     




          <div className="container mx-auto  p-4 py-10 mt-20">    
      <div className="mb-8 mt-[30px]  bg-white shadow-lg border  ">
     
     <div className="w-full p-3 bg-gray-100">
       <text className="text-black font-sans font-semibold text-2xl" >OverView</text>
     </div>
    
<div className="p-5" >

 <div className="flex flex-col" >

<text className="text-black font-sans font-semibold text-xl" >Details & Description</text>
    <div className="border border-b-4 mt-1 w-[160px] rounded-lg border-blue-500 bg-blue-500 " /></div>

<div className="mt-10" >
<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
             
     <div className="w-full flex flex-row justify-between font-sans font-xs px-4 py-5  bg-gray-100">
                <span className="font-semibold ">CEO Name</span>{" "}
                {item.CEO_Name}
     </div>
     <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100">
                <span className="font-semibold">Agency</span> 
                
                {item.Agencyname}
    </div>
    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100">
                <span className="font-semibold">location</span> 
                
                {item.address}
    </div>
 
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100">
                <span className="font-semibold">Email</span> 
                
                {item.email}
    </div>
     
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100">
                <span className="font-semibold">City</span> 
                
                {item?.city}
    </div>

 </div>
 
  </div>
   
  <div className="flex flex-col mt-10" >
     <text className="text-black font-sans font-semibold text-xl" >Description</text>
      <div className="border border-b-4 mt-1 w-[70px] rounded-lg border-blue-500 bg-blue-500 " />
     </div>


     <div className="w-full py-5 mt-10 flex flex-col justify-between font-sans  px-4 bg-gray-100">
               {item.description}
              
    </div>
     

      </div>
    </div>
       
      </div>

                    {/* Agency StaFF */}

      <div className="container mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4 mt-4">AGENCY STAFF</h1>
           
<div  className='flex flex-row' >

{item.members.map((data , index) => (

  <>
     <div className='flex flex-row  items-center gap-10 w-[500px]  overflow-x-auto '>
            <div className='py-10' >           
            <div className="flex flex-col  card relative overflow-hidden border rounded-lg shadow-md bg-white w-[350px] h-auto ">
      <div className="card-image bg-cover bg-center w-full h-48 md:h-64" style={{ backgroundImage: 'url(/land6.jpeg)' }}></div>
      
      <div className="profile-photo absolute top-[210px] left-[140px] bg-white p-1 border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
  <Image   
 width={55} height={55}
 src="/pro.png" alt="Profile Photo" />
</div>

      <h1 className="text-xl flex justify-center items-center  font-semibold ml-4 mt-20">{data.name}</h1> 
     <div className='flex justify-between p-4'>
     <p>{data.designation}</p>  
      <p>{data.phone}</p>
     </div>
  
    </div>
    <div className='flex flex-row gap-2 w-[350px] mt-2' > 
<button
 onClick={handleEmailButtonClick} 
  className="px-7 py-3   bg-white text-blue-600    cursor-pointer relative  transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  border border-blue-600   m-2 font-sans font-medium text-sm rounded shadow-lg hover:shadow-xl ">
  Email
  </button>
<button 
onClick={handleCallButtonClick}
  className="px-24 py-3  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80   cursor-pointer relative  transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  text-white m-2 font-sans font-medium text-sm rounded shadow-lg hover:shadow-xl "
  >Call
</button>
</div>
</div>

</div> 

</>
))}
     </div>
     </div>
     
          {showCallDialog && (
            <CallDialog phoneNumber={phoneNumber} onClose={() => setShowCallDialog(false)} />
          )}

          {showEmailDialog && (
            <EmailDialog onClose={() => setShowEmailDialog(false)} onSubmit={handleEmailSubmit} />
          )}
        </div>
  

      </div>
    </div>
  );
};

export default AgencyDialog;
