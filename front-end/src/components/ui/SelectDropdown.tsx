import React from 'react';

interface SelectDropdownProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  placeholder?: string;
  className?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = ""
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}      className={`
        w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        text-gray-900 bg-white
        ${className}
      `}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
