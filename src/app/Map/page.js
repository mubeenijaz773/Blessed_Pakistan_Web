'use client'
import React, { useState , useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF , OverlayView  } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 0, // Add your initial latitude here
  lng: 0, // Add your initial longitude here
};

const businessList = [
  {
    lat: 37.7749,
    lng: -122.4194,
    name: 'Business 1',
    image: '/area.png',
  },
  {
    lat: 40.7128,
    lng: -74.0060,
    name: 'Business 2',
    image: '/bell.png',
  },
  {
    lat: 34.0522,
    lng: -118.2437,
    name: 'Business 3',
    image: '/image.png',
  },
  {
    lat: 41.8781,
    lng: -87.6298,
    name: 'Business 4',
    image: '/pro.png',
  },
  // Add more businesses as needed
];


function GoogleMapView() {
  const [selectedBusiness, setSelectedBusiness] = useState(businessList[0]); // Set the initial selected business

  // This effect ensures that the map centers on the selected business when it loads
  useEffect(() => {
    center.lat = selectedBusiness.lat;
    center.lng = selectedBusiness.lng;
  }, [selectedBusiness]);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAq-OloyVfWl2PTCxFlXQ0OGW_VvBmhCoQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
        >
          {businessList.map((business, index) => (
            <>
          
            <MarkerF
              key={index}
              position={{ lat: business.lat, lng: business.lng }}
              icon={{
                url: '/circle.png',
                scaledSize: { width: 10, height: 10 },
              }}
            
            >
     
         <OverlayView
           position={{ lat: business.lat, lng: business.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
          
          <div className="bg-white w-[60px] h-auto rounded-lg flex justify-center items-center flex-col">
                <img src={business.image} className='w-[40px] h-[40px] object-cover ' alt={business.name} />
                <p className='mt-2' >{business.name}</p>
              </div>
         
            </OverlayView>
            </MarkerF>
            </>
          ))}
        </GoogleMap>
      </LoadScript>
    
    </div>
  );
}

export default GoogleMapView;