import React from 'react';
import { motion } from 'framer-motion';
interface Tab {
  id: string;
  label: string;
  count?: number;
}
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}
export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-border">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                relative px-6 py-3 text-sm font-medium transition-colors
                ${isActive ? 'text-primary' : 'text-gray-600 hover:text-navy'}
              `}>
              
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.count !== undefined &&
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-xs font-semibold
                    ${isActive ? 'bg-primary-50 text-primary' : 'bg-gray-100 text-gray-600'}
                  `}>
                  
                    {tab.count}
                  </span>
                }
              </span>
              {isActive &&
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }} />

              }
            </button>);

        })}
      </div>
    </div>);

}