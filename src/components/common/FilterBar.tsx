import React from 'react';
import { Search } from 'lucide-react';
interface FilterField {
  type: 'search' | 'select';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options?: {
    value: string;
    label: string;
  }[];
}
interface FilterBarProps {
  fields: FilterField[];
}
export function FilterBar({ fields }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {fields.map((field, index) => {
        if (field.type === 'search') {
          return (
            <div key={index} className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all" />
              
            </div>);

        }
        if (field.type === 'select') {
          return (
            <select
              key={index}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all min-w-[150px]">
              
              <option value="">{field.placeholder}</option>
              {field.options?.map((option) =>
              <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )}
            </select>);

        }
        return null;
      })}
    </div>);

}