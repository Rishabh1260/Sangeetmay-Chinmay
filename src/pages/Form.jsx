"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import sha256 from "crypto-js/sha256";
import {db} from "../services/firebase"
import { GrAdd } from "react-icons/gr";

import '@/app/globals.css';
import {doc, setDoc  } from "firebase/firestore";
import {Chip, Button} from "@nextui-org/react";





export default function Form()  {
  
 
  
  async function addDataToFireStore (firstName,lastName,email,phone,country,streetAddress,state,city,zipCode){
    try {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, {

    Name: {firstName:firstName,
      lastName: lastName,
    },
    email: email,
    phone: phone,
    Address:{
      streetAddress: streetAddress,
      state: state,
      city: city,
      zipCode: zipCode,
      Country: country,
    },
    books: books,
    createdAt: new Date(),
});
console.log("Document written with ID: ", userDocRef.id);
return true;
}
catch (error) {
  console.log("Error Adding Document",error);
  return false;
}
}




const router = useRouter();


// const [FirstName, setFirstnname] = useState("");
// const [LastName, setLastname] = useState("");

const [uid, setUid] = useState("");
// const [Email, setemail] = useState("");

useEffect(() => {
  if (router.isReady) {
    const { uid, displayName, Email } = router.query;
    if(displayName!== undefined){
      const [FirstName, LastName] = displayName.split(" ")
      console.log(FirstName, LastName)
      setFirstName(FirstName);
      setLastName(LastName);
      setUid(uid);
      setEmail(Email);

    }else{
      console.log("undefined")
    };
    
  }
}, [router]);





const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [country, setCountry] = useState("India");
const [streetAddress, setStreetAddress] = useState("");
const [state, setState] = useState("");
const [city, setCity] = useState("");
const [zipCode, setZipCode] = useState("");
const [language, setLanguage] = useState("");
const [bookType, setBookType] = useState("");
const [price, setPrice] = useState(0);
const [qty, setQty] = useState(1);
const [books, setBooks] = useState([]);

const [lastindex, setLastIndex] = useState(0);
const [Index, setIndex] = useState(0);




const bookCosts = {
  English: {
    Signed: 499,
    Unsigned: 350,
  },
  Hindi: {
    Signed: 450,
    Unsigned: 299,
  },
  "Please fill a value":{
    "BookType":0
  }
};
const handleindex = (index) => {
   return setLastIndex(index)
}



const handleSubmit = async(e) => {
  e.preventDefault();  
 const added = await addDataToFireStore(firstName,lastName,email,phone,country,streetAddress,state,city,zipCode,language,bookType);
  if(added){
   alert("User Registered Successfully");
  }else{
    alert("User Registration Failed");
  }
}

  const handleAdd = () =>{
    const lastBook = books[Index];
    
    if (
      lastBook &&
      lastBook.language === "Please fill a value" &&
      lastBook.bookType === "BookType" &&
      lastBook.qty === "qty"
    ) {
      // Show an alert prompting the user to select book and book type
      alert("Please select the book language, type, and quantity.");
    } else {
      const newindex = Index + 1;
      books[newindex] = {
        language: "Please fill a value",
        bookType: "BookType",
        qty: "qty"
      };
      setIndex(newindex);
    }
    
    setLanguage('');
    setBookType('');
      

    }

    
  
  
useEffect(() => {
  if (language) {
    const updateArray = [...books];
    updateArray[Index] = {
      language: language,
      type: bookType,
      qty: qty
    };
    setBooks(updateArray);
  }
}, [language, bookType, qty]);





function calculateTotalCost(books) {
  let totalCost = 0;

  for (const book of books) {
    const language = book.language;
    const booktype = book.type; 
    
    totalCost += bookCosts[language][booktype] * book.qty;
  }
  
  return totalCost;
}

  
  

useEffect(() => {
  if(books) {
 
    setPrice(calculateTotalCost(books));
  }
}, [books]);







 const handleClose = (orderToRemove) => {
  const updatedOrders = [...books]; // Create a copy of the orders array


if (orderToRemove !== -1) {
  updatedOrders.splice(orderToRemove, 1); // Remove the element at the specified index
  setBooks(updatedOrders);
  const newindex = Index - 1;
  return setIndex(newindex); // Update the state with the modified array
}

document.getElementById('book-unSigned').checked =false,
document.getElementById('book-Signed').checked =false,
document.getElementById('Book-English').checked =false,
document.getElementById('Book-Hindi').checked =false;
};


 
// console.log(language)
// console.log(bookType)


 



  const handleBookType = (event) => {
    // console.log(event.target.value)
    setBookType(event.target.value);
    // if (selectedType === "Signed") {
    //   setBookType("Signed");
    // } else {
    //   setBookType("Unsigned");
    // }
  };

  const handlelanguage = (event) => {
    console.log("book event",event.target.value)
    setLanguage(event.target.value);
    // if (selectedLanguage === "English") {
    //   setLanguage("English");
    // } else {
    //   setLanguage("Hindi");
    // }
  };
  

  
  const makePayment=async(e)=>{

 
    const transactionid = "Tr-"+uuidv4().toString(36).slice(-6);

    const payload = {
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
        merchantTransactionId: transactionid,
        merchantUserId: 'MUID-'+uuidv4().toString(36).slice(-6),
        amount: 1000,
        redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
        redirectMode: "POST",
        callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
        mobileNumber: '9999999999',
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };


      const dataPayload = JSON.stringify(payload);
      console.log(dataPayload)
      
      
      const dataBase64 = Buffer.from(dataPayload).toString("base64");
      console.log(dataBase64)
      


  const fullURL =
        dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
     const dataSha256 = sha256(fullURL);

      const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
      console.log("C===",checksum)
    



    const UAT_PAY_API_URL =
    "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
        {
          request: dataBase64,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
          },
        }
      );  
   
  
      if (response.data.success) {
        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        router.push(redirect);
      } else {
        console.error('Payment initiation failed:', response.data);
        alert('Payment initiation failed, please try again.');
      }
    } catch (error) {
      console.error('Error making payment request:', error);
      alert('An error occurred while processing your payment. Please try again.');
    }
  };

  console.log(books)


  

  return (
 
<div  style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white'  }} className="h-screen px-32 py-10 bg-black"> 
<div className="border-b border-gray-900 px-40 py-20 bg-gray-900 rounded-2xl">
      <h2 className="text-base font-semibold leading-7 text-white">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent Email address where you can receive Receipt.
      </p>
     
       <form onSubmit={handleSubmit}> 
  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    <div className="sm:col-span-3">
      <label
        htmlFor="first-name"
        className="block text-sm font-medium leading-6 text-white"
      >
        First name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="first-name"
          id="first-name"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="sm:col-span-3">
      <label
        htmlFor="lastName"
        className="block text-sm font-medium leading-6 text-white"
      >
        Last name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="lastName"
          id="lastName"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="sm:col-span-2">
      <label
        htmlFor="phone"
        className="block text-sm font-medium leading-6 text-white"
      >
        Phone
      </label>
      <div className="mt-2">
        <input
          id="Phone"
          name="Phone"
          type="tel"
          autoComplete="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="sm:col-span-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-white"
      >
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="sm:col-span-3">
      <label
        htmlFor="country"
        className="block text-sm font-medium leading-6 text-white"
      >
        Country
      </label>
      <div className="mt-2">
        <select
          id="country"
          name="country"
          autoComplete="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="">Select Country</option>
          <option>India</option>
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    </div>

    <div className="col-span-full">
      <label
        htmlFor="street-address"
        className="block text-sm font-medium leading-6 text-white"
      >
        Street address
        <p className="mt-1 text-sm leading-6 text-gray-600">Don't use City, State, Pin Code here</p>
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="streetAddress"
          id="streetAddress"
          autoComplete="street-address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="sm:col-span-2 sm:col-start-1">
      <label
        htmlFor="city"
        className="block text-sm font-medium leading-6 text-white"
      >
        City
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="city"
          id="city"
          autoComplete="address-level2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="sm:col-span-2">
      <label
        htmlFor="region"
        className="block text-sm font-medium leading-6 text-white"
      >
        State / Province
      </label>
      <div className="mt-2">
        <select
          name="state"
          id="state"
          autoComplete="address-level1"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="block w-full p-2 rounded-md border-0 py-2 text-white outline-none bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>
    </div>

    <div className="sm:col-span-2">
      <label
        htmlFor="postal-code"
        className="block text-sm font-medium leading-6 text-white"
      >
        ZIP / Postal code
      </label>
      <div className="mt-2">
        <input
          type="tel"
          name="zipCode"
          id="zipCode"
          autoComplete="postal-code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          className="block w-full rounded-md p-2 border-0 py-1.5 text-white shadow-sm bg-custom-gray sm:text-sm sm:leading-6 ring-1 ring-inset outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        />
      </div>
    </div>
  </div>

  <h2 className="text-base mt-12 font-semibold leading-7 text-white">
    Book Details
  </h2>
  <div className="mt-5 pl-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
    <div className="sm:col-span-1">
      <label
        htmlFor="book-language"
        className="block text-sm font-medium leading-6 text-white"
      >
        Book Language
      </label>
      <fieldset>
        <div className="mt-5 ml-4 space-y-2">
        <div className="flex gap-x-3">
                        <input
                            id="Book-English"
                            name="language"
                            type="radio"
                            value="English"
                            checked={language === "English"}
                            onChange={handlelanguage}
                            required
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                            htmlFor="Book-English"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            English
                        </label>
                    </div>
                    <div className="flex items-baseline gap-x-3">
                        <input
                            id="Book-Hindi"
                            name="language"
                            type="radio"
                            value="Hindi"
                            checked={language === "Hindi"}
                            onChange={handlelanguage}
                            required
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                            htmlFor="Book-Hindi"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            Hindi
                        </label>
                    </div>
        </div>
      </fieldset>
    </div>

    <div className="sm:col-span-1">
      <label
        htmlFor="book-type"
        className="block text-sm font-medium leading-6 text-white"
      >
        Book Type
      </label>
      <fieldset>
        <div className="mt-5 ml-4 space-y-2">
          <div className="flex gap-x-3">
            <input
              id="book-Signed"
              name="type"
              type="radio"
              value="Signed"
              checked={bookType === "Signed"}
              onChange={handleBookType}
              required
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="book-Signed"
              className="block text-sm font-medium leading-6 text-white"
            >
              Signed<span className="font-thin"> (with special note)</span>
            </label>
          </div>
          <div className="flex items-baseline gap-x-3">
            <input
              id="book-Unsigned"
              name="type"
              type="radio"  
              value="Unsigned"
              checked={bookType === "Unsigned"}
              onChange={handleBookType}
              required
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="book-Unsigned"
              className="block text-sm font-medium leading-6 text-white"
            >
              Unsigned
            </label>
          </div>
        </div>
      </fieldset>
    </div>

    <div className="sm:col-span-1">
      <label
        htmlFor="quantity"
        className="block text-sm font-medium leading-6 text-white"
      >
        Quantity
      </label>
      <div className="mt-5 ml-4 space-y-2">
        <div className="flex gap-x-3">
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="1"
            onChange={(e) => setQty(e.target.value)}
            min="1"
            required
            className="block w-32 p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  </div>
</form>

      
      {books[0]?.type  && books[0]?.language && (
  <div className="flex gap-4 m-5 border border-blue-500 p-2 rounded-xl overflow-x-auto ">
      {books.map((item, index) => (
        <Chip key={index} onClose={() => {handleClose(index), handleindex(index)}} >
          {item.language} {item.type} x {item.qty}
        </Chip>
      ))}




<Chip
        // startContent={<GrAdd size={18} />}
        variant="faded"
        className="flex-row items-center w-5 p-0"
        style={{cursor: "pointer"}}
        classNames=""
        onClick={handleAdd}
      >
        <GrAdd size={12}  />
      </Chip>
  

      

    </div>
)}
      <div className="mt-10 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={(e) => {
            e.preventDefault(); // prevent default form submission
            makePayment(); // call makePayment function
          }}
        >
          Proceed to Pay ₹ {price}
        </button>
      </div>
    </div>
    </div>  
    
  );
};

