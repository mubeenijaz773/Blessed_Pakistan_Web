


"use client"
import React,{useState} from 'react';
import { MdClose, MdMessage, MdOutlinePersonPin, MdSubject } from 'react-icons/md';
import { PiPhoneCallBold } from 'react-icons/pi';
import { HiOutlineMail } from 'react-icons/hi';
import { TbListDetails } from 'react-icons/tb';

// EmailDialog.js

const EmailDialog = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      yourname: '',
      phonenumber: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-[500px] rounded-md">
          <div className="flex bg-gray-100 shadow-md px-10 rounded-br-full py-6 justify-between items-center mb-4">
           <TbListDetails className="w-6 h-6" />
            <h2 className="text-2xl text-gray-700 font-bold">Contact Agencies</h2>
            <button onClick={onClose} className="bg-white p-2 rounded-full shadow-md hover:bg-slate-50 ">
              <MdClose className='text-black w-4 h-4'/>
            </button>
          </div>
          <form onSubmit={handleSubmit} className='p-6' >
            {/* Render your form input fields here */}
            <label htmlFor="firstName" className="flex mb-2 gap-2 text-xs font-semibold text-gray-800">
              <MdOutlinePersonPin className='w-4 h-4 mt-1 ' /> <span className='mt-1' >Name*</span>  
            </label>
            <input
              type="text"
              id="yourname"
              name="yourname"
              placeholder='Enter Your Name'
              value={formData.yourname}
              onChange={handleChange}
              className="w-full mb-4 p-2 py-4 text-xs bg-gray-50 shadow-md rounded-md focus:border-transparent focus:outline-none"
            />
   <label htmlFor="firstName" className="flex mb-2 gap-2 text-xs font-semibold text-gray-800">
              <PiPhoneCallBold className='w-4 h-4 mt-1 ' /> <span className='mt-1' >PhoneNubmer*</span>  
            </label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              placeholder='Enter Your phoneNumber'
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full mb-4 p-2 py-4 text-xs bg-gray-50 shadow-md rounded-md focus:border-transparent focus:outline-none"
            />
   <label htmlFor="firstName" className="flex mb-2 gap-2 text-xs font-semibold text-gray-800">
              <HiOutlineMail className='w-4 h-4 mt-1 ' /> <span className='mt-1' >Email*</span>  
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder='Enter Your Email adress'
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-2 py-4 text-xs bg-gray-50 shadow-md rounded-md focus:border-transparent focus:outline-none"
            />
   <label htmlFor="firstName" className="flex mb-2 gap-2 text-xs font-semibold text-gray-800">
              <MdSubject className='w-4 h-4 mt-1 ' /> <span className='mt-1' >Subject*</span>  
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder='Enter Your Subject'
              value={formData.subject}
              onChange={handleChange}
              className="w-full mb-4 p-2 py-4 text-xs bg-gray-50 shadow-md rounded-md focus:border-transparent focus:outline-none"
            />
   <label htmlFor="firstName" className="flex mb-2 gap-2 text-xs font-semibold text-gray-800">
              <MdMessage className='w-4 h-4 mt-1 ' /> <span className='mt-1' >Message*</span>  
            </label>
            <textarea
              rows={1}
              id="message"
              name="message"
              placeholder='Enter Your Message'
              value={formData.message}
              onChange={handleChange}
              className="w-full mb-4 p-2 py-4 text-xs bg-gray-50 shadow-md rounded-md focus:border-transparent focus:outline-none"
              />

            {/* Repeat for other fields */}
            <button
              type="submit"
              className="w-[450px] h-[50px]  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80   cursor-pointer relative  transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  text-white m-2 font-sans font-medium text-sm rounded shadow-lg hover:shadow-xl "
              >
              Send Your Question
            </button>
          </form>
        </div>
      </div>
    );
  };
  
export default EmailDialog;



