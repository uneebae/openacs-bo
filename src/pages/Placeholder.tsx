import React from 'react';
import { motion } from 'framer-motion';
import { EmptyState } from '../components/common/EmptyState';
import { BoxIcon } from 'lucide-react';
interface PlaceholderProps {
  title: string;
  breadcrumb?: string;
  icon: BoxIcon;
  emptyTitle: string;
  emptyDescription: string;
}
export function Placeholder({
  title,
  breadcrumb,
  icon,
  emptyTitle,
  emptyDescription
}: PlaceholderProps) {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.3
      }}
      className="space-y-6">
      
      <div>
        {breadcrumb &&
        <p className="text-sm text-gray-500 mb-2">{breadcrumb}</p>
        }
        <h1 className="text-3xl font-bold text-navy">{title}</h1>
      </div>

      <div className="bg-white rounded-xl border border-border min-h-[400px] flex items-center justify-center">
        <EmptyState
          icon={icon}
          title={emptyTitle}
          description={emptyDescription} />
        
      </div>
    </motion.div>);

}