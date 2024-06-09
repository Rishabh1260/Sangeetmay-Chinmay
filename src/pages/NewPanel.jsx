import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../services/firebase'; // Import your Firebase configuration file
import '@/app/globals.css';
import Modal from '@/components/Modal';

const columns = [
  { key: "name", label: "Name" },
 
  { key: "address", label: "Address" },
  { key: "bookType", label: "Book" },
  { key: "trackingId", label: "Status" },
];

export default function NewPanel() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  console.log(userData);
  
  
  const [trackingId, setTrackingId] = useState(""); 
  const [isEditable, setIsEditable] = useState(Array(10).fill(false));
  const handleEditClick = (index) => {
    const newIsEditable = [...isEditable];
    newIsEditable[index] = true;
    setIsEditable(newIsEditable);
    console.log("update : ", index)
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen flex-direction-column custom-gradient-black">
      <div className="h-4/5 w-4/5 main-div overflow-auto backdrop-blur-2xl custom-gradient-grey bg-gray-950 rounded-lg">
        <Table
          isHeaderSticky
          aria-label="Example table with client side sorting"
          classNames={{
            base: "overflow-y-auto",
            table: "min-h-[420px]",
          }}
        >
          <TableHeader columns={columns} isHeaderSticky>
            {(column) => <TableColumn className="font-color bg-zinc-800" key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody
            items={userData}
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
            className='p-5'
          >
            {(item,index) => (
              <TableRow className='p-2' key={item.id}>
                {(columnKey) => (
                  <TableCell className='py-10' key={columnKey}>
                    {columnKey === "name" ? (
                      <div className='min-w-[150px]'>
                        <div className='flex items-center'>
                        {!item.trackingId && (
                          <div className="red-dot ring-opacity-70 h-1.5 w-1.5 rounded-3xl"></div>
                        )}
                        <div>  {item.firstName} {item.lastName}</div></div>
                        <div className='text-sm text-gray-400 flex justify-end'>{item.phone}</div>
                      </div>
                    ) : columnKey === "address" ? (
                      <div className='font-light'>
                        {item.streetAddress}, {item.city}, {item.state} - {item.zipCode}
                      </div>
                    ) : columnKey === "bookType" ? (
                      <div>
                        {item.language} - {item.bookType}
                      </div>
                    ): columnKey === "trackingId" ? (
                      <div>
                         {item.TrackingId ? (
                <p>{item.TrackingId}</p>
              ) : (
                <button
                  className="update-btn mx-10 mr-20"
                  key={index}
                  id={index}
                  value={trackingId}
                  onChange={(e)=> setTrackingId(e.target.value)}
                  onClick={() => handleEditClick(index)}
                >
                  Update
                </button>
              )}
            </div>
                    ) : (
                      item[columnKey]
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}