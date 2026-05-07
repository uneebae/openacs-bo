import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Download, Edit, Trash2, CreditCard, AlertTriangle } from 'lucide-react';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';
import { Textarea } from '../components/forms/Textarea';
import { Switch } from '../components/forms/Switch';

const mockCardStatus = [
  {
    id: 1,
    cardRange: '4111 11** **** ****',
    status: 'Blocked',
    reason: 'Suspected fraud',
    effectiveDate: '2024-03-01',
    expiryDate: '2024-06-01',
    createdBy: 'John Anderson'
  },
  {
    id: 2,
    cardRange: '5500 00** **** ****',
    status: 'Suspended',
    reason: 'Temporary hold - verification required',
    effectiveDate: '2024-03-10',
    expiryDate: '2024-03-20',
    createdBy: 'Sarah Chen'
  },
  {
    id: 3,
    cardRange: '3782 82** **** ****',
    status: 'Monitored',
    reason: 'High-value transactions pattern',
    effectiveDate: '2024-03-05',
    expiryDate: '2024-04-05',
    createdBy: 'Mike Johnson'
  }
];

const statusOptions = [
  { value: 'blocked', label: 'Blocked' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'monitored', label: 'Monitored' },
  { value: 'restricted', label: 'Restricted' }
];

const reasonOptions = [
  { value: 'fraud', label: 'Suspected Fraud' },
  { value: 'stolen', label: 'Lost/Stolen' },
  { value: 'verification', label: 'Verification Required' },
  { value: 'high_risk', label: 'High Risk Pattern' },
  { value: 'customer_request', label: 'Customer Request' },
  { value: 'compliance', label: 'Compliance Hold' }
];

export function CardStatusManagement() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardRange: '',
    status: '',
    reason: '',
    reasonDetails: '',
    effectiveDate: '',
    expiryDate: '',
    notifyCardholder: false,
    autoExpire: true
  });

  const handleAdd = () => {
    setSelectedCard(null);
    setFormData({
      cardNumber: '',
      cardRange: '',
      status: '',
      reason: '',
      reasonDetails: '',
      effectiveDate: '',
      expiryDate: '',
      notifyCardholder: false,
      autoExpire: true
    });
    setShowModal(true);
  };

  const handleEdit = (card: any) => {
    setSelectedCard(card);
    setFormData({
      cardNumber: '',
      cardRange: card.cardRange,
      status: card.status.toLowerCase(),
      reason: '',
      reasonDetails: card.reason,
      effectiveDate: card.effectiveDate,
      expiryDate: card.expiryDate,
      notifyCardholder: false,
      autoExpire: true
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setShowModal(false);
  };

  const filteredCards = mockCardStatus.filter(card =>
    card.cardRange.includes(searchQuery) ||
    card.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Card Status Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage card blocking and monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" leftIcon={<Download size={18} />}>Export</Button>
          <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleAdd}>
            Add Card Status
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <Input
          placeholder="Search by card range or reason..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center shadow-lg ${
                  card.status === 'Blocked' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                  card.status === 'Suspended' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                  'bg-gradient-to-br from-yellow-500 to-yellow-600'
                }`}>
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white font-mono">{card.cardRange}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.reason}</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>Effective: {card.effectiveDate}</p>
                <p>Expires: {card.expiryDate}</p>
                <p>By: {card.createdBy}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => handleEdit(card)} className="flex-1">
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
        title={selectedCard ? 'Edit Card Status' : 'Add Card Status'}
        size="xl"
        footer={
          <div className="flex items-center gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleSubmit}>
              {selectedCard ? 'Update Status' : 'Apply Status'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Card Number or Range"
            placeholder="4111 1111 **** **** or 4111 11** **** ****"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            leftIcon={<CreditCard size={18} />}
            helperText="Use * for wildcard to apply to card range"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Status Action"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={statusOptions}
              helperText="Action to apply to the card"
              required
            />
            <Select
              label="Reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              options={reasonOptions}
              required
            />
          </div>

          <Textarea
            label="Reason Details"
            placeholder="Provide additional details about why this action is being taken..."
            value={formData.reasonDetails}
            onChange={(e) => setFormData({ ...formData, reasonDetails: e.target.value })}
            rows={3}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Effective Date"
              type="date"
              value={formData.effectiveDate}
              onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
              helperText="When the status becomes active"
              required
            />
            <Input
              label="Expiry Date"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              helperText="When the status expires (optional)"
            />
          </div>

          <div className="space-y-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Switch
              label="Notify Cardholder"
              checked={formData.notifyCardholder}
              onChange={(checked) => setFormData({ ...formData, notifyCardholder: checked })}
            />
            <Switch
              label="Auto-expire after expiry date"
              checked={formData.autoExpire}
              onChange={(checked) => setFormData({ ...formData, autoExpire: checked })}
            />
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Warning:</strong> This action will immediately affect all transactions for the specified card(s). Ensure you have verified the card details before proceeding.
            </p>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
