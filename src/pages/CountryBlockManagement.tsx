import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Download, Edit, Trash2, Globe, Calendar } from 'lucide-react';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';
import { Textarea } from '../components/forms/Textarea';

const mockCountryBlocks = [
  {
    id: 1,
    countryCode: 'KP',
    countryName: 'North Korea',
    region: 'Asia',
    effectiveDate: '2024-01-01',
    status: 'active'
  },
  {
    id: 2,
    countryCode: 'IR',
    countryName: 'Iran',
    region: 'Middle East',
    effectiveDate: '2024-01-01',
    status: 'active'
  },
  {
    id: 3,
    countryCode: 'SY',
    countryName: 'Syria',
    region: 'Middle East',
    effectiveDate: '2024-01-15',
    status: 'active'
  }
];

const countryOptions = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'KP', label: 'North Korea' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SY', label: 'Syria' },
  { value: 'VE', label: 'Venezuela' }
];

const regionOptions = [
  { value: 'africa', label: 'Africa' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'middleeast', label: 'Middle East' },
  { value: 'americas', label: 'Americas' }
];

export function CountryBlockManagement() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    countryCode: '',
    countryName: '',
    region: '',
    effectiveDate: '',
    reason: ''
  });

  const handleAdd = () => {
    setSelectedCountry(null);
    setFormData({
      countryCode: '',
      countryName: '',
      region: '',
      effectiveDate: '',
      reason: ''
    });
    setShowModal(true);
  };

  const handleEdit = (country: any) => {
    setSelectedCountry(country);
    setFormData({
      countryCode: country.countryCode,
      countryName: country.countryName,
      region: country.region,
      effectiveDate: country.effectiveDate,
      reason: ''
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    setShowModal(false);
  };

  const filteredCountries = mockCountryBlocks.filter(country =>
    country.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.countryCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Country Block Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage restricted countries for transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" leftIcon={<Download size={18} />}>Export</Button>
          <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleAdd}>
            Add Country Block
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <Input
          placeholder="Search by country name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCountries.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{country.countryName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{country.countryCode}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Region: {country.region}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} />
                <span>Effective: {country.effectiveDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => handleEdit(country)} className="flex-1">
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
        title={selectedCountry ? 'Edit Country Block' : 'Add Country Block'}
        size="lg"
        footer={
          <div className="flex items-center gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedCountry ? 'Update Block' : 'Create Block'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Select
            label="Country"
            value={formData.countryCode}
            onChange={(e) => {
              const selected = countryOptions.find(c => c.value === e.target.value);
              setFormData({ 
                ...formData, 
                countryCode: e.target.value,
                countryName: selected?.label || ''
              });
            }}
            options={countryOptions}
            leftIcon={<Globe size={18} />}
            required
          />

          <Select
            label="Region"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            options={regionOptions}
            required
          />

          <Input
            label="Effective Date"
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
            leftIcon={<Calendar size={18} />}
            required
          />

          <Textarea
            label="Reason for Blocking"
            placeholder="Explain why transactions from this country are being blocked..."
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={4}
            required
          />

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Warning:</strong> Blocking a country will prevent all card transactions originating from or destined to this country.
            </p>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
