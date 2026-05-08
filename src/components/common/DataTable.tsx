import React from 'react';
import { motion } from 'framer-motion';
interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}
interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyState?: React.ReactNode;
}
export function DataTable({ columns, data, emptyState }: DataTableProps) {
  if (data.length === 0 && emptyState) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {emptyState}
      </div>);

  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              {columns.map((column) =>
              <th
                key={column.key}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                style={{
                  width: column.width
                }}>
                
                  {column.label}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) =>
            <motion.tr
              key={rowIndex}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: rowIndex * 0.03
              }}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              
                {columns.map((column) =>
              <td key={column.key} className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {column.render ?
                column.render(row[column.key], row) :
                row[column.key]}
                  </td>
              )}
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}