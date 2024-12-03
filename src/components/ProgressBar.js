import React from 'react';

const ProgressBar = ({ formValues, formFields }) => {
  const completedFields = Object.keys(formValues).filter(
    (key) => formValues[key] !== '' && formFields.some((field) => field.name === key && field.required)
  ).length;

  const progress = (completedFields / formFields.length) * 100;

  return (
    <div className="progress-bar mb-5 w-[75%] self-center">
      <div style={{ width: `${progress}%` }} className="progress"></div>
    </div>
  );
};

export default ProgressBar;
