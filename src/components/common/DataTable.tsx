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
      <div className="bg-white rounded-xl border border-border">
        {emptyState}
      </div>);

  }
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-soft-bg border-b border-border">
            <tr>
              {columns.map((column) =>
              <th
                key={column.key}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                style={{
                  width: column.width
                }}>
                
                  {column.label}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
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
              className="hover:bg-soft-bg transition-colors">
              
                {columns.map((column) =>
              <td key={column.key} className="px-6 py-4 text-sm text-navy">
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