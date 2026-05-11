import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Download, Edit, Trash2, Workflow, X, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';

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

// Mock data for bins
const mockBins = [
  { id: '410283', name: '410283', scheme: 'visa' },
  { id: '445283', name: '445283', scheme: 'visa' },
  { id: '510283', name: '510283', scheme: 'mastercard' },
  { id: '552634', name: '552634', scheme: 'mastercard' },
];

const participantOptions = [
  { value: '', label: 'Select participant' },
  { value: 'paysys', label: 'Paysys' },
  { value: 'paytech', label: 'PayTech' },
  { value: 'finserv', label: 'FinServ' },
];

const currencyOptions = [
  { value: '', label: 'Select currency' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'JPY', label: 'JPY' },
];

interface RuleConfiguration {
  // Step 1
  participant: string;
  filterSchemes: string[];
  selectedBins: string[];
  
  // Step 2 - Transaction History
  transactionHistoryWeightage: string;
  lowActivityVelocity: number;
  lowActivityScore: number;
  mediumActivityVelocity: number;
  mediumActivityScore: number;
  highActivityVelocity: number;
  highActivityScore: number;
  lookbackPeriod: number;
  
  // Device Fingerprint
  deviceFingerprintWeightage: string;
  deviceScore: number;
  
  // Currency Code
  currencyCodeWeightage: string;
  currency: string;
  currencyScore: number;
  
  // Amount Threshold
  amountThresholdWeightage: string;
  lowAmountLimit: string;
  lowAmountScore: number;
  mediumAmountLimit: string;
  mediumAmountScore: number;
  highAmountLimit: string;
  highAmountScore: number;
  
  // Rule Activation
  effectiveDate: string;
}

export function RuleEngineManagement() {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [ruleConfig, setRuleConfig] = useState<RuleConfiguration>({
    participant: '',
    filterSchemes: [],
    selectedBins: [],
    transactionHistoryWeightage: '',
    lowActivityVelocity: 10,
    lowActivityScore: 10,
    mediumActivityVelocity: 50,
    mediumActivityScore: 40,
    highActivityVelocity: 100,
    highActivityScore: 70,
    lookbackPeriod: 30,
    deviceFingerprintWeightage: '',
    deviceScore: 30,
    currencyCodeWeightage: '',
    currency: '',
    currencyScore: 50,
    amountThresholdWeightage: '',
    lowAmountLimit: '',
    lowAmountScore: 0,
    mediumAmountLimit: '',
    mediumAmountScore: 0,
    highAmountLimit: '',
    highAmountScore: 0,
    effectiveDate: '',
  });

  const handleAdd = () => {
    setModalStep(1);
    setErrors({});
    setRuleConfig({
      participant: '',
      filterSchemes: [],
      selectedBins: [],
      transactionHistoryWeightage: '',
      lowActivityVelocity: 10,
      lowActivityScore: 10,
      mediumActivityVelocity: 50,
      mediumActivityScore: 40,
      highActivityVelocity: 100,
      highActivityScore: 70,
      lookbackPeriod: 30,
      deviceFingerprintWeightage: '',
      deviceScore: 30,
      currencyCodeWeightage: '',
      currency: '',
      currencyScore: 50,
      amountThresholdWeightage: '',
      lowAmountLimit: '',
      lowAmountScore: 0,
      mediumAmountLimit: '',
      mediumAmountScore: 0,
      highAmountLimit: '',
      highAmountScore: 0,
      effectiveDate: '',
    });
    setShowModal(true);
  };

  const handleSchemeToggle = (scheme: string) => {
    setRuleConfig(prev => ({
      ...prev,
      filterSchemes: prev.filterSchemes.includes(scheme)
        ? prev.filterSchemes.filter(s => s !== scheme)
        : [...prev.filterSchemes, scheme]
    }));
  };

  const handleBinToggle = (binId: string) => {
    setRuleConfig(prev => ({
      ...prev,
      selectedBins: prev.selectedBins.includes(binId)
        ? prev.selectedBins.filter(b => b !== binId)
        : [...prev.selectedBins, binId]
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!ruleConfig.participant) {
      newErrors.participant = 'Please select a participant';
    }
    if (ruleConfig.filterSchemes.length === 0) {
      newErrors.filterSchemes = 'Please select at least one scheme';
    }
    if (ruleConfig.selectedBins.length === 0) {
      newErrors.selectedBins = 'Please select at least one BIN';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Transaction History validation
    if (!ruleConfig.transactionHistoryWeightage || isNaN(Number(ruleConfig.transactionHistoryWeightage))) {
      newErrors.transactionHistoryWeightage = 'Enter transaction history weightage';
    }
    
    // Activity level validation
    if (ruleConfig.mediumActivityVelocity <= ruleConfig.lowActivityVelocity) {
      newErrors.mediumActivityVelocity = 'Medium Activity must be Less than Low Activity';
    }
    if (ruleConfig.highActivityVelocity <= ruleConfig.mediumActivityVelocity) {
      newErrors.highActivityVelocity = 'High Activity must be Less than Medium Activity';
    }
    
    // Device Fingerprint validation
    if (!ruleConfig.deviceFingerprintWeightage || isNaN(Number(ruleConfig.deviceFingerprintWeightage))) {
      newErrors.deviceFingerprintWeightage = 'Enter device fingerprint weightage';
    }
    
    // Currency Code validation
    if (!ruleConfig.currencyCodeWeightage || isNaN(Number(ruleConfig.currencyCodeWeightage))) {
      newErrors.currencyCodeWeightage = 'Enter currency code weightage';
    }
    
    // Amount Threshold validation
    if (!ruleConfig.amountThresholdWeightage || isNaN(Number(ruleConfig.amountThresholdWeightage))) {
      newErrors.amountThresholdWeightage = 'Enter amount threshold weightage';
    }
    if (!ruleConfig.lowAmountLimit) {
      newErrors.lowAmountLimit = 'Purchase amount required';
    }
    if (!ruleConfig.mediumAmountLimit) {
      newErrors.mediumAmountLimit = 'Purchase amount required';
    }
    if (!ruleConfig.highAmountLimit) {
      newErrors.highAmountLimit = 'Purchase amount required';
    }
    if (ruleConfig.mediumAmountScore <= ruleConfig.lowAmountScore) {
      newErrors.mediumAmountScore = 'Minimum score must be greater than 0';
    }
    if (ruleConfig.highAmountScore <= ruleConfig.mediumAmountScore) {
      newErrors.highAmountScore = 'Minimum score must be greater than 0';
    }
    
    // Effective Date validation
    if (!ruleConfig.effectiveDate) {
      newErrors.effectiveDate = 'Effective date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (modalStep === 1 && validateStep1()) {
      setModalStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      console.log('Submitting rule configuration:', ruleConfig);
      // Here you would typically save to Firebase or your backend
      setShowModal(false);
      setModalStep(1);
    }
  };

  const getFilteredBins = () => {
    if (ruleConfig.filterSchemes.length === 0) return mockBins;
    return mockBins.filter(bin => ruleConfig.filterSchemes.includes(bin.scheme));
  };

  const handleEdit = (rule: any) => {
    // Load existing rule config here
    console.log('Editing rule:', rule);
    setShowModal(true);
  };

  // Step 1 Modal Content - Add Rules
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Participant
        </label>
        <Select
          value={ruleConfig.participant}
          onChange={(e) => setRuleConfig({ ...ruleConfig, participant: e.target.value })}
          options={participantOptions}
        />
        {errors.participant && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle size={14} /> {errors.participant}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Filter Scheme
        </label>
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <button
            onClick={() => handleSchemeToggle('mastercard')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              ruleConfig.filterSchemes.includes('mastercard')
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            Mastercard
          </button>
          <button
            onClick={() => handleSchemeToggle('visa')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              ruleConfig.filterSchemes.includes('visa')
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
            }`}
          >
            Visa
          </button>
          <button
            onClick={() => {
              setRuleConfig({ ...ruleConfig, filterSchemes: [] });
            }}
            className="ml-auto p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>
        {errors.filterSchemes && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle size={14} /> {errors.filterSchemes}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bin Selection
        </label>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Chosen {ruleConfig.selectedBins.length}/{getFilteredBins().length} selected
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          {getFilteredBins().length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No bins found!</p>
              <p className="text-sm mt-1">Select a filter scheme above</p>
            </div>
          ) : (
            getFilteredBins().map((bin) => (
              <div
                key={bin.id}
                onClick={() => handleBinToggle(bin.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  ruleConfig.selectedBins.includes(bin.id)
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    ruleConfig.selectedBins.includes(bin.id) ? 'bg-white' : 'bg-primary-600'
                  }`} />
                  <span className="font-medium">{bin.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBinToggle(bin.id);
                  }}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        {errors.selectedBins && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle size={14} /> {errors.selectedBins}
          </p>
        )}
      </div>
    </div>
  );

  // Step 2 Modal Content - Set Configuration
  const renderStep2 = () => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      {/* Transaction History */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction History</h3>
        <div className="space-y-4">
          <div>
            <Input
              label="Set number of successful transactions"
              placeholder="Weightage"
              value={ruleConfig.transactionHistoryWeightage}
              onChange={(e) => setRuleConfig({ ...ruleConfig, transactionHistoryWeightage: e.target.value })}
            />
            {errors.transactionHistoryWeightage && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.transactionHistoryWeightage}</p>
            )}
          </div>

          {/* Low Activity */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Low Activity</label>
            <div className="space-y-3">
              <Input
                label="Transaction Velocity"
                type="number"
                value={ruleConfig.lowActivityVelocity}
                onChange={(e) => setRuleConfig({ ...ruleConfig, lowActivityVelocity: parseInt(e.target.value) || 0 })}
              />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.lowActivityScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ruleConfig.lowActivityScore}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, lowActivityScore: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Medium Activity */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Medium Activity</label>
            <div className="space-y-3">
              <Input
                label="Transaction Velocity"
                type="number"
                value={ruleConfig.mediumActivityVelocity}
                onChange={(e) => setRuleConfig({ ...ruleConfig, mediumActivityVelocity: parseInt(e.target.value) || 0 })}
              />
              {errors.mediumActivityVelocity && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.mediumActivityVelocity}</p>
              )}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.mediumActivityScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ruleConfig.mediumActivityScore}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, mediumActivityScore: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>

          {/* High Activity */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">High Activity</label>
            <div className="space-y-3">
              <Input
                label="Transaction Velocity"
                type="number"
                value={ruleConfig.highActivityVelocity}
                onChange={(e) => setRuleConfig({ ...ruleConfig, highActivityVelocity: parseInt(e.target.value) || 0 })}
              />
              {errors.highActivityVelocity && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.highActivityVelocity}</p>
              )}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.highActivityScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ruleConfig.highActivityScore}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, highActivityScore: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Number Of Days */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Number Of Days</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Evaluates the recency of user's transactions over a specified period.
        </p>
        <Input
          label="Lookback Period (days)"
          type="number"
          value={ruleConfig.lookbackPeriod}
          onChange={(e) => setRuleConfig({ ...ruleConfig, lookbackPeriod: parseInt(e.target.value) || 0 })}
        />
      </div>

      {/* Device Fingerprint */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Fingerprint</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Set score if device details differ from previous transactions
        </p>
        <div className="space-y-4">
          <Input
            placeholder="Weightage"
            value={ruleConfig.deviceFingerprintWeightage}
            onChange={(e) => setRuleConfig({ ...ruleConfig, deviceFingerprintWeightage: e.target.value })}
          />
          {errors.deviceFingerprintWeightage && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.deviceFingerprintWeightage}</p>
          )}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.deviceScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={ruleConfig.deviceScore}
              onChange={(e) => setRuleConfig({ ...ruleConfig, deviceScore: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Currency Code */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Currency Code</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Set score for transactions made in non-configured currencies
        </p>
        <div className="space-y-4">
          <Input
            placeholder="Weightage"
            value={ruleConfig.currencyCodeWeightage}
            onChange={(e) => setRuleConfig({ ...ruleConfig, currencyCodeWeightage: e.target.value })}
          />
          {errors.currencyCodeWeightage && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.currencyCodeWeightage}</p>
          )}
          <Select
            label="Currency"
            value={ruleConfig.currency}
            onChange={(e) => setRuleConfig({ ...ruleConfig, currency: e.target.value })}
            options={currencyOptions}
          />
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.currencyScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={ruleConfig.currencyScore}
              onChange={(e) => setRuleConfig({ ...ruleConfig, currencyScore: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Amount Threshold */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Amount Threshold</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Set amount limit</p>
        <div className="space-y-4">
          <Input
            placeholder="Weightage"
            value={ruleConfig.amountThresholdWeightage}
            onChange={(e) => setRuleConfig({ ...ruleConfig, amountThresholdWeightage: e.target.value })}
          />
          {errors.amountThresholdWeightage && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.amountThresholdWeightage}</p>
          )}

          {/* Low Amount */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Low Amount</label>
            <div className="space-y-3">
              <Input
                label="Safe Limit"
                placeholder="Purchase amount required"
                value={ruleConfig.lowAmountLimit}
                onChange={(e) => setRuleConfig({ ...ruleConfig, lowAmountLimit: e.target.value })}
              />
              {errors.lowAmountLimit && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.lowAmountLimit}</p>
              )}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.lowAmountScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ruleConfig.lowAmountScore}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, lowAmountScore: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Medium Amount */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Medium Amount</label>
            <div className="space-y-3">
              <Input
                label="Medium Limit"
                placeholder="Purchase amount required"
                value={ruleConfig.mediumAmountLimit}
                onChange={(e) => setRuleConfig({ ...ruleConfig, mediumAmountLimit: e.target.value })}
              />
              {errors.mediumAmountLimit && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.mediumAmountLimit}</p>
              )}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.mediumAmountScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ruleConfig.mediumAmountScore}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, mediumAmountScore: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              {errors.mediumAmountScore && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.mediumAmountScore}</p>
              )}
            </div>
          </div>

          {/* High Amount */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">High Amount</label>
            <div className="space-y-3">
              <Input
                label="High Limit"
                placeholder="Purchase amount required"
                value={ruleConfig.highAmountLimit}
                onChange={(e) => setRuleConfig({ ...ruleConfig, highAmountLimit: e.target.value })}
              />
              {errors.highAmountLimit && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.highAmountLimit}</p>
              )}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Score</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ruleConfig.highAmountScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={ruleConfig.highAmountScore}
                  onChange={(e) => setRuleConfig({ ...ruleConfig, highAmountScore: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
              </div>
              {errors.highAmountScore && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.highAmountScore}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rule Activation */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rule Activation</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Set the date from which the rule becomes active
        </p>
        <Input
          label="Effective Date"
          type="date"
          value={ruleConfig.effectiveDate}
          onChange={(e) => setRuleConfig({ ...ruleConfig, effectiveDate: e.target.value })}
          leftIcon={<Calendar size={18} />}
        />
        {errors.effectiveDate && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.effectiveDate}</p>
        )}
      </div>
    </div>
  );

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
        onClose={() => {
          setShowModal(false);
          setModalStep(1);
        }}
        title={modalStep === 1 ? 'Add Rules' : 'Set Configuration'}
        size="xl"
        footer={
          <div className="flex items-center gap-3 justify-end">
            <Button variant="outline" onClick={() => {
              setShowModal(false);
              setModalStep(1);
            }}>
              Cancel
            </Button>
            {modalStep === 1 ? (
              <Button variant="primary" onClick={handleNextStep} rightIcon={<ChevronRight size={18} />}>
                Set Configuration
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit}>
                Save
              </Button>
            )}
          </div>
        }
      >
        {modalStep === 1 ? renderStep1() : renderStep2()}
      </Modal>
    </motion.div>
  );
}
