import React, { useState } from 'react';

const TableDisplay = ({ data, columns, formType, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editValues, setEditValues] = useState({});

  const fieldKeyMap = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    'Age': 'age',
    'Street': 'street',
    'City': 'city',
    'State': 'state',
    'Zip Code': 'zipCode',
    'Card Number': 'cardNumber',
    'Expiry Date': 'expiryDate',
    'CVV': 'cvv',
    'Cardholder Name': 'cardholderName',
  };

  const handleEditClick = (index, rowData) => {
    setIsEditing(index);
    setEditValues({ ...rowData });
  };

  const handleSaveClick = (index) => {
    onEdit(index, editValues);
    setIsEditing(null);
    setEditValues({});
  };

  const handleCancelClick = () => {
    setIsEditing(null);
    setEditValues({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className='text-xl m-2 text-center capitalize'>{`${formType} Submitted Data`}</h2>
      <table className="w-full border-collapse border border-gray-500 mt-4">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-500 px-4 py-2">{column}</th>
            ))}
            <th className="border border-gray-500 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              {columns.map((column, colIndex) => {
                const fieldKey = fieldKeyMap[column]; // Mapping column name to actual field name
                return (
                  <td key={colIndex} className="border border-gray-500 px-4 py-2 ">
                    {isEditing === index ? (
                      <input
                        name={fieldKey}
                        value={editValues[fieldKey] || ''}
                        onChange={handleChange}
                        className="border border-gray-400 px-2 py-1 rounded text-black"
                      />
                    ) : (
                      row[fieldKey]
                    )}
                  </td>
                );
              })}
              <td className="border border-gray-500 px-4 py-2">
                {isEditing === index ?  (
                  <>
                    <button
                      className="tbutton bg-green-600 mr-2"
                      onClick={() => handleSaveClick(index)}
                    >
                      Save
                    </button>
                    <button
                      className="tbutton bg-gray-600"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="tbutton bg-blue-600 mr-2"
                      onClick={() => handleEditClick(index, row)}
                    >
                      Edit
                    </button>
                    <button
                      className="tbutton bg-red-600"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TableDisplay;