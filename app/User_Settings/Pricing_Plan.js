'use client'
import React, { useEffect, useState } from 'react';
import {SaveUserPackage ,checkSubscriptionStatus} from "@/app/action/Packages";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Userpricing = [
  {
    title: 'Basic',
    description: 'Best option for personal use & for your next project.',
    price: 10000,
    Ads : 10,
    features: [
      'Individual configuration',
      'Minimum 10 Ads Posts',
 
    ],
    buttonText: 'Subscribe',
  },
  {
    title: 'Professional',
    description: 'Relevant for multiple users, extended & premium support.',
    price: 20000,
    Ads : 20,
    features: [
      'Individual configuration',
      'Minimum 20 Ads Posts',

    ],
    buttonText: 'Subscribe',
  }
 
];

const AgentPricing =[
    {
        title: 'Basic',
        description: 'Best for large scale uses and extended redistribution rights.',
        price: 10000,
        Ads : 10,
        features: [
          'Individual configuration',
          'Minimum 10 Ads Posts',

        ],
        buttonText: 'Subscribe',
      },
      {
        title: 'Professional',
        description: 'Best for large scale uses and extended redistribution rights.',
        price: 20000,
        Ads : 20,
        features: [
          'Individual configuration',
          'Minimum 20 Ads Posts',
          
     
        ],
        buttonText: 'Subscribe',
      },
]



const PricingPlan = () => {

const [userRole , setUserRole] = useState('')


useEffect(() =>{

  setUserRole(localStorage.getItem('role') || "")
},[])




  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-6xl tracking-tight font-extrabold ">
  <span className="text-gradient-light-blue">
    Expl
  </span>
  <span className="text-gradient-light-gray">
    ore
  </span>
  
  <span className="text-gradient-light-blue">
    O
  </span>
  <span className="text-gradient-light-gray">
    ur
  </span>
 
  <span className="text-gradient-light-blue">
    Prop
  </span>
  <span className="text-gradient-light-gray">
  erty
    </span>
  
  <br/>
  <span className="text-gradient-light-blue text-center">
    Pack
  </span>
  <span className="text-gradient-light-gray">
  ages
    </span>
  
</h2>


<p className="mb-5 font-light text-gray-500 sm:text-lg dark:text-gray-400">
  Discover the perfect property solution for your needs. At Blessed Pakistan , we specialize in offering tailored packages that align with your goals and preferences. Our focus is on providing exceptional value and contributing to the growth of your property portfolio.
</p>
<ToastContainer />
        </div>

        {userRole === "user" && (
          <>
<h1 className=' font-semibold text-xl mt-7 mb-4'>For User</h1>
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          {Userpricing.map((card) => (
            <PricingCard key={card.title} {...card} />
          ))}
        </div>

</>
)}

{userRole === "agent" && (
          <>
        <h1 className=' font-semibold text-xl mt-7 mb-4'>For Agent</h1>
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          {AgentPricing.map((card) => (
            <PricingCard key={card.title} {...card} />
          ))}
        </div>
        </>
)}

      </div>
    </section>
  );
};

export default PricingPlan;





/////////////////////////////  Pricing Cards ////////////////////////////////////////////////









const PricingCard = ({ Ads , title, description, price, features, buttonText }) => {
  const [subscribed, setSubscribed] = useState(false);



useEffect(() =>{



checkUserSubscrib()

}, [])

async function checkUserSubscrib() {
  var _id =  localStorage.getItem('_id') || "";
     const subscriptionStatus = await checkSubscriptionStatus(_id, title); // Call the function

     if (subscriptionStatus.status == 200) {
      setSubscribed(true)
       return;
     }
}

  
  async function SubmitPackage(){
  var _id =  localStorage.getItem('_id') || "";
 let data =  await SaveUserPackage(_id  ,title , price , Ads )

 if(data.status == 200){
toast.success('Subscribed Successfully')
checkUserSubscrib()
 }else if(data.status == 400){
  toast.error('Error to Subscribe')
 }else if(data.status == 300){
  toast.error('Already Subscribed')
 }else{
  toast.error('Error to Subscribe')
 }
  }


  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{description}</p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">{price}</span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      
      </div>
     
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
         <p className='float-left p-2'>Ads Posted : {Ads}</p>
      </ul>
      <button
        onClick={SubmitPackage}
        className={`text-white ${subscribed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-primary-200'} font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900`}
        disabled={subscribed}
      >
        {subscribed ? 'Subscribed' : buttonText}
      </button>
    </div>
  );
};



