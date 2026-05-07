import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Download, Edit, Trash2, Workflow, DollarSign, CreditCard } from 'lucide-react';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';
import { Textarea } from '../components/forms/Textarea';
import { Switch } from '../components/forms/Switch';

const mockRules = [
  {
    id: 1,
    name: 'High Value Transaction Rule',
    description: 'Require 3DS for transactions above $1000',
    type: 'Amount Based',
    condition: 'Amount > $1000',
    action: 'Require 3DS',
    status: 'active'
  },
  {
    id: 2,
    name: 'Velocity Check',
    description: 'Block if more than 5 transactions in 1 hour',
    type: 'Velocity',
    condition: 'Count > 5 in 1 hour',
    action: 'Block & Alert',
    status: 'active'
  },
  {
    id: 3,
    name: 'International Transaction',
    description: 'Extra verification for cross-border',
    type: 'Geographic',
    condition: 'Merchant Country != Card Country',
    action: 'Require 3DS',
    status: 'active'
  }
];

const ruleTypeOptions = [
  { value: 'amount', label: 'Amount Based' },
  { value: 'velocity', label: 'Velocity Check' },
  { value: 'geographic', label: 'Geographic' },
  { value: 'time', label: 'Time Based' },
  { value: 'merchant', label: 'Merchant Category' }
];

const actionOptions = [
  { value: 'require_3ds', label: 'Require 3DS' },
  { value: 'block', label: 'Block Transaction' },
  { value: 'alert', label: 'Send Alert' },
  { value: 'block_alert', label: 'Block & Alert' },
  { value: 'review', label: 'Flag for Review' }
];

const conditionOperators = [
  { value: 'gt', label: 'Greater Than (>)' },
  { value: 'lt', label: 'Less Than (<)' },
  { value: 'eq', label: 'Equal To (=)' },
  { value: 'ne', label: 'Not Equal (!=)' },
  { value: 'between', label: 'Between' }
];

export function RuleEngineManagement() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    conditionField: '',
    conditionOperator: '',
    conditionValue: '',
    action: '',
    isActive: true,
    priority: 1
  });

  const handleAdd = () => {
    setSelectedRule(null);
    setFormData({
      name: '',
      description: '',
      type: '',
      conditionField: '',
      conditionOperator: '',
      conditionValue: '',
      action: '',
      isActive: true,
      priority: 1
    });
    setShowModal(true);
  };

  const handleEdit = (rule: any) => {
    setSelectedRule(rule);
    setFormData({
      name: rule.name,
      description: rule.description,
      type: rule.type,
      conditionField: '',
      conditionOperator: '',
      conditionValue: '',
      action: rule.action,
      isActive: rule.status === 'active',
      priority: 1
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setShowModal(false);
  };

  const filteredRules = mockRules.filter(rule =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rule Engine Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure transaction authentication rules</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" leftIcon={<Download size={18} />}>Export</Button>
          <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleAdd}>
            Add Rule
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <Input
          placeholder="Search rules by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Workflow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{rule.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{rule.type}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                rule.status === 'active' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
              }`}>
                {rule.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">{rule.description}</p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Condition:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">{rule.condition}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">Action:</p>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{rule.action}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => handleEdit(rule)} className="flex-1">
                Edit
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />} />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedRule ? 'Edit Rule' : 'Add New Rule'}
        size="xl"
        footer={
          <div className="flex items-center gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedRule ? 'Update Rule' : 'Create Rule'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Rule Name"
            placeholder="e.g., High Value Transaction Rule"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            leftIcon={<Workflow size={18} />}
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe what this rule does..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            required
          />

          <Select
            label="Rule Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={ruleTypeOptions}
            required
          />

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Condition Setup</h3>
            
            <Input
              label="Field to Check"
              placeholder="e.g., transaction_amount, card_country, etc."
              value={formData.conditionField}
              onChange={(e) => setFormData({ ...formData, conditionField: e.target.value })}
              helperText="The transaction field to evaluate"
              required
            />

            <Select
              label="Operator"
              value={formData.conditionOperator}
              onChange={(e) => setFormData({ ...formData, conditionOperator: e.target.value })}
              options={conditionOperators}
              required
            />

            <Input
              label="Value"
              placeholder="e.g., 1000, US, 5, etc."
              value={formData.conditionValue}
              onChange={(e) => setFormData({ ...formData, conditionValue: e.target.value })}
              helperText="The value to compare against"
              required
            />
          </div>

          <Select
            label="Action to Take"
            value={formData.action}
            onChange={(e) => setFormData({ ...formData, action: e.target.value })}
            options={actionOptions}
            helperText="What should happen when the condition is met"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Priority"
              type="number"
              min="1"
              max="100"
              placeholder="1-100"
              value={formData.priority.toString()}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
              helperText="Higher priority rules execute first"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <Switch
                label="Rule is Active"
                checked={formData.isActive}
                onChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> Rules are evaluated in priority order. Make sure to test rules before activating them in production.
            </p>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
