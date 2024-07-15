'use client'


import React from "react";
import '@/app/globals.css';
import { useState, useEffect, useContext } from "react";
import {db} from '@/services/firebase';
import {collection, getDocs,doc, setDoc  } from 'firebase/firestore'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react"; 
import Modalx from '@/components/Modal.jsx';
import {Button} from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from "./Searchbar";




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
  const [filteredData, setFilteredData] = useState([])
  
  
  
  

  const findNameById = (id) => {
    const user = userdata.find((user) => user.id === id);
    
    return user ? user.Name.firstName : 'Name not found';
  };
  const username = findNameById(userId[0]);
  

  
  


  // useEffect(() => {
  //   async function fetchDataFromFirestore(userUid){
  //     const docRef = doc(collection(db, "users"), userUid);
  //     const docSnap = await getDocs(docRef);
    
  //     if (docSnap.exists()) {
        
  //       return console.log("RETURN SNAP",docSnap.data().trackingId); // returns trackingId of the user
  //     } else {
  //     
  //     }
  //   }    
  // },[])
 
  const [searchTerm, setSearchTerm] = useState("")


  const SearchProps = (value) => {
    setSearchTerm(value);
  };

  
  useEffect(() => {
    setFilteredData(
      userdata.filter((item) => {
        const name = `${item.Name.firstName} ${item.Name.lastName}`.toLowerCase();
        const phoneNumber = item.phone.toString().toLowerCase();
        return name.includes(searchTerm.toLowerCase()) || phoneNumber.includes(searchTerm.toLowerCase());
      })
    );

  
  }, [searchTerm]);



  useEffect(() =>{

    async function fetchData(){
      const data = await fetchDataFromFirestore();
      const limitedData = data.slice(0, 100); // Limit the userdata to 100 values
      setUserdata(limitedData);
    
      
      setIsLoading(false);
    }
    fetchData();
  },[])  
  

  
  
  
  async function addTrackingToFireStore(trackingId){
    try {
      
     
      
      const userDocRef = doc(db, "users", userId.toString());

      await setDoc(userDocRef, {
  
        TrackingId: trackingId,
      },
      { merge: true });

return true;
}
catch (error) {

  return false;
}
}
 
console.log(userdata)


const handleTrackingId = async (value) => {
  setTrackingId(value);

  const added = await addTrackingToFireStore(value);

  if (added) {
    toast.success('TrackingId updated!')
    // Fetch updated data from Firestore and update the userdata state
    const sample = await fetchDataFromFirestore();
    const updatedData = sample.slice(0, 100);
    console.log("updated *",updatedData)
    setUserdata(updatedData);
  } else {
    toast.error("Error adding tracking ID to Firestore", error)
  }
};

  




 const [isLoading, setIsLoading] = useState(true);



// const handleTrackingId = (value) => {
//   setTrackingId(value);
// };

const handleclick = () => {
  document.getElementById('my_modal_5').showModal()
}






  return (

    <>
    <div className="flex flex-col justify-center items-center  h-screen w-screen  custom-gradient-black">

<Searchbar props={SearchProps}/>


     <Toaster toastOptions={{ duration: 5000 }} position="bottom-right" />
    <div className=" h-4/5 w-4/5 main-div  backdrop-blur-2xl custom-gradient-grey bg-gray-800 rounded-lg">
   


    <Table 
     isHeaderSticky
     aria-label="Example table with dynamic content"
  
     classNames={{
       
       base: "overflow-y-auto",
       wrapper: "custom-gradient-grey p-0 pt-2 pl-1",
       table: "max-h-[720px]  custom-gradient-grey",
            th: "p-3 bg-zinc-900/opacity-0 rounded-[5px] shadow-inner border border-zinc-800 backdrop-blur-[22.57px]"
       
     }}
     
     
    >
  <TableHeader className="bg-transparent">
    
      <TableColumn className="" >Name</TableColumn>
      <TableColumn className="" >Contact</TableColumn>
      <TableColumn className="" >Address</TableColumn>
      <TableColumn className="" >Book</TableColumn>
      <TableColumn className="">Status</TableColumn>
    
  </TableHeader>
  <TableBody 
   className="bg-['#1c1b1b']"
  items={userdata}
            isLoading={isLoading}
            loadingContent={<span className="loading loading-dots loading-lg"></span>}
            
  >
   
  {filteredData.map((item, index) => (
      <TableRow 
      isStriped aria-label="Example static collection table"
      className="text-white " key={item.id} >
        <TableCell className="m-2 align-top">
          {!item.TrackingId && (
            <div className="red-dot ring-opacity-70 h-1.5 w-1.5 rounded-3xl "></div>
          )}
           {item.Name.firstName} {item.Name.lastName}
        </TableCell >
        <TableCell className="align-top">{item.phone}</TableCell>
        <TableCell className="align-top" >{item.Address.streetAddress + ", " + item.Address.city + ", " + item.Address.state + " - " + item.Address.zipCode}</TableCell>
        <TableCell className="align-top"> {item?.books?.map((book, index) => (
    <span key={index} className="border-cyan-900">
      {book.language} - {book.type} x {book.qty} {index < item.books.length - 1 ? ', ' : ''} <br />
    </span>
  ))}</TableCell>
        <TableCell className="align-top"
           isLoading={isLoading}>
          {userId[item.id] ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            <div >
              {item.TrackingId ? (
                <p >{item.TrackingId}</p>
              ) :  (
                <Button
                  className="update-btn"
                  key={index}
                  id={item.id}
                  onClick={() => {
                    // handleChange(); // Assuming handleChange is a function defined elsewhere
                    handleclick(); // Assuming handleclick is a function defined elsewhere
                    setUserid((prevEditable) => {
                      const newEditable = [...prevEditable]; // Create a copy of the array
                      newEditable[item.id] = true;
                      
                      const value = [item.id]// Set the specific index to true
                      return value;
                    });
                }}
                
                  // onOpenChange={onOpenChange} 
                  value={trackingId}
                  >
                  Update
                </Button>
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
  </>
    
  );
}

export default AdminPanel;