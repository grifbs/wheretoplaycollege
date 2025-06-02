// src/components/ui/select.js
import React from 'react';

const Select = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
