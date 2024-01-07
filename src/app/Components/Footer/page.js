"use client"
import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "./footer.module.css"
import { faInstagram, faFacebook, faTwitter, faLinkedin, faYoutubeSquare, faContao   } from '@fortawesome/free-brands-svg-icons';
import { faContactCard, faEnvelope, faLocation, faLocationPin, faMailBulk, faMapMarkerAlt, faPhone, faPhoneSquare} from '@fortawesome/free-solid-svg-icons';
import {FeedbackUser , ComplainUser} from "../../action/feedback";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCancel, MdFeedback } from "react-icons/md";
import Image from 'next/image';


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
    <footer className="bg-gray-900 h-[550px] text-white flex flex-col justify-center items-center p-10 py-10">
  
   <div className='flex justify-start gap-40' >
 
 <div>
   <h3 className="text-2xl text-white font-sans font-bold">Company</h3>
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

<div className='flex gap-2 ' >
  <div className='w-[170px] h-[170px] relative' >
<Image src="/logo_app.jpg" className=' object-center object-contain' layout='fill' />
</div>
<div className='flex flex-col font-sans font-bold text-lg mt-10' >
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
<MdFeedback className='w-4 h-4 mt-1 text-white' />
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] relative">
<div className='absolute right-3 top-3'  onClick={onClose}> 
<MdCancel className='w-7 h-7 text-blue-600 cursor-pointer' />
</div>

        <h3 className="mb-3 text-center text-4xl font-extrabold text-gray-900">FeedBack</h3>
          
          <label  className="mb-2 text-sm text-start text-gray-900">Email*</label>
          <input 
          id="email"
           type="email"
            placeholder="mail@gmail.com" 
            value={email}
            onChange={(e)=> setEmail(e.target.value) }  
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-400 bg-gray-200 text-gray-900 rounded-2xl"/>
       
        <label  className="mb-2 text-sm text-start text-gray-900">Description*</label>
          <textarea 
            id="description"
            rows="3"
            placeholder='your feedback.....'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-400 bg-gray-200 text-gray-900 rounded-2xl"/>
  
        <div className="flex justify-center ">
          <button onClick={handleSubmit} type='submit' className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96
           rounded-2xl hover:bg-blue-700  ">
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] relative">
<div className='absolute right-3 top-3'  onClick={onClose}> 
<MdCancel className='w-7 h-7 text-blue-600 cursor-pointer' />
</div>

        <h3 className="mb-3 text-center text-4xl font-extrabold text-gray-900">Complaint</h3>
          
          <label  className="mb-2 text-sm text-start text-gray-900">Email*</label>
          <input 
          id="email"
           type="email"
            placeholder="mail@gmail.com" 
            value={email}
            onChange={(e)=> setEmail(e.target.value) }  
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-400 bg-gray-200 text-gray-900 rounded-2xl"/>
       
        <label  className="mb-2 text-sm text-start text-gray-900">Description*</label>
          <textarea 
            id="description"
            rows="3"
            placeholder='your feedback.....'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-400 bg-gray-200 text-gray-900 rounded-2xl"/>
  
        <div className="flex justify-center ">
          <button onClick={handleSubmit} type='submit' className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96
           rounded-2xl hover:bg-blue-700  ">
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