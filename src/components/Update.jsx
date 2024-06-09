import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const Update = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSubmit = () => {
    setIsEditable(false);
    // Save changes or perform any other actions with the input value
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      {isEditable ? (
        <div className="">
         
          <div>
          <input className="input-field" type="text"  placeholder='ex. CR12837193IN'/>

    </div>
          <button className="bg-red-400 " onClick={handleSubmit}>Save</button>
        </div>
      ) : (
        <div className=''>
          <button className="update-btn" onClick={handleEditClick}>Update</button>
        </div>
      )}

      {/* Display input value or saved value */}
      {!isEditable && inputValue && (
        <p>{inputValue}</p>
      )}
    </div>
  );
};

export default Update;
