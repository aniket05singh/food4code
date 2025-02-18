import React, { useContext, useRef } from 'react'
import { UserContext } from '../App'
const apiKey = import.meta.env.VITE_MAPPLS_API_KEY;

const StartingPage = () => {
    const {setLocation } = useContext(UserContext);
    const locRef = useRef();
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLocation(locRef.current.value); 
        console.log(locRef.current.value); 
        console.log(apiKey);
        try {
          console.log("trying")
          const response = await fetch(`http://localhost:5000/get-location?address=sonipat`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },});
          console.log("trying")
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          console.log("trying")
          const data = await response.json();
          if (!data.results || data.results.length === 0) {
            throw new Error("No location data found");
          }
      
          console.log("Location Data:", data);
        } catch (error) {
          console.error("Error:", error.message);
        }

    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-100">
  <form action="" className="bg-white p-6 rounded-2xl shadow-lg flex space-x-3">
    <input 
      type="text" 
        ref={locRef}
      placeholder="Enter your location" 
      className="px-4 py-2 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
    <button 
      className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
        onClick={(e) => handleSubmit(e)}
    >
      Submit
    </button>
  </form>
</div>

  )
}

export default StartingPage
