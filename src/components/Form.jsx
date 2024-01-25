"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { redirect } from "next/navigation";
import sha256 from "crypto-js/sha256";

const Form = () => {
  const [productform, setProductForm] = useState({
    slug: "", // Make sure to add other properties here if needed
  });
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const router = useRouter();
  const [bookType, setBookType] = useState("Unsigned");
  const [price, setPrice] = useState(0);

  const handleBookTypeChange = (event) => {
    const selectedType = event.target.value;
    setBookType(selectedType);
    if (selectedType === "Signed") {
      setPrice(499);
    } else {
      setPrice(399);
    }
  };
  

  // Make Payment 
  const makePayment=async(e)=>{

    e.preventDefault();

    const transactionid = "Tr-"+uuidv4().toString(36).slice(-6);

    const payload = {
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
        merchantTransactionId: transactionid,
        merchantUserId: 'MUID-'+uuidv4().toString(36).slice(-6),
        amount: 10000,
        redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
        redirectMode: "POST",
        callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
        mobileNumber: '9999999999',
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };


      const dataPayload = JSON.stringify(payload);
      console.log(dataPayload);

      const dataBase64 = Buffer.from(dataPayload).toString("base64");
      console.log(dataBase64);


  const fullURL =
        dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
     const dataSha256 = sha256(fullURL);

      const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
      console.log("c====",checksum);



    const UAT_PAY_API_URL =
    "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";


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


  const redirect=response.data.data.instrumentResponse.redirectInfo.url;
  router.push(redirect)


  }

  

  const handleChange = (e) => {
    setProductForm({ ...productform, [e.target.name]: e.target.value });
  };

  return (
    <div className="border-b border-gray-900/10 p-20 m-20 bg-gray-900 rounded-2xl">
      <h2 className="text-base font-semibold leading-7 text-white">
        Personal Information
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>
      <form action="#" method="POST" >
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-white "
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-white"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
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
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              type="email"
              autoComplete="email"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              autoComplete="country-name"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
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
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="street-address"
              id="street-address"
              autoComplete="street-address"
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              required
              className="block w-full p-2 rounded-md border-0 py-1.5 text-white bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              required
              className="block w-full p-2 rounded-md border-0 py-2 text-white outline-none bg-custom-gray shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            className="block text-sm font-medium  leading-6 text-white "
          >
            ZIP / Postal code
          </label>

          <div className="mt-2">
            <input
              type="tel"
              name="postal-code"
              id="postal-code"
              autoComplete="postal-code"
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
            htmlFor="country"
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
            htmlFor="book type"
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
                  onChange={handleBookTypeChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="book-Signed"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Signed
                </label>
              </div>
              <div className="flex items-baseline gap-x-3">
                <input
                  id="book-unSigned"
                  name="type"
                  type="radio"
                  value="Unsigned"
                  onChange={handleBookTypeChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="book-unSigned"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Unsigned
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      </form>

      <div className="mt-10 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
        onClick={makePayment}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Proceed to Pay ₹ {price}
        </button>
      </div>
    </div>
  );
};
export default Form;
