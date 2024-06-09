// Modalx Component
import React, { useState } from 'react'; // Add this import
import '@/app/globals.css';

const Modalx = ({  person, onsubmitID  }) => {
  
  
  const [inputValue, setInputValue] = useState('');
  

  const handleSubmit = () => {
    onsubmitID(inputValue);
  };

  return (
      
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h5 className="font-semibold text-lg text-white ">Enter the Tracking Id </h5>
    <h1 className='text-sm font-thin mb-5 text-gray-300' >For {person}</h1>
    <input type="text" placeholder="Type here" 
    className="input input-bordered input-success w-full max-w-xs text-white" 
    
    variant="flat" 
    label="text"
    onChange={(e) => setInputValue(e.target.value)}
    value={inputValue} 
    
    />
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button  className="btn btn-active mr-2">Close</button>
        <button onClick={handleSubmit} className="btn btn-active btn-neutral">Submit</button>
        
      </form>
    </div>
  </div>
</dialog>
    
  );
};

export default Modalx;
