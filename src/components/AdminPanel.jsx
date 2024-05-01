'use client';

import React from "react";
import '@/app/globals.css';
import { useState, useEffect, useContext } from "react";
import {db} from '@/services/firebase';
import {collection, getDocs,doc, setDoc  } from 'firebase/firestore'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react"; 
import Modalx from '@/components/Modal.jsx';


import { Context } from '@/app/page';




async function fetchDataFromFirestore(){
  const querySnapshot = await getDocs(collection(db, "users"));

  const data = [];
  querySnapshot.forEach((docs) => {
    data.push({id:docs.id, ...docs.data()} )
  });
  return data
}





function AdminPanel() {
  const [userId, setUserid] = useState("");
  const [trackingId, setTrackingId] = useState(""); 
  const[userdata, setUserdata] = useState([]); 
  


  
  const findNameById = (id) => {
    const user = userdata.find((user) => user.id === id);
    
    return user ? user.firstName : 'Name not found';
  };
  
  const username = findNameById(userId[0]);
  
  
  
  
  useEffect(() =>{
    async function fetchData(){
      const data = await fetchDataFromFirestore();
      setUserdata(data);
      
      setIsLoading(false);
    }
    fetchData();
  },[])   

  useEffect(() => {
    async function fetchDataFromFirestore(userUid){
      const docRef = doc(collection(db, "users"), userUid);
      const docSnap = await getDocs(docRef);
    
      if (docSnap.exists()) {
        
        return console.log("RETURN SNAP",docSnap.data().trackingId); // returns trackingId of the user
      } else {
        console.log("No such document!");
      }
    }    
  },[])
 
  

  
  
  
  async function addTrackingToFireStore(trackingId){
    try {
      
      console.log("entered tracking id inside the addData function : ",trackingId.toString())
      
      const userDocRef = doc(db, "users", userId.toString());

      await setDoc(userDocRef, {
  
        TrackingId: trackingId,
      },
      { merge: true });
console.log("Document written with ID: ", userDocRef.id);
return true;
}
catch (error) {
  console.log("Error Adding Document",error);
  return false;
}
}
      

const handleTrackingId = async(value) => {
  // e.preventDefault();  
  setTrackingId(value);

const added = await addTrackingToFireStore(value);

if(added){
 alert("User Registered Successfully");
}else{
  alert("User Registration Failed");
}
}

  


 const [isLoading, setIsLoading] = React.useState(true);



// const handleTrackingId = (value) => {
//   setTrackingId(value);
// };
const handleclick = () => {
  document.getElementById('my_modal_5').showModal()
}


  return (

    <div className="flex items-center justify-center h-screen w-screen flex-direction-column custom-gradient-black">
    <div className=" h-4/5 w-4/5 main-div  backdrop-blur-2xl custom-gradient-grey bg-gray-800 rounded-lg">
   


    <Table 
     isHeaderSticky
    
  
     classNames={{
       
       base: "overflow-y-auto",
       wrapper: "custom-gradient-grey",
       table: "min-h-[720px]  custom-gradient-grey",
       
     }}
     
     
    >
  <TableHeader className="bg-transparent ">
    
      <TableColumn className="bg-[#1c1b1b]" >Name</TableColumn>
      <TableColumn className="bg-[#1c1b1b]" >Contact</TableColumn>
      <TableColumn className="bg-[#1c1b1b]" >Address</TableColumn>
      <TableColumn className="bg-[#1c1b1b]" >Book</TableColumn>
      <TableColumn className="bg-[#1c1b1b]">Status</TableColumn>
    
  </TableHeader>
  <TableBody 
   className="bg-['#1c1b1b']"
  items={userdata}
            isLoading={isLoading}
            loadingContent={<span className="loading loading-dots loading-lg"></span>}
            
  >
   
  {userdata.map((item, index) => (
      <TableRow 
      isStriped aria-label="Example static collection table"
      className="text-white" key={item.id} >
        <TableCell className="m-2 flex items-center">
          {!item.TrackingId && (
            <div className="red-dot ring-opacity-70 h-1.5 w-1.5 rounded-3xl"></div>
          )}
          {item.firstName + " " + item.lastName}
        </TableCell >
        <TableCell >{item.phone}</TableCell>
        <TableCell >{item.streetAddress + ", " + item.city + ", " + item.state + " - " + item.zipCode}</TableCell>
        <TableCell > {item?.books?.map((book, index) => (
    <span key={index} className="border-cyan-900">
      {book.language} - {book.type} x {book.qty} {index < item.books.length - 1 ? ', ' : ''} <br />
    </span>
  ))}</TableCell>
        <TableCell 
           isLoading={isLoading}>
          {userId[index] ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <div >
              {item.TrackingId ? (
                <p >{item.TrackingId}</p>
              ) :  (
                <button
                  className="update-btn  "
                  key={index}
                  id={item.id}
                  // onClick={() =>{ 
                  //   setIsEditable((prevEditable) => {
                  //     const newEditable = [...prevEditable]; // Create a copy of the array
                  //     newEditable[index] = true; // Set the specific index to true
                  //     return newEditable;
                  //   });
                  // }}
                  onClick={() => {
                    // handleChange(); // Assuming handleChange is a function defined elsewhere
                    setUserid((prevEditable) => {
                      const newEditable = [...prevEditable]; // Create a copy of the array
                      newEditable[item.id] = true;
                      const value = [item.id]// Set the specific index to true
                      return value;
                    });
                    setTimeout(() => {
                        handleclick(); // Assuming handleclick is a function defined elsewhere
                      }, 0);
                      
                }}
                
                  // onOpenChange={onOpenChange} 
                  value={trackingId}
                  >
                  Update
                </button>
              )}
            </div>
          )}
        </TableCell>
      </TableRow>
    ))}
      
  </TableBody>
</Table>
<Modalx  person={username} onsubmitID={handleTrackingId}  />

    </div>
  </div>
    
  );
}



export default AdminPanel;
