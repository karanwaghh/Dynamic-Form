import React, { useState, useEffect } from 'react';
import { fetchFormData } from './mockApi'; // Importing the mock API
import FormField from './FormField';
import ProgressBar from './ProgressBar';
import TableDisplay from './TableData';
import { toast } from 'react-hot-toast';

const DynamicForm = ({ formType }) => {
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [userData, setUserData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const loadFormData = async () => {
      const data = await fetchFormData(formType);
      setFormFields(data.fields);
      setFormValues({});
    };

    if (formType) {
      loadFormData();
    }
  }, [formType]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (formType) {
      case 'userInfo':
        setUserData([...userData, formValues]);
        break;
        case 'addressInfo':
          setAddressData([...addressData, formValues]);
          break;
        case 'paymentInfo':
          setPaymentData([...paymentData, formValues]);
          break;
        default:
          break;
      }
      setFormValues({});
      const toastId = toast.success("Form Submitted Successfully!");
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 1500);
    };
  
    const getTableColumns = () => {
      switch (formType) {
        case 'userInfo':
          return ['First Name', 'Last Name', 'Age'];
        case 'addressInfo':
          return ['Street', 'City', 'State', 'Zip Code'];
        case 'paymentInfo':
          return ['Card Number', 'Expiry Date', 'CVV', 'Cardholder Name'];
        default:
          return [];
      }
    };
  
    const getTableData = () => {
      switch (formType) {
        case 'userInfo':
          return userData;
        case 'addressInfo':
          return addressData;
        case 'paymentInfo':
          return paymentData;
        default:
          return [];
      }
    };
  
    const setTableData = (updatedData) => {
      switch (formType) {
        case 'userInfo':
          setUserData(updatedData);
          break;
        case 'addressInfo':
          setAddressData(updatedData);
          break;
        case 'paymentInfo':
          setPaymentData(updatedData);
          break;
        default:
          break;
      }
    };
  
    const handleEdit = (index, updatedRow) => {
      const currentData = getTableData();
      const updatedData = currentData.map((row, i) => (i === index ? updatedRow : row));
      setTableData(updatedData);

      const toastId = toast.success("Data updated successfully!");
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 1500);
    };
  
    const handleDelete = (index) => {
      const currentData = getTableData();
      const updatedData = currentData.filter((_, i) => i !== index);
      setTableData(updatedData);
      const toastId = toast.error("Data deleted successfully!");
      setInterval(() => {
        toast.dismiss(toastId)
      }, 1500);
    };
  
    const isFormBeingFilled = () => {
      return Object.values(formValues).some((value) => value.trim() !== '');
    };
  
    return (
      <div className="flex flex-col justify-center mt-8">
        {isFormBeingFilled() && (
          <ProgressBar formValues={formValues} formFields={formFields} />
        )}
        <form
          onSubmit={handleSubmit}
          className="h-full md:w-[50%] p-4 self-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
        >
          {formFields.map((field, index) => (
            <FormField
              key={index}
              field={field}
              value={formValues[field.name] || ''}
              onChange={handleFieldChange}
            />
          ))}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="text-xl font-bold bg-gray-700 px-5 py-3 rounded-lg mt-5 self-center hover:bg-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
  
        <TableDisplay
          data={getTableData()}
          columns={getTableColumns()}
          formType={formType}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    );
  };
  
  export default DynamicForm;
  