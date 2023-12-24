"use client"

// pages/form.js
import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
    };

    setErrors(newErrors);

    // If there are no errors, proceed with form submission logic
    if (!newErrors.name && !newErrors.email) {
      // Perform your form submission logic here
      console.log('Form submitted:', formData);
    }
  };


  const [price, setPrice] = useState('');

  // Function to format the price with commas
  const formatPrice = (value) => {
    const numericValue = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString('en-US');
    } else {
      return value;
    }
  };

  // Event handler for input change
  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPrice(inputValue);
    setPrice(formattedValue);
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`appearance-none border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">Name is required</p>
          )}
        </div>
        <input
      type="text"
      value={price}
      onChange={handlePriceChange}
      placeholder="Enter price..."
      className="border p-2"
    />
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`appearance-none border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">Email is required</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
