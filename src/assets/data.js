import React from "react";

import {db} from '@/services/firebase';
import {collection, getDocs,doc, setDoc  } from 'firebase/firestore'
const columns = [
  {name: "NAME", uid: "name"},
  {name: "Contact", uid: "contact"},
  {name: "ADDRESS", uid: "address"},
  {name: "TrackingId ID", uid: "TrackingId"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Management",
    status: "Delivered",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
    TrackingId: ""
    
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    status: "Pending",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Development",
    status: "Delivered",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Marketing",
    status: "Dispatch",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Sales",
    status: "Dispatch",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 6,
    name: "William Howard",
    role: "Community Manager",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Marketing",
    status: "Dispatch",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 7,
    name: "William Howard",
    role: "Community Manager",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Marketing",
    status: "Dispatch",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 8,
    name: "William Howard",
    role: "Community Manager",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Marketing",
    status: "Dispatch",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    TrackingId: "CD34567890IN"
  },
  {
    id: 9,
    name: "William Howard",
    role: "Community Manager",
    
    contact : '7229991260',
    address : {street:"71,shastri nagar, khempura", state:"Udaipur", pincode:313001},
    team: "Marketing",
    status: "Dispatch",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
    TrackingId: "CD34567890IN"
  },



];


async function fetchDataFromFirestore(){
    const querySnapshot = await getDocs(collection(db, "users"));
  
    const data = [];
    querySnapshot.forEach((docs) => {
      data.push({id:docs.id, ...docs.data()} )
    });
    return data
  }





export {columns, users};
