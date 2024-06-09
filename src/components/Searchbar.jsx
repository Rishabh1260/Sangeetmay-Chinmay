import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';


const Searchbar = ({ props }) => {

    const handleSearch = (value) => {
        props(value);
    };
  return (
    <>
    <label className="input input-bordered flex items-center w-1/2 gap-5 mb-7 bg-zinc-900 rounded-[17px] shadow shadow-inner border border-zinc-800">
  <input type="text" className="grow bg-transparent text-white" placeholder="Search" 
   onChange={(e) => handleSearch(e.target.value)} 
  />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#808080" className="w-4 h-4 opacity-70 ">
    <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
</label>
</>
  )
}

export default Searchbar