import React from 'react'
import { useNavigate } from 'react-router-dom'; 

const page = () => {
    // const navigate = useNavigate()
    return (
      <body class="flex flex-wrap justify-center  min-h-screen bg-gray-200">
      <div class="text-center mt-32">
          <h1 class="text-2xl font-semibold mb-4">Oops, something went wrong!</h1>
          {/* <p class="text-lg mb-6"></p> */}
          <a href="https://sangeetmaychinmay.com" class="text-black hover:underline">Back to home</a>
      </div>
  </body>
      );
}

export default page
