"use client"
import React,{ useState , useEffect } from 'react';
import EmailDialog from '../AgentProfile/[id]/EmailDialog'; 
import {GetAgenciesById , GetAllAgenciesByUserId} from "../../action/Agency";
import { MdClose } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { IoCopyOutline } from 'react-icons/io5';
import { TiTickOutline } from 'react-icons/ti';
import { ServiceUrl } from '../../global';
import { DotSpinner,  } from "@uiball/loaders";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';



const AgentProfile = () => {
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [images, setImages] = useState([]);
  const [userid, setUserid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
const router  =  useSearchParams()
const pro = router.get('Agent') 

  useEffect(() => {
    const getUserData = async () => {
      const storedUserId = localStorage.getItem('_id');
      if (storedUserId) {
        setUserid(storedUserId);
      }
    };

    getUserData();
    fetchAgencyProfile()
  }, []);



  const fetchAgencyProfile = async () => {
    try {
      setIsLoading(true);

      
        const data = await GetAllAgenciesByUserId(userid);
        console.log(data, "data");
        setImages(data);
        setIsLoading(false);
    
    
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsLoading(false);
    }
  };


  const phoneNumber = '+1234567890'; // Replace with the actual phone number

  const handleCallButtonClick = () => {
    setShowCallDialog(true);
  };

  const handleEmailButtonClick = () => {
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = (formData) => {
    // Handle email form submission logic
    console.log('Email form submitted:', formData);
    setShowEmailDialog(false);
  };

return(

  <main className="min-h-screen bg-white text-gray-800">
  {isLoading ? (
     <div className="flex justify-center mt-[60px] mb-[60px] items-center">
     {isLoading && (
       <DotSpinner size={40} speed={0.9} color="blue" />
     )}
   </div>
  ) : (
    <>
      {images.map((item, index) => (
        <div key={index}>
       {/* Banner Image */}

<div className='w-full h-[300px] relative ' >
<Image
  className="object-cover rounded-lg shadow-lg"
  src={`${ServiceUrl}/Add_Agency/?filename=${item.Bannerimages[0]['name']}`}
  alt="Banner"
  layout='fill'
/>
</div>


{/* Logo Image */}
<div className="bg-white  rounded-full overflow-hidden absolute top-[230px] left-20   border-4 border-white shadow-md">
  <div className='w-[186px] h-[186px] relative' >
  <Image
    src={`${ServiceUrl}/Add_Agency/?filename=${item.Logoimages[0]['name']}`}
    className="w-full h-full object-cover"
    alt="Logo"
    layout='fill'
/>
</div>
</div>



     




          <div className="container mx-auto mt-[130px] p-4 py-10">
     
       
      <div className="mb-8 mt-[30px]  bg-white shadow-lg border rounded-tl-xl rounded-tr-xl ">
     
     <div className="w-full p-5 bg-gray-100 rounded-tl-xl rounded-tr-xl">
       <text className="text-black font-sans font-semibold text-2xl" >OverView</text>
     </div>
    
<div className="p-5" >
 

 <div className="flex flex-col" >

<text className="text-black font-sans font-semibold text-xl" >Details & Description</text>
    <div className="border border-b-4 mt-1 w-[160px] rounded-lg border-blue-500 bg-blue-500 " /></div>



<div className="mt-10" >
<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
             
     <div className="w-full flex flex-row justify-between font-sans font-xs px-4 py-5  bg-gray-100 rounded-full">
                <span className="font-semibold ">CEO Name</span>{" "}
                {item.CEO_Name}
     </div>
     <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100 rounded-full">
                <span className="font-semibold">Agency</span> 
                
                {item.Agencyname}
    </div>
    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100 rounded-full">
                <span className="font-semibold">location</span> 
                
                {item.address}
    </div>
 
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100 rounded-full">
                <span className="font-semibold">Email</span> 
                
                {item.email}
    </div>
 

   
    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100 rounded-full">
                <span className="font-semibold">City</span> 
                
                {item?.city}
    </div>

 
    
  

 </div>
 
  </div>
   
  <div className="flex flex-col mt-10" >
     <text className="text-black font-sans font-semibold text-xl" >Description</text>
      <div className="border border-b-4 mt-1 w-[70px] rounded-lg border-blue-500 bg-blue-500 " />
     </div>


     <div className="w-full py-5 mt-10 flex flex-col justify-between font-sans  px-4 bg-gray-100 rounded-tl-xl rounded-tr-xl">
               {item.description}
    </div>
     

      </div>
    </div>
       
      </div>



                    {/* Agency StaFF */}

      <div className="container mx-auto mt-8 ">
            <h1 className="text-2xl font-bold mb-4 mt-4">AGENCY STAFF</h1>
           

<div  className='flex flex-row '>

{item.members.map((data , index) => (
  <>
     <div className='flex flex-row flex-wrap justify-center  items-center gap-10 w-full '>
            <div className='py-10 w-full flex-wrap flex justify-center items-center ' >           
            <div className="flex flex-col  card relative overflow-hidden border rounded-lg shadow-md bg-white w-[350px] h-auto ">
      <div className="card-image bg-cover bg-center w-full h-48 md:h-64" style={{ backgroundImage: 'url(/land6.jpeg)' }}></div>
      
      <div className="profile-photo absolute top-[210px] left-[140px] bg-white p-1 border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
  <Image width={55} height={55} src="/pro.png" alt="Profile Photo" />
</div>
      <h1 className="text-xl flex justify-center items-center  font-semibold ml-4 mt-20">{data.name}</h1> 
     <div className='flex justify-between p-4'>
     <p>{data.designation}</p>  
      <p>{data.phone}</p>
     </div>
  
    </div>
    <div className='flex flex-row gap-2 w-[350px] mt-2' > 
<button onClick={handleEmailButtonClick} 
  className="px-7 py-3 rounded-full   bg-white text-blue-600    cursor-pointer relative  transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  border border-blue-600   m-2 font-sans font-medium text-sm  shadow-lg hover:shadow-xl ">
  Email
  </button>
<button onClick={handleCallButtonClick}
  className="px-24 py-3 rounded-full  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
   focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80   cursor-pointer relative  transform
    transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  text-white m-2 font-sans font-medium text-sm  shadow-lg hover:shadow-xl "
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
            <EmailDialog  onClose={() => setShowEmailDialog(false)} onSubmit={handleEmailSubmit} />
          )}
        </div>
      ))}
    </>
  )}



</main>
)
};


export default AgentProfile;






const CallDialog = ({ phoneNumber, onClose }) => {

  const [showTickIcon, setShowTickIcon] = useState(false);

  const handleCopyClick = () => {
    setShowTickIcon(true);

    navigator.clipboard.writeText(phoneNumber);
    
    // Hide the tick icon after 2 seconds
    setTimeout(() => {
      setShowTickIcon(false);
    }, 2000);
  };
  

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[400px] h-[300px] rounded-md">
      <div className="flex bg-gray-100 shadow-md px-10 rounded-br-full py-4 justify-between items-center mb-4">
           <TbListDetails className="w-6 h-6" />
            <h2 className="text-xl text-gray-700 font-bold">Contact Agencies</h2>
            <button onClick={onClose} className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 ">
              <MdClose className='text-black w-4 h-4'/>
            </button>
          </div>
        <div className="flex items-center mb-4 p-6">
          <div className="text-4xl mr-4">📱</div>
          <div>
            <div className="font-semibold text-sm">MOBILE NUMBER*</div>
            
            <p className='bg-gray-100 flex gap-2 px-3 py-2 shadow-md rounded-full text-xs mt-2' >
              <IoCopyOutline className='w-4 h-4' />
              {phoneNumber}</p>
          </div>
        </div>
        <div className='w-full  flex justify-center items-center' >
        <button
          onClick={handleCopyClick}
          className="px-24 h-[50px] flex gap-2 justify-center items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80   cursor-pointer relative  transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  text-white m-2 font-sans font-medium text-sm rounded shadow-lg hover:shadow-xl "
            >

        {showTickIcon ? (
<TiTickOutline className="w-5 h-5 text-white" /> 
        ):(
          <>

<IoCopyOutline className='w-4 h-4 text-white' />
          COPY
           
          </>
        )}
   
             
        </button>
        </div>
      </div>
    </div>
  );
};
