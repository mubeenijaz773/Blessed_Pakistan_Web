"use client"
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "./footer.module.css"
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutubeSquare, faContao   } from '@fortawesome/free-brands-svg-icons';
import { faContactCard, faEnvelope, faLocation, faLocationPin, faMailBulk, faMapMarkerAlt, faPhone, faPhoneSquare} from '@fortawesome/free-solid-svg-icons';
import {FeedbackUser , ComplainUser} from "../../action/feedback";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCancel } from "react-icons/md";


function Footer() {


  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const [isComplainDialogOpen, setIsComplainDialogOpen] = useState(false);

  const handlefeedbackButtonClick = () => {
    setIsFeedbackDialogOpen(true);
  };

  const handlefeedbackCloseDialog = () => {
    setIsFeedbackDialogOpen(false);
  };



  const handlecomplainButtonClick = () => {
    setIsComplainDialogOpen(true);
  };

  const handlecomplainCloseDialog = () => {
    setIsComplainDialogOpen(false);
  };

  return (
    <footer className="bg-gray-900 h-[450px] text-white flex flex-col justify-center items-center p-10">
  
   <div className='flex justify-start gap-40' >
 
 <div>
   <h3 className="text-2xl text-white font-sans font-bold">Company</h3>
   <ToastContainer />
  <ul className='flex flex-col gap-2 font-sans text-sm mt-5 '>
        
              <li><a href="#" className="text-gray-500 hover:text-orange-500">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Jobs</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Help & Support</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Advertise On BLW</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Terms Of Use</a></li>
              
            </ul>
  </div>
        
        
 <div>
   <h3 className="text-2xl text-white font-sans font-bold">Connect</h3>
 
            <ul className='flex flex-col gap-2 font-sans text-sm mt-5 '>
        
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">News</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Forum</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Expo</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Blessed Pakistan Agents</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Add Property</a></li>
            </ul>
 </div>
       
 <div>
   <h3 className="text-2xl text-white font-sans font-bold">Head Office</h3>
 
            <ul className='flex flex-row  gap-2 font-sans text-sm mt-5 '>
              <div className='flex flex-col gap-8' >
                <li><a href="#" className="text-gray-500 hover:text-orange-500">
                  <FontAwesomeIcon color='white' icon={faMapMarkerAlt} className="text-xl hover:text-blue-700" /></a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">
                <FontAwesomeIcon color='white' icon={faPhone} className="text-xl hover:text-blue-700" /></a></li>
              <li><a href="#"  className="text-gray-500 hover:text-orange-500">
                <FontAwesomeIcon color='white' icon={faEnvelope} className="text-xl hover:text-blue-700" /></a></li>
            </div>
           <div className='flex flex-col gap-8' >
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Location</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Call Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500">Email Us</a></li>
              </div>
          

            </ul>        
 </div>
  





 <div className='flex flex-col gap-4' >
 <h1 className='text-2xl text-white font-sans font-bold' >
 Blessed Pakistan Website 
</h1>

<div className='flex' >
<img src='logo2.png' className='w-20 h-30' />
<div className='flex flex-col font-sans text-sm' >
<span>Blessed</span>
<span>Pakistan</span>
<span>Website</span>
</div>
</div>

<h1 className='text-2xl text-white font-sans font-bold' >
  Get Connected
</h1>

<div className="footer-social-icon font-sans ">
       <span className="text-white font-semibold text-xl mb-6 block">Follow us</span>
      <div className='flex flex-grow w-[55%]  flex-wrap gap-2'>
      <a href="#" className="text-white hover:text-blue-700 mr-4"><FontAwesomeIcon icon={faYoutubeSquare} className="text-3xl" /></a>
       <a href="#" className="text-white hover:text-blue-700 mr-4"><FontAwesomeIcon icon={faFacebook} className="text-3xl" /></a>
       <a href="#" className="text-white hover:text-blue-700 mr-4"><FontAwesomeIcon icon={faTwitter} className="text-3xl" /></a>
       <a href="#" className="text-white hover:text-blue-700 mr-4"><FontAwesomeIcon icon={faInstagram} className="text-3xl" /></a>
       <a href="#" className="text-white hover:text-blue-700 mr-4"><FontAwesomeIcon icon={faLinkedin} className="text-3xl" /></a>
      </div>
     
     </div>
     </div>

  </div>



<div className='flex gap-7'>

{/* /////////////////////////////  feedback ///////////////////////////////////// */}
<div>
<button className={style.button}  onClick={handlefeedbackButtonClick}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg>
  <p className={style.text}>FeedBack</p>
</button>


{isFeedbackDialogOpen && <FeedBackDialogBox onClose={handlefeedbackCloseDialog} />}
</div>



{/* ////////////////////////////// Complain  ////////////////////////////// */}

<div>
<button className={style.button}  onClick={handlecomplainButtonClick}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg>
  <p className={style.text}>Complain</p>
</button>

{isComplainDialogOpen && <ComplainDialogBox onClose={handlecomplainCloseDialog} />}

</div>




</div>


  </footer>
  
  );
}

export default Footer;



///////////////////////////////  Feedback //////////////////////////////////////////////////

const FeedBackDialogBox = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

useEffect(() =>{

  setEmail(localStorage.getItem("email"))

},[])


  const handleSubmit = async () => {
    setIsLoading(true);
var userid  = localStorage.getItem("_id")
         var data = await FeedbackUser(userid ,email , description) 
       
       if(email && description){
       
         if (data["status"] == 200) {

      
       toast.success('Your FeedBack Submit Successfully');
       setIsLoading(false);
        // Close the dialog box after submission
    onClose();
     } else if (data["status"] == 400) {
       toast.error("Error to Submit");
       setIsLoading(false);
     } else if (data["status"] == 404) {
       toast.error("Error to Submit");
       setIsLoading(false);
     }else{
       toast.error("Error to Submit")
       setIsLoading(false);
     }
    }else{
      toast.error("fill the required feilds")
      setIsLoading(false);
    }

 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <div className='flex justify-between'>
        <h2 className="text-2xl font-semibold mb-4 text-black">Feedback</h2>
<div onClick={onClose}> 
<MdCancel />
</div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 text-black p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder='your feedback.....'
            className="mt-1 p-3 border text-black rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
        <button className='border rounded-lg px-4 py-2 text-black' onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={handleSubmit}
          >
            {isLoading ? (
                    <div className="flex gap-1 justify-center items-center text-white text-xs">
                      {/* Replace with your loading spinner */}
                      Loading...
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      Submit
                    </div>
                  )}
          </button>
  
        </div>
      </div>
    </div>
  );
};




///////////////////////////////  Feedback //////////////////////////////////////////////////

const ComplainDialogBox = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

useEffect(() =>{

  setEmail(localStorage.getItem("email"))

},[])


  const handleSubmit = async () => {
    setIsLoading(true);
var userid  = localStorage.getItem("_id")
         var data = await ComplainUser(userid ,email , description) 
         if (data["status"] == 200) {

      
       toast.success('Your Complain Submit Successfully');
       setIsLoading(false);
        // Close the dialog box after submission
    onClose();
     } else if (data["status"] == 400) {
       toast.error("Error to Submit");
       setIsLoading(false);
     } else if (data["status"] == 404) {
       toast.error("Error to Submit");
       setIsLoading(false);
     }else{
       toast.error("Error to Submit")
       setIsLoading(false);
     }
 

 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-semibold mb-4">Feedback / Complaint</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 text-black p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            placeholder='your complain...'
            className="mt-1 p-3 border text-black rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button className='border rounded-lg px-4 py-2 text-black' onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={handleSubmit}
          >
            {isLoading ? (
                    <div className="flex gap-1 justify-center items-center text-white text-xs">
                      {/* Replace with your loading spinner */}
                      Loading...
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      Submit
                    </div>
                  )}
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};