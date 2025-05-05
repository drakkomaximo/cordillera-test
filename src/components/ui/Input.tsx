import React from 'react';

// Input normal reutilizable
export const CustomInput = ({
  label,
  placeholder,
  type = 'text',
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  [key: string]: any;
}) => (
  <div className="mb-4">
    <label className="block text-white mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-transparent border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      {...props}
    />
  </div>
);

// Input con ícono reutilizable
export const CustomInputWithIcon = ({
  label,
  placeholder,
  type = 'text',
  icon,
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode;
  [key: string]: any;
}) => (
  <div className="mb-4">
    <label className="block text-white mb-1 text-sm font-medium">{label}</label>
    <div className="flex items-center border border-white rounded-md bg-transparent px-4 py-3">
      <span className="mr-3 text-white flex-shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-white placeholder-gray-300"
        {...props}
      />
    </div>
  </div>
); 