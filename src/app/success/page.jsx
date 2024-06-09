import React from 'react'


const page = () => {
  // const TransactionId = JSON.parse(sessionStorage.getItem('transactionId'));
  // console.log(TransactionId);
    return (
      <body class="flex flex-wrap justify-center  min-h-screen bg-gray-200">
      <div class="text-center mt-32">
          <h1 class="text-2xl font-semibold mb-4">Thank you for your purchase!</h1>
          <p class="text-lg mb-6">You'll soon receive your order invoice via email.</p>
          <a href="https://sangeetmaychinmay.com" class="text-black hover:underline">Back to home</a>
          <p class="text-lg mb-6">facing issue Contact Us</p>
      </div>
  </body>
      );
}

export default page
