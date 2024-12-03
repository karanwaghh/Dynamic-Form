import React from 'react';

const FormField = ({ field, value, onChange }) => {
  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
      case 'password':
        return <input type={field.type} name={field.name} value={value} onChange={onChange} required={field.required} className='ml-2 md:ml-4 text-sm md:text-lg text-white bg-transparent border-b-2 border-b-slate-500 my-5'/>;
      case 'dropdown':
        return (
          <select name={field.name} value={value} onChange={onChange} required={field.required} className='bg-pink-500 ml-4 h-8'>
            <option value="">Select...</option>
            {field.options.map((option, index) => (
              <option key={index} value={option} className=''>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      <label className='text-sm md:text-xl'>{field.label}</label>
      {renderField()}
    </div>
  );
};

export default FormField;
