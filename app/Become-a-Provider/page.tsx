'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer/footer'  // Adjust the path based on your file structure
import { Navbar } from '@/components/navbar/navbar';

export default function BecomeProvider() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    practiceName: '',
    doctorSpecialty: '',
    email: '',
    phoneNumber: '',
    city: '',
    stateRegion: '',
    postalCode: '',
    higherCaseStats: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Redirect or show success message
    alert('Thank you for your interest! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-[#15161a] text-white flex flex-col">
      {/* Main Content */}
       <Navbar handleSmoothScroll={function (e: React.MouseEvent<HTMLAnchorElement>, targetId: string): void {
        throw new Error('Function not implemented.');
      } } />

      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-NeGrotesk text-[#d9edf7] tracking-tight">Become a provider</h1>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-NeGrotesk text-gray-300">
                  First Name<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-NeGrotesk text-gray-300">
                  Last Name<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Practice Name */}
              <div>
                <label htmlFor="practiceName" className="block text-sm font-NeGrotesk text-gray-300">
                  Practice Name<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="practiceName"
                    id="practiceName"
                    value={formData.practiceName}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Doctor Specialty */}
              <div>
                <label htmlFor="doctorSpecialty" className="block text-sm font-NeGrotesk text-gray-300">
                  Doctor Specialty<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <select
                    name="doctorSpecialty"
                    id="doctorSpecialty"
                    value={formData.doctorSpecialty}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" disabled>
                      SELECT
                    </option>
                    <option value="Orthodontist">Orthodontist</option>
                    <option value="Dentist(GP)">Dentist(GP)</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-NeGrotesk text-gray-300">
                  Email Address<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-NeGrotesk text-gray-300">
                  Phone Number<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-NeGrotesk text-gray-300">
                  City<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* State/Region */}
              <div>
                <label htmlFor="stateRegion" className="block text-sm font-NeGrotesk text-gray-300">
                  State/Region<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="stateRegion"
                    id="stateRegion"
                    value={formData.stateRegion}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-NeGrotesk text-gray-300">
                  Postal Code<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Higher Case Stats/Year */}
              <div className="sm:col-span-2">
                <label htmlFor="higherCaseStats" className="block text-sm font-NeGrotesk text-gray-300">
                  Aligner case starts / year:<span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="higherCaseStats"
                    id="higherCaseStats"
                    value={formData.higherCaseStats}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full bg-white text-black border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-NeGrotesk rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Schedule a Demonstration
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}