import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { TiTickOutline } from "react-icons/ti";







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



  export default CallDialog;