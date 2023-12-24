"use client"
import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

// export default function GoogleMapFinder() {
//     const [map, setMap] = useState(null);
//   const [center, setCenter] = useState({ lat: 0, lng: 0 });
//   const [selectedPlace, setSelectedPlace] = useState(null);

//   const containerStyle = {
//     width: '100%',
//     height: '100vh',
//   };

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   const onPlaceChanged = () => {
//     const place = autocomplete.getPlace();

//     if (place.geometry) {
//       setCenter({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//       setSelectedPlace({
//         name: place.name,
//         address: place.formatted_address,
//         location: {
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         },
//       });
//     }
//   };

//   const options = {
//     types: ['(cities)'],
//   };

//   let autocomplete;

//   useEffect(() => {
//     if (map) {
//       autocomplete = new window.google.maps.places.AutocompleteService();
//     }
//   }, [map]);


//   return (
//     <div className="relative h-screen">
//       <LoadScript googleMapsApiKey="AIzaSyAq-OloyVfWl2PTCxFlXQ0OGW_VvBmhCoQ">
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2} onLoad={onLoad}>
//           {selectedPlace && (
//             <Marker position={selectedPlace.location} title={selectedPlace.name} />
//           )}
//         </GoogleMap>

//         <div className="absolute top-4 left-4 p-4 bg-white rounded-lg shadow-md">
//           <label className="block text-sm font-medium text-gray-700">Search Location</label>
//           <div className="mt-1 relative rounded-md shadow-sm">
//             <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={options}>
//               <input
//                 type="text"
//                 name="location"
//                 id="location"
//                 className="mt-1 text-black p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
//                 placeholder="Enter a location..."
//               />
//             </Autocomplete>
//           </div>
//         </div>
//       </LoadScript>
//     </div>
//   );
// };



const Map = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");

  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAq-OloyVfWl2PTCxFlXQ0OGW_VvBmhCoQ',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  const center = { lat: 0, lng: 0 };

  // handle place change on search
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
    setSearchLngLat({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setCurrentLocation(null);
  };

  // get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // on map load
  const onMapLoad = (map) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");
    controlUI.innerHTML = "Get Location";
    controlUI.style.backgroundColor = "white";
    controlUI.style.color = "black";
    controlUI.style.border = "2px solid #ccc";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.style.width = "100%";
    controlUI.style.padding = "8px 0";
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    // const centerControl = new window.google.maps.ControlPosition(
    //   window.google.maps.ControlPosition.TOP_CENTER,
    //   0,
    //   10
    // );

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      controlDiv
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* search component  */}
      <Autocomplete
        onLoad={(autocomplete) => {
          console.log("Autocomplete loaded:", autocomplete);
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ["address_components", "geometry", "name"] }}
      >
        <input type="text" placeholder="Search for a location" />
      </Autocomplete>

      {/* map component  */}
      <GoogleMap
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "80%", height: "600px", margin: "auto" }}
        onLoad={onMapLoad}
      >
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </div>
  );
};

export default Map;