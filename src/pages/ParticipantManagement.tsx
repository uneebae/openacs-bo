import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Download, Edit, Trash2, Building2, Mail, Phone, MapPin, ArrowRight, ArrowLeft, Check, CreditCard, MessageSquare, Palette, Layout, Eye, MessageCircle, Globe, Smartphone, Lock } from 'lucide-react';
import { Modal } from '../components/forms/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Button } from '../components/forms/Button';
import { Textarea } from '../components/forms/Textarea';
import { Switch } from '../components/forms/Switch';
import { Checkbox } from '../components/forms/Checkbox';
import { FileUpload } from '../components/forms/FileUpload';

const mockParticipants = [
  {
    id: 1,
    name: 'Chase Bank',
    bin: '123456',
    type: 'Issuer & Acquirer',
    contactPerson: 'Uneeb Ahmed',
    email: 'uneeb.ahmed@chase.com',
    phone: '+1-555-0199',
    address: '123 Banking Street',
    city: 'New York',
    country: 'United States',
    status: 'active'
  },
  {
    id: 2,
    name: 'Wells Fargo',
    bin: '234567',
    type: 'Issuer',
    contactPerson: 'Sarah Chen',
    email: 'contact@wellsfargo.com',
    phone: '+1-555-0102',
    address: '456 Finance Ave',
    city: 'San Francisco',
    country: 'United States',
    status: 'active'
  }
];

const participantTypeOptions = [
  { value: 'issuer', label: 'Issuer' },
  { value: 'acquirer', label: 'Acquirer' },
  { value: 'both', label: 'Issuer & Acquirer' }
];

export function ParticipantManagement() {
  const [participants, setParticipants] = useState(mockParticipants);
  const [showModal, setShowModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [otpConfigTab, setOtpConfigTab] = useState<'sms' | 'email' | 'inapp'>('sms');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewParticipant, setViewParticipant] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    // Step 1: Information
    name: '',
    primaryEmail: '',
    secondaryEmail: '',
    primaryMobile: '',
    secondaryMobile: '',
    contactPerson: '',
    logo: null as File | null,
    
    // Step 2: BIN Information
    scheme: '',
    bin: '',
    cardRangeStart: '',
    cardRangeEnd: '',
    type: '',
    cardValidationManagedBy: '',
    
    // Step 3: Message/OTP Information
    otpGenerator: '',
    otpValidity: '60',
    otpValidityUnit: 'seconds',
    otpCharacteristics: '6-digit',
    customerSelectOtpMedium: false,
    otpDeliveryMethods: {
      sms: true,
      email: false,
      inApp: false
    },
    otpMediumSelectable: {
      sms: true,
      email: false,
      inApp: false
    },
    // SMS config
    autoGenerateSMS: true,
    smsTemplate: 'Your OTP code is {OTP}. Do not share this code with anyone. It is valid for {VALIDITY}.',
    // Email config
    emailSenderId: 'support@paysyslabs.com',
    emailSubject: 'OTP Verification',
    emailBody: 'Dear Customer,\n\nYour OTP code is {OTP}.\nIt will expire in {VALIDITY}.\n\nDo not share this code with anyone.\n\nRegards,\nPaysys Labs',
    // Multi-language
    enableMultiLanguageOtp: false,
    multiLangSMS: '',
    multiLangEmail: '',
    
    // Step 4: ACS Customization
    acsLogoPosition: 'top-left',
    acsButtonColor: '#3B82F6',
    acsBackgroundColor: '#F0F4FF',
    acsBackgroundImage: null as File | null,
    acsFontStyle: 'Arial',
    acsFontSize: '14',
    acsContactLink: 'contact@paysyslabs.com',
    
    // Additional
    address: '',
    city: '',
    country: '',
    notes: ''
  });

  const steps = [
    { number: 1, title: 'Information', icon: Building2, description: 'General details & branding' },
    { number: 2, title: 'BIN Configuration', icon: CreditCard, description: 'Card range setup' },
    { number: 3, title: 'Message Setup', icon: MessageSquare, description: 'OTP & SMS configuration' },
    { number: 4, title: 'ACS Customization', icon: Palette, description: 'Page layout & design' }
  ];

  const handleAdd = () => {
    setSelectedParticipant(null);
    setCurrentStep(1);
    setLogoFile(null);
    setFormData({
      name: '',
      primaryEmail: '',
      secondaryEmail: '',
      primaryMobile: '',
      secondaryMobile: '',
      contactPerson: '',
      logo: null,
      scheme: '',
      bin: '',
      cardRangeStart: '',
      cardRangeEnd: '',
      type: '',
      cardValidationManagedBy: '',
      otpGenerator: '',
      otpValidity: '60',
      otpValidityUnit: 'seconds',
      otpCharacteristics: '6-digit',
      customerSelectOtpMedium: false,
      otpDeliveryMethods: {
        sms: true,
        email: false,
        inApp: false
      },
      otpMediumSelectable: {
        sms: true,
        email: false,
        inApp: false
      },
      autoGenerateSMS: true,
      smsTemplate: 'Your OTP code is {OTP}. Do not share this code with anyone. It is valid for {VALIDITY}.',
      emailSenderId: 'support@paysyslabs.com',
      emailSubject: 'OTP Verification',
      emailBody: 'Dear Customer,\n\nYour OTP code is {OTP}.\nIt will expire in {VALIDITY}.\n\nDo not share this code with anyone.\n\nRegards,\nPaysys Labs',
      enableMultiLanguageOtp: false,
      multiLangSMS: '',
      multiLangEmail: '',
      acsLogoPosition: 'top-left',
      acsButtonColor: '#3B82F6',
      acsBackgroundColor: '#F0F4FF',
      acsBackgroundImage: null,
      acsFontStyle: 'Arial',
      acsFontSize: '14',
      acsContactLink: 'contact@paysyslabs.com',
      address: '',
      city: '',
      country: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEdit = (participant: any) => {
    setSelectedParticipant(participant);
    setCurrentStep(1);
    setFormData({
      ...formData,
      name: participant.name,
      scheme: '',
      bin: participant.bin,
      type: participant.type,
      contactPerson: participant.contactPerson,
      primaryEmail: participant.email,
      primaryMobile: participant.phone,
      address: participant.address,
      city: participant.city,
      country: participant.country
    });
    setShowModal(true);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    
    // Create new participant object
    const typeLabel = participantTypeOptions.find(opt => opt.value === formData.type)?.label || formData.type;
    
    const newParticipant = {
      id: participants.length + 1,
      name: formData.name,
      bin: formData.bin,
      type: typeLabel,
      contactPerson: formData.contactPerson,
      email: formData.primaryEmail,
      phone: formData.primaryMobile,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      status: 'active'
    };
    
    // Add to participants list
    setParticipants([...participants, newParticipant]);
    
    // Reset form
    setFormData({
      name: '',
      primaryEmail: '',
      secondaryEmail: '',
      primaryMobile: '',
      secondaryMobile: '',
      contactPerson: '',
      logo: null,
      scheme: '',
      bin: '',
      cardRangeStart: '',
      cardRangeEnd: '',
      type: '',
      cardValidationManagedBy: '',
      otpGenerator: '',
      otpValidity: '60',
      otpValidityUnit: 'seconds',
      otpCharacteristics: '6-digit',
      customerSelectOtpMedium: false,
      otpDeliveryMethods: {
        sms: true,
        email: false,
        inApp: false
      },
      otpMediumSelectable: {
        sms: true,
        email: false,
        inApp: false
      },
      autoGenerateSMS: true,
      smsTemplate: 'Your OTP code is {OTP}. Do not share this code with anyone. It is valid for {VALIDITY}.',
      emailSenderId: 'support@paysyslabs.com',
      emailSubject: 'OTP Verification',
      emailBody: 'Dear Customer,\n\nYour OTP code is {OTP}.\nIt will expire in {VALIDITY}.\n\nDo not share this code with anyone.\n\nRegards,\nPaysys Labs',
      enableMultiLanguageOtp: false,
      multiLangSMS: '',
      multiLangEmail: '',
      acsLogoPosition: 'top-left',
      acsButtonColor: '#3B82F6',
      acsBackgroundColor: '#F0F4FF',
      acsBackgroundImage: null,
      acsFontStyle: 'Arial',
      acsFontSize: '14',
      acsContactLink: 'contact@paysyslabs.com',
      address: '',
      city: '',
      country: '',
      notes: ''
    });
    
    // Close modal and reset step
    setShowModal(false);
    setCurrentStep(1);
    setLogoFile(null);
    
    // Show success message
    alert(`✅ Participant "${newParticipant.name}" added successfully!`);
  };

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.bin.includes(searchQuery)
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Participant Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage financial institutions and participants</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" leftIcon={<Download size={18} />}>Export</Button>
          <Button variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={handleAdd}>
            Add Participant
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <Input
          placeholder="Search by institution name or BIN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search size={18} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredParticipants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{participant.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">BIN: {participant.bin}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Building2 size={14} />
                <span>{participant.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={14} />
                <span className="truncate">{participant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={14} />
                <span>{participant.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={14} />
                <span>{participant.city}, {participant.country}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" size="sm" leftIcon={<Eye size={14} />} onClick={() => { setViewParticipant(participant); setShowViewModal(true); }} className="flex-1">
                View
              </Button>
              <Button variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => handleEdit(participant)} className="flex-1">
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
          setCurrentStep(1);
        }}
        title={selectedParticipant ? 'Edit Participant' : 'Add New Participant'}
        size="xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              leftIcon={<ArrowLeft size={18} />}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => {
                setShowModal(false);
                setCurrentStep(1);
              }}>Cancel</Button>
              {currentStep < 4 ? (
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  leftIcon={<Check size={18} />}
                >
                  {selectedParticipant ? 'Save Changes' : 'Create Participant'}
                </Button>
              )}
            </div>
          </div>
        }
      >
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isCompleted ? '#10B981' : isActive ? '#3B82F6' : '#E5E7EB'
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted ? 'bg-green-500' : isActive ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6 text-white" />
                      ) : (
                        <StepIcon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p className={`text-xs font-semibold ${
                        isActive ? 'text-primary-600 dark:text-primary-400' : 
                        isCompleted ? 'text-green-600 dark:text-green-400' : 
                        'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mt-[-30px] ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step 1: Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary-600" />
                  General Information
                </h3>
                
                <Input
                  label="Participant Full Name"
                  placeholder="e.g., Chase Bank International"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  leftIcon={<Building2 size={18} />}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Primary Email"
                    type="email"
                    placeholder="primary@example.com"
                    value={formData.primaryEmail}
                    onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                    leftIcon={<Mail size={18} />}
                    required
                  />
                  <Input
                    label="Secondary Email"
                    type="email"
                    placeholder="secondary@example.com"
                    value={formData.secondaryEmail}
                    onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                    leftIcon={<Mail size={18} />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Primary Mobile"
                    type="tel"
                    placeholder="+1-555-0000"
                    value={formData.primaryMobile}
                    onChange={(e) => setFormData({ ...formData, primaryMobile: e.target.value })}
                    leftIcon={<Phone size={18} />}
                    required
                  />
                  <Input
                    label="Secondary Mobile"
                    type="tel"
                    placeholder="+1-555-0001"
                    value={formData.secondaryMobile}
                    onChange={(e) => setFormData({ ...formData, secondaryMobile: e.target.value })}
                    leftIcon={<Phone size={18} />}
                  />
                </div>

                <Input
                  label="Contact Person"
                  placeholder="Full name of contact person"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                />

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Branding</h4>
                  <FileUpload
                    label="Institution Logo"
                    helperText="Upload PNG, JPG or SVG (max 5MB). Recommended size: 400x400px"
                    accept="image/png,image/jpeg,image/svg+xml"
                    maxSize={5}
                    value={logoFile}
                    onChange={(file) => {
                      setLogoFile(file);
                      setFormData({ ...formData, logo: file });
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: BIN Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary-600" />
                  BIN & Card Range Configuration
                </h3>

                <Select
                  label="Card Scheme"
                  value={formData.scheme}
                  onChange={(e) => setFormData({ ...formData, scheme: e.target.value })}
                  options={[
                    { value: 'visa', label: 'Visa' },
                    { value: 'mastercard', label: 'Mastercard' },
                    { value: 'amex', label: 'American Express' },
                    { value: 'unionpay', label: 'UnionPay' }
                  ]}
                  helperText="Select the card scheme for this participant"
                  required
                />

                <Input
                  label="BIN (Bank Identification Number)"
                  placeholder="e.g., 123456"
                  value={formData.bin}
                  onChange={(e) => setFormData({ ...formData, bin: e.target.value })}
                  leftIcon={<CreditCard size={18} />}
                  helperText="6-digit bank identification number"
                  required
                />

                <Select
                  label="Participant Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  options={participantTypeOptions}
                  required
                />

                {/* Card Characteristics Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Card Characteristics</h4>
                  <Select
                    label="Card Validation Managed By"
                    value={formData.cardValidationManagedBy}
                    onChange={(e) => setFormData({ ...formData, cardValidationManagedBy: e.target.value })}
                    options={[
                      { value: 'bank', label: 'Manage By Bank' },
                      { value: 'paysys', label: 'Manage By Paysys' },
                      { value: 'file_based', label: 'FILE_BASED_INQUIRY' }
                    ]}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Card Range Start"
                    placeholder="4111111111111111"
                    value={formData.cardRangeStart}
                    onChange={(e) => setFormData({ ...formData, cardRangeStart: e.target.value })}
                    helperText="First card number in range"
                    required
                  />
                  <Input
                    label="Card Range End"
                    placeholder="4111119999999999"
                    value={formData.cardRangeEnd}
                    onChange={(e) => setFormData({ ...formData, cardRangeEnd: e.target.value })}
                    helperText="Last card number in range"
                    required
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Info:</strong> Card ranges define which cards belong to this participant. Ensure ranges don't overlap with existing participants.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: OTP Configuration */}
            {currentStep === 3 && (() => {
              const validityLabel = `${formData.otpValidity} ${formData.otpValidityUnit}`;
              const smsPreview = formData.smsTemplate
                .replace('{OTP}', '847291')
                .replace('{VALIDITY}', validityLabel);
              const emailPreview = formData.emailBody
                .replace(/\{OTP\}/g, '847291')
                .replace(/\{VALIDITY\}/g, validityLabel);

              return (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary-600" />
                    OTP Configuration
                  </h3>

                  {/* ── OTP Generator + Validity ── */}
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 space-y-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">OTP Characteristics</p>

                    <Select
                      label="OTP Generator"
                      value={formData.otpGenerator}
                      onChange={(e) => setFormData({ ...formData, otpGenerator: e.target.value })}
                      options={[
                        { value: 'paysys-full',    label: 'Generate and Send by Paysys' },
                        { value: 'bank-paysys',    label: 'Generate by Bank and Send by Paysys' },
                        { value: 'bank-full',      label: 'Generate and Send by Bank' },
                        { value: 'paysys-twilio',  label: 'Generate by Paysys and Send by Twilio' },
                      ]}
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="OTP Validity"
                        value={`${formData.otpValidity}_${formData.otpValidityUnit}`}
                        onChange={(e) => {
                          const [val, unit] = e.target.value.split('_');
                          setFormData({ ...formData, otpValidity: val, otpValidityUnit: unit });
                        }}
                        options={[
                          { value: '30_seconds',  label: '30 Seconds' },
                          { value: '60_seconds',  label: '60 Seconds' },
                          { value: '90_seconds',  label: '90 Seconds' },
                          { value: '2_minutes',   label: '2 Minutes' },
                          { value: '5_minutes',   label: '5 Minutes' },
                          { value: '10_minutes',  label: '10 Minutes' },
                        ]}
                      />
                      <Select
                        label="OTP Characteristics"
                        value={formData.otpCharacteristics}
                        onChange={(e) => setFormData({ ...formData, otpCharacteristics: e.target.value })}
                        options={[
                          { value: '4-digit',      label: '4-digit Numeric' },
                          { value: '6-digit',      label: '6-digit Numeric' },
                          { value: '8-digit',      label: '8-digit Numeric' },
                          { value: 'alphanumeric', label: 'Alphanumeric' },
                        ]}
                      />
                    </div>
                  </div>

                  {/* ── Delivery Methods ── */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preferred OTP Delivery Methods</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { key: 'sms',   icon: Smartphone,      label: 'SMS' },
                        { key: 'email', icon: Mail,            label: 'Email' },
                        { key: 'inApp', icon: MessageCircle,   label: 'In-App' },
                      ].map(({ key, icon: Icon, label }) => {
                        const active = formData.otpDeliveryMethods[key as keyof typeof formData.otpDeliveryMethods];
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setFormData({
                              ...formData,
                              otpDeliveryMethods: {
                                ...formData.otpDeliveryMethods,
                                [key]: !active
                              }
                            })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                              active
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                            }`}
                          >
                            <Icon size={15} />
                            {label}
                            {active && <Check size={13} className="text-primary-600" />}
                          </button>
                        );
                      })}
                    </div>
                    <Checkbox
                      label="Allow customer to select OTP medium on checkout page"
                      checked={formData.customerSelectOtpMedium}
                      onChange={(checked) => setFormData({ ...formData, customerSelectOtpMedium: checked })}
                    />
                  </div>

                  {/* ── Per-channel config tabs ── */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    {/* tab bar */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
                      {[
                        { id: 'sms',   label: 'SMS Config',   disabled: !formData.otpDeliveryMethods.sms },
                        { id: 'email', label: 'Email Config', disabled: !formData.otpDeliveryMethods.email },
                        { id: 'inapp', label: 'In-App Config',disabled: !formData.otpDeliveryMethods.inApp },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          disabled={tab.disabled}
                          onClick={() => setOtpConfigTab(tab.id as any)}
                          className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
                            tab.disabled
                              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed border-transparent'
                              : otpConfigTab === tab.id
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {tab.label}
                          {tab.disabled && <span className="ml-1 text-xs text-gray-400">(disabled)</span>}
                        </button>
                      ))}
                    </div>

                    {/* ── SMS tab ── */}
                    <div className={`p-5 space-y-4 ${otpConfigTab === 'sms' && formData.otpDeliveryMethods.sms ? '' : 'hidden'}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">SMS OTP Configuration</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Auto-generate template</span>
                          <Switch
                            label=""
                            checked={formData.autoGenerateSMS}
                            onChange={(checked) => {
                              const auto = 'Your OTP code is {OTP}. Do not share this code with anyone. It is valid for {VALIDITY}.';
                              setFormData({
                                ...formData,
                                autoGenerateSMS: checked,
                                smsTemplate: checked ? auto : formData.smsTemplate,
                              });
                            }}
                          />
                        </div>
                      </div>

                      <Textarea
                        label="SMS Template"
                        value={formData.smsTemplate}
                        onChange={(e) => setFormData({ ...formData, smsTemplate: e.target.value })}
                        rows={3}
                        helperText="Placeholders: {OTP} = code, {VALIDITY} = validity duration"
                        disabled={formData.autoGenerateSMS}
                      />

                      {/* SMS live preview */}
                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Live Preview</p>
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                            <Smartphone size={14} className="text-primary-600" />
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm border border-gray-100 dark:border-gray-700 max-w-xs">
                            <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">{smsPreview || '...'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Email tab ── */}
                    <div className={`p-5 space-y-4 ${otpConfigTab === 'email' && formData.otpDeliveryMethods.email ? '' : 'hidden'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Email Sender ID"
                          type="email"
                          placeholder="support@paysyslabs.com"
                          value={formData.emailSenderId}
                          onChange={(e) => setFormData({ ...formData, emailSenderId: e.target.value })}
                          leftIcon={<Mail size={16} />}
                          required
                        />
                        <Input
                          label="Email Subject"
                          placeholder="OTP Verification"
                          value={formData.emailSubject}
                          onChange={(e) => setFormData({ ...formData, emailSubject: e.target.value })}
                          required
                        />
                      </div>

                      <Textarea
                        label="Email Body"
                        value={formData.emailBody}
                        onChange={(e) => setFormData({ ...formData, emailBody: e.target.value })}
                        rows={5}
                        helperText="Placeholders: {OTP} = code, {VALIDITY} = validity duration"
                      />

                      {/* Email live preview */}
                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-4">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Live Preview</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 space-y-0.5">
                            <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-medium">From:</span> {formData.emailSenderId || 'support@example.com'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-medium">Subject:</span> {formData.emailSubject || 'OTP Verification'}</p>
                          </div>
                          <div className="px-4 py-3">
                            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{emailPreview || '...'}</pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── In-App tab ── */}
                    <div className={`p-5 space-y-3 ${otpConfigTab === 'inapp' && formData.otpDeliveryMethods.inApp ? '' : 'hidden'}`}>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        In-App push notification will use the same OTP code generated by the selected OTP generator.
                        No additional template configuration is required — the system will deliver the OTP through the mobile SDK automatically.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm text-blue-700 dark:text-blue-300">
                        Push notifications use the same validity window: <strong>{validityLabel}</strong>
                      </div>
                    </div>
                  </div>

                  {/* ── Multi-language ── */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-500" />
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Multi-Language Support</p>
                      </div>
                      <Switch
                        label=""
                        checked={formData.enableMultiLanguageOtp}
                        onChange={(checked) => setFormData({ ...formData, enableMultiLanguageOtp: checked })}
                      />
                    </div>

                    {formData.enableMultiLanguageOtp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 overflow-hidden"
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400">Provide translated templates. Use the same placeholders: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'{OTP}'}</code> and <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'{VALIDITY}'}</code></p>
                        {formData.otpDeliveryMethods.sms && (
                          <Textarea
                            label="SMS Template (Alternative Language)"
                            placeholder="Your alternative language SMS template…"
                            value={formData.multiLangSMS}
                            onChange={(e) => setFormData({ ...formData, multiLangSMS: e.target.value })}
                            rows={2}
                          />
                        )}
                        {formData.otpDeliveryMethods.email && (
                          <Textarea
                            label="Email Body (Alternative Language)"
                            placeholder="Your alternative language email body…"
                            value={formData.multiLangEmail}
                            onChange={(e) => setFormData({ ...formData, multiLangEmail: e.target.value })}
                            rows={3}
                          />
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Step 4: ACS Page Customization */}
            {currentStep === 4 && (
              <div className="space-y-0">
                <div className="flex flex-col lg:flex-row gap-6">

                  {/* ── Left column: controls ── */}
                  <div className="flex-1 space-y-5 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary-600" />
                      ACS Page Customization
                    </h3>

                    {/* Logo Position */}
                    <Select
                      label="Logo Position"
                      value={formData.acsLogoPosition}
                      onChange={(e) => setFormData({ ...formData, acsLogoPosition: e.target.value })}
                      options={[
                        { value: 'top-left',     label: 'Top Left' },
                        { value: 'top-center',   label: 'Top Center' },
                        { value: 'top-right',    label: 'Top Right' },
                        { value: 'bottom-left',  label: 'Bottom Left' },
                        { value: 'bottom-center', label: 'Bottom Center' },
                        { value: 'bottom-right', label: 'Bottom Right' },
                      ]}
                    />

                    {/* Background Color + Button Color */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Background Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={formData.acsBackgroundColor}
                            onChange={(e) => setFormData({ ...formData, acsBackgroundColor: e.target.value })}
                            className="h-9 w-12 rounded cursor-pointer border border-gray-300 dark:border-gray-600 p-0.5"
                          />
                          <input
                            type="text"
                            value={formData.acsBackgroundColor}
                            onChange={(e) => setFormData({ ...formData, acsBackgroundColor: e.target.value })}
                            className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Button Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={formData.acsButtonColor}
                            onChange={(e) => setFormData({ ...formData, acsButtonColor: e.target.value })}
                            className="h-9 w-12 rounded cursor-pointer border border-gray-300 dark:border-gray-600 p-0.5"
                          />
                          <input
                            type="text"
                            value={formData.acsButtonColor}
                            onChange={(e) => setFormData({ ...formData, acsButtonColor: e.target.value })}
                            className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Background Image */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Background Image <span className="font-normal text-gray-400">(optional)</span></label>
                      <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer hover:border-primary-400 transition-colors">
                        <Layout size={18} className="text-gray-400 shrink-0" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {formData.acsBackgroundImage ? (formData.acsBackgroundImage as File).name : 'Upload PNG, JPG (max 5 MB)'}
                        </span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setFormData({ ...formData, acsBackgroundImage: file });
                          }}
                        />
                      </label>
                      {formData.acsBackgroundImage && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, acsBackgroundImage: null })}
                          className="mt-1 text-xs text-red-500 hover:underline"
                        >
                          Remove image
                        </button>
                      )}
                    </div>

                    {/* Font Style + Font Size */}
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Font Style"
                        value={formData.acsFontStyle}
                        onChange={(e) => setFormData({ ...formData, acsFontStyle: e.target.value })}
                        options={[
                          { value: 'Arial',           label: 'Arial' },
                          { value: 'Helvetica',       label: 'Helvetica' },
                          { value: 'Georgia',         label: 'Georgia' },
                          { value: 'Times New Roman', label: 'Times New Roman' },
                          { value: 'Courier New',     label: 'Courier New' },
                          { value: 'Verdana',         label: 'Verdana' },
                          { value: 'Trebuchet MS',    label: 'Trebuchet MS' },
                        ]}
                      />
                      <Select
                        label="Font Size"
                        value={formData.acsFontSize}
                        onChange={(e) => setFormData({ ...formData, acsFontSize: e.target.value })}
                        options={[
                          { value: '12', label: '12 px' },
                          { value: '13', label: '13 px' },
                          { value: '14', label: '14 px' },
                          { value: '15', label: '15 px' },
                          { value: '16', label: '16 px' },
                          { value: '18', label: '18 px' },
                        ]}
                      />
                    </div>

                    {/* Contact / Help Link */}
                    <Input
                      label="Contact / Help Link"
                      type="email"
                      placeholder="contact@paysyslabs.com"
                      value={formData.acsContactLink}
                      onChange={(e) => setFormData({ ...formData, acsContactLink: e.target.value })}
                      helperText="Displayed as a support link on the ACS page"
                    />
                  </div>

                  {/* ── Right column: live preview ── */}
                  <div className="lg:w-80 shrink-0">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Layout size={16} className="text-blue-600" /> Professional Preview
                    </p>

                    {/* Phone mockup - Professional Design */}
                    <div className="relative mx-auto w-64">
                      {/* phone frame with realistic styling */}
                      <div className="rounded-[2.5rem] border-[6px] border-gray-900 dark:border-gray-700 bg-black shadow-2xl overflow-hidden" style={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}>
                        {/* status bar area - top frame */}
                        <div className="h-6 bg-gradient-to-r from-gray-900 to-black flex items-center justify-between px-3">
                          {/* notch */}
                          <div className="absolute left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl border-b border-gray-800" />
                          {/* placeholder for notch content */}
                        </div>

                        {/* screen content */}
                        <div
                          className="relative overflow-hidden"
                          style={{
                            backgroundColor: formData.acsBackgroundColor,
                            backgroundImage: formData.acsBackgroundImage
                              ? `url(${URL.createObjectURL(formData.acsBackgroundImage as File)})`
                              : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            fontFamily: formData.acsFontStyle,
                            minHeight: '420px',
                          }}
                        >
                          {/* overlay for image backgrounds */}
                          {formData.acsBackgroundImage && (
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
                          )}

                          {/* professional content layout */}
                          <div className="relative z-10 flex flex-col h-full min-h-[420px] justify-between p-4">
                            
                            {/* header section with logo - only show if top position */}
                            {(formData.acsLogoPosition === 'top-left' || formData.acsLogoPosition === 'top-center' || formData.acsLogoPosition === 'top-right') && (
                              <div className="flex flex-col items-center gap-2">
                                {/* logo positioning */}
                                <div className={`w-full flex ${
                                  formData.acsLogoPosition === 'top-left' ? 'justify-start' :
                                  formData.acsLogoPosition === 'top-center' ? 'justify-center' :
                                  'justify-end'
                                }`}>
                                  {logoFile ? (
                                    <motion.img
                                      src={URL.createObjectURL(logoFile)}
                                      alt="logo"
                                      className="h-10 object-contain"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  ) : (
                                    <motion.div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm"
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                    >
                                      <Building2 size={13} className="text-gray-700 dark:text-gray-300" />
                                      <span className="text-xs font-bold text-gray-700 dark:text-white">{formData.name || 'Bank'}</span>
                                    </motion.div>
                                  )}
                                </div>

                                {/* security badge */}
                                <motion.div className="flex items-center gap-1.5 mt-1"
                                  animate={{ opacity: [0.8, 1, 0.8] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Lock size={12} className="text-green-500" />
                                  <span className="text-[9px] font-semibold text-green-500">Secure Connection</span>
                                </motion.div>
                              </div>
                            )}
                            
                            {/* spacer for bottom positions */}
                            {(formData.acsLogoPosition === 'bottom-left' || formData.acsLogoPosition === 'bottom-center' || formData.acsLogoPosition === 'bottom-right') && (
                              <div className="h-4"></div>
                            )}

                            {/* main content card */}
                            <div className="flex-1 flex items-center justify-center">
                              <motion.div 
                                className="w-full bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl p-5 space-y-4 backdrop-blur-xl border border-white/20 dark:border-gray-700/50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                                style={{
                                  boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
                                }}
                              >
                                {/* header with icon */}
                                <div className="text-center space-y-1">
                                  <div className="flex justify-center mb-2">
                                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full">
                                      <Lock size={14} className="text-blue-600" />
                                    </div>
                                  </div>
                                  <p className="font-bold text-gray-800 dark:text-white text-sm leading-tight" style={{ fontFamily: formData.acsFontStyle }}>
                                    Verify Your Identity
                                  </p>
                                  <p className="text-gray-500 dark:text-gray-400 text-[10px] leading-relaxed" style={{ fontFamily: formData.acsFontStyle }}>
                                    Enter the 6-digit code sent to your device
                                  </p>
                                </div>

                                {/* OTP input boxes - enhanced */}
                                <div className="flex justify-center gap-2">
                                  {[0,1,2,3,4,5].map(i => (
                                    <motion.div 
                                      key={i}
                                      className="w-8 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-sm font-bold text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50 transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
                                      whileHover={{ scale: 1.05 }}
                                      style={{ fontFamily: formData.acsFontStyle }}
                                    />
                                  ))}
                                </div>

                                {/* card info strip - enhanced */}
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg px-3 py-2.5 flex items-center justify-between border border-blue-200 dark:border-blue-800/50">
                                  <div>
                                    <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Card</p>
                                    <p className="text-xs font-mono text-gray-700 dark:text-gray-300 font-semibold">•••• •••• •••• 4242</p>
                                  </div>
                                  <CreditCard size={14} className="text-blue-600 dark:text-blue-400" />
                                </div>

                                {/* verify button - enhanced with gradient */}
                                <motion.button
                                  style={{ 
                                    backgroundColor: formData.acsButtonColor,
                                    fontFamily: formData.acsFontStyle,
                                    backgroundImage: `linear-gradient(135deg, ${formData.acsButtonColor}dd, ${formData.acsButtonColor})`
                                  }}
                                  className="w-full py-2.5 rounded-lg text-white font-semibold text-sm shadow-lg transition-all transform hover:shadow-xl active:scale-95"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Verify Code
                                </motion.button>

                                {/* timer with animation */}
                                <div className="flex justify-between items-center text-[10px] px-1">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    Valid for <motion.span 
                                      className="font-bold text-orange-600 dark:text-orange-400"
                                      animate={{ opacity: [1, 0.6, 1] }}
                                      transition={{ duration: 1, repeat: Infinity }}
                                    >
                                      00:30
                                    </motion.span>
                                  </span>
                                  <motion.button 
                                    className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    Resend Code
                                  </motion.button>
                                </div>

                                {/* contact link */}
                                {formData.acsContactLink && (
                                  <motion.div 
                                    className="pt-2 border-t border-gray-200 dark:border-gray-700 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <p className="text-[8px] text-gray-500 dark:text-gray-400">
                                      <MessageCircle size={10} className="inline mr-1" />
                                      <a href={`mailto:${formData.acsContactLink}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium truncate inline-block max-w-[80%]">
                                        {formData.acsContactLink}
                                      </a>
                                    </p>
                                  </motion.div>
                                )}
                              </motion.div>
                            </div>

                            {/* bottom positioning logo if set */}
                            {(formData.acsLogoPosition === 'bottom-left' || formData.acsLogoPosition === 'bottom-center' || formData.acsLogoPosition === 'bottom-right') && (
                              <div className="flex flex-col items-center gap-2">
                                {/* security badge */}
                                <motion.div className="flex items-center gap-1.5"
                                  animate={{ opacity: [0.8, 1, 0.8] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Lock size={12} className="text-green-500" />
                                  <span className="text-[9px] font-semibold text-green-500">Secure Connection</span>
                                </motion.div>

                                {/* logo positioning */}
                                <div className={`w-full flex ${
                                  formData.acsLogoPosition === 'bottom-left' ? 'justify-start' :
                                  formData.acsLogoPosition === 'bottom-center' ? 'justify-center' :
                                  'justify-end'
                                }`}>
                                  {logoFile ? (
                                    <motion.img
                                      src={URL.createObjectURL(logoFile)}
                                      alt="logo"
                                      className="h-10 object-contain"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  ) : (
                                    <motion.div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                    >
                                      <Building2 size={13} className="text-gray-700 dark:text-gray-300" />
                                      <span className="text-xs font-bold text-gray-700 dark:text-white">{formData.name || 'Bank'}</span>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* home indicator */}
                        <div className="flex justify-center py-2 bg-gradient-to-t from-black to-gray-900">
                          <div className="w-24 h-1 bg-gray-700 rounded-full" />
                        </div>
                      </div>

                      {/* info label */}
                      <motion.p 
                        className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        ✨ Professional ACS Preview
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Modal>

      {/* ── View Participant Modal ── */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="View Participant"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
            <Button variant="primary" leftIcon={<Edit size={16} />} onClick={() => {
              setShowViewModal(false);
              if (viewParticipant) handleEdit(viewParticipant);
            }}>Edit Participant</Button>
          </div>
        }
      >
        {viewParticipant && (
          <div className="space-y-6 text-sm">
            {/* General Info */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={16} className="text-primary-600" />
                <h4 className="font-semibold text-gray-900 dark:text-white">General Information</h4>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">
                {[
                  ['Institution Name', viewParticipant.name],
                  ['Contact Person',   viewParticipant.contactPerson],
                  ['Email',            viewParticipant.email],
                  ['Phone',            viewParticipant.phone],
                  ['City',             viewParticipant.city],
                  ['Country',          viewParticipant.country],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{value || '—'}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* BIN Config */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard size={16} className="text-primary-600" />
                <h4 className="font-semibold text-gray-900 dark:text-white">BIN Configuration</h4>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">
                {[
                  ['BIN',             viewParticipant.bin],
                  ['Participant Type', viewParticipant.type],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{value || '—'}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* OTP Config — pulled from viewParticipant.otpConfig if stored, else show placeholder */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={16} className="text-primary-600" />
                <h4 className="font-semibold text-gray-900 dark:text-white">OTP Configuration</h4>
              </div>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">
                {viewParticipant.otpConfig ? (
                  <>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {[
                        ['OTP Generator',      viewParticipant.otpConfig.otpGenerator],
                        ['OTP Validity',       `${viewParticipant.otpConfig.otpValidity} ${viewParticipant.otpConfig.otpValidityUnit}`],
                        ['OTP Characteristics',viewParticipant.otpConfig.otpCharacteristics],
                        ['Customer Selection', viewParticipant.otpConfig.customerSelectOtpMedium ? 'Enabled' : 'Disabled'],
                        ['Multi-Language',     viewParticipant.otpConfig.enableMultiLanguageOtp ? 'Enabled' : 'Disabled'],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                          <p className="font-medium text-gray-900 dark:text-white">{value || '—'}</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery channels badges */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery Methods</p>
                      <div className="flex gap-2 flex-wrap">
                        {viewParticipant.otpConfig.otpDeliveryMethods?.sms   && <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">SMS</span>}
                        {viewParticipant.otpConfig.otpDeliveryMethods?.email && <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">Email</span>}
                        {viewParticipant.otpConfig.otpDeliveryMethods?.inApp && <span className="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded text-xs font-medium">In-App</span>}
                      </div>
                    </div>

                    {viewParticipant.otpConfig.otpDeliveryMethods?.sms && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">SMS Template</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{viewParticipant.otpConfig.smsTemplate}</p>
                        </div>
                      </div>
                    )}

                    {viewParticipant.otpConfig.otpDeliveryMethods?.email && (
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email Configuration</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-b border-gray-200 dark:border-gray-600 space-y-0.5">
                            <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-medium">From:</span> {viewParticipant.otpConfig.emailSenderId}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400"><span className="font-medium">Subject:</span> {viewParticipant.otpConfig.emailSubject}</p>
                          </div>
                          <div className="px-3 py-2">
                            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{viewParticipant.otpConfig.emailBody}</pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    OTP configuration details not available for this record. Edit the participant to configure OTP settings.
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
