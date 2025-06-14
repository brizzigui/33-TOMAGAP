import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  isSelected,
  onClick,
  className = ""
}) => {  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? 'border-indigo-500 bg-indigo-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
        ${className}
      `}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <Icon 
          className={`w-8 h-8 ${isSelected ? 'text-indigo-600' : 'text-gray-600'}`} 
        />
        <h3 className={`font-semibold text-sm ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-xs ${isSelected ? 'text-indigo-700' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-indigo-600 rounded-full"></div>
      )}
    </div>
  );
};
