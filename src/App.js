import React, { useState } from 'react';
import DynamicForm from './components/DynamicForm';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [formType, setFormType] = useState(''); // State for selected form type

  const handleFormSelection = (event) => {
    setFormType(event.target.value); // Update formType based on selection
  };

  return (
    <div className="min-h-full">
      <Header />
      
      <div className="form-container flex justify-center mt-10">
        <select 
          onChange={handleFormSelection} 
          className="h-14 bg-pink-500 text-white text-lg font-bold w-64 rounded-md"
        >
          <option value="">Select...</option>
          <option value="userInfo">User Information</option>
          <option value="addressInfo">Address Information</option>
          <option value="paymentInfo">Payment Information</option>
        </select>
      </div>
      
      {/* Conditionally render DynamicForm based on formType */}
      {formType && <DynamicForm formType={formType} />}
      
      <Footer />
      
      {/* Toaster Component for Toast notifications */}
      <Toaster />
    </div>
  );
};

export default App;
