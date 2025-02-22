'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, Eye, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CampaignState from '@/lib/state/campaignState';

const TemplatePage = () => {
  const router = useRouter();
  const campaignState = CampaignState.getInstance();
  
  // Get saved data from campaignState
  const savedData = campaignState.getData('template') || {};
  
  const [attackType, setAttackType] = useState(savedData.attackType || '');
  const [pretext, setPretext] = useState(savedData.pretext || '');
  const [selectedTargetInfo, setSelectedTargetInfo] = useState(savedData.selectedTargetInfo || []);
  const [sender, setSender] = useState(savedData.sender || {
    name: '',
    jobTitle: '',
    organization: '',
    emailPrefix: '',
    emailDomain: ''
  });
  const [generatedMessage, setGeneratedMessage] = useState(savedData.generatedMessage || '');
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const targetFields = [
    { id: 'firstName', label: 'First name' },
    { id: 'lastName', label: 'Last name' },
    { id: 'jobTitle', label: 'Job title' },
    { id: 'division', label: 'Division' },
    { id: 'department', label: 'Department' },
    { id: 'phoneNumber', label: 'Phone number' },
    // { id: 'email', label: 'Email' }
  ];

  // Update campaignState whenever any value changes
  const updateCampaignState = (newData) => {
    const currentData = campaignState.getData('template') || {};
    campaignState.updateData('template', {
      ...currentData,
      ...newData
    });
  };

  // Modified state setters to update campaignState
  const handleAttackTypeChange = (value) => {
    setAttackType(value);
    updateCampaignState({ attackType: value });
  };

  const handlePretextChange = (value) => {
    setPretext(value);
    updateCampaignState({ pretext: value });
  };

  const handleTargetInfoChange = (value) => {
    setSelectedTargetInfo(value);
    updateCampaignState({ selectedTargetInfo: value });
  };

  const handleSenderChange = (field, value) => {
    const newSender = { ...sender, [field]: value };
    setSender(newSender);
    updateCampaignState({ sender: newSender });
  };

  const handleMessageChange = (value) => {
    setGeneratedMessage(value);
    updateCampaignState({ generatedMessage: value });
  };

  const toggleTargetField = (fieldId) => {
    const newTargetInfo = selectedTargetInfo.includes(fieldId)
      ? selectedTargetInfo.filter(id => id !== fieldId)
      : [...selectedTargetInfo, fieldId];
    handleTargetInfoChange(newTargetInfo);
  };

  const attackTypes = [
    { id: 'click', label: 'Click', description: 'Click a link and enter information' },
    { id: 'attachment', label: 'Attachment', description: 'Download an email attachment' },
    { id: 'download', label: 'Download', description: 'Click a link and download a file' },
    { id: 'reply', label: 'Reply', description: 'Reply with sensitive information' }
  ];

  const pretextCategories = [
    {
      items: [
        'Productivity tools',
        'Annual report',
        'LinkedIn request',
        'Investment opportunity',
        'Stock and shares',
        'Customer loyalty',
        'Christmas holidays',
        'Staff welfare',
        'Password reset',
        'Data Breach check',
        'Sporting goods',
        'Conferences & Conventions',
        'Gift Card',
        'Social Networking',
        'Controversial Topics'
      ]
    }
  ];

  const generateMessage = () => {
    setIsGenerating(true);
    
    // Validate required fields
    if (!attackType || !pretext || !sender.name || !sender.emailPrefix || !sender.emailDomain) {
      alert('Please fill in all required fields');
      setIsGenerating(false);
      return;
    }

    // Generate message based on selected options
    const messages = {
      'password_reset': {
        subject: 'Immediate Action Required: Security Update',
        greeting: `Dear {firstName},`,
        body: `Our security team has detected unusual activity on your account. As a precautionary measure, we require you to verify your identity and reset your password immediately.

Please click the secure link below to complete this process:
[Secure Password Reset Link]

This request will expire in 24 hours.

Best regards,
${sender.name}
${sender.jobTitle}
${sender.organization}`
      },
      'click': {
        subject: `Action Required: ${pretext} Update`,
        greeting: `Dear {firstName},`,
        body: `I hope this email finds you well. I'm reaching out regarding an important update to our ${pretext.toLowerCase()} system.

As part of our ongoing security measures, we need you to verify your account details by clicking the link below:
[Secure Verification Link]

This is required to maintain uninterrupted access to our systems.

Best regards,
${sender.name}
${sender.jobTitle}
${sender.organization}`
      },
      'attachment': {
        subject: `Important: ${pretext} Document`,
        greeting: `Dear {firstName},`,
        body: `Please find attached an important document regarding our ${pretext.toLowerCase()} policy update.

For security reasons, you'll need to verify your identity before accessing the document.

Best regards,
${sender.name}
${sender.jobTitle}
${sender.organization}`
      },
      'reply': {
        subject: `Urgent: ${pretext} Verification Needed`,
        greeting: `Dear {firstName},`,
        body: `I need your urgent assistance with verifying some ${pretext.toLowerCase()} information.

Could you please reply to this email with your current access credentials for verification purposes?

Thank you for your immediate attention to this matter.

Best regards,
${sender.name}
${sender.jobTitle}
${sender.organization}`
      }
    };

    const targetInfo = selectedTargetInfo.length > 0 
      ? `\n\nReference Details:\n${selectedTargetInfo.map(id => 
          `- ${targetFields.find(field => field.id === id)?.label}`
        ).join('\n')}`
      : '';

    const template = messages[attackType] || messages['click'];
    const fullMessage = {
      from: `${sender.name} <${sender.emailPrefix}@${sender.emailDomain}>`,
      subject: template.subject,
      content: template.greeting + '\n\n' + template.body + targetInfo
    };

    handleMessageChange(JSON.stringify(fullMessage, null, 2));
    setIsGenerating(false);
  };

  const handleContinueToSchedule = () => {
    if (!generatedMessage) {
      alert('Please generate a message first');
      return;
    }
    campaignState.updateData('template', JSON.parse(generatedMessage));
    router.push('/practice/create-campaign/schedule');
  };

  // Update the render content function
  const renderContent = () => {
    if (isGenerating) {
      return <p className="text-gray-400 text-center py-8">Generating message...</p>;
    }

    if (!generatedMessage) {
      return <p className="text-gray-400 text-center py-8">AI generated message will appear here</p>;
    }

    if (showPreview) {
      const previewMessage = JSON.parse(generatedMessage);
      return (
        <div className="space-y-4 bg-[#050607] p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-400">From:</p>
            <p className="text-white">{previewMessage.from}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Subject:</p>
            <p className="text-white">{previewMessage.subject}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Content:</p>
            <div className="mt-2 text-white whitespace-pre-wrap">
              {previewMessage.content}
            </div>
          </div>
        </div>
      );
    }

    return (
      <pre className="text-gray-400 whitespace-pre-wrap bg-[#050607] p-4 rounded-lg">
        {generatedMessage}
      </pre>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Target Information Section */}
          <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Target information</h2>
                <p className="text-sm text-gray-400">What should we mention about your target?</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {targetFields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => toggleTargetField(field.id)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedTargetInfo.includes(field.id)
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-800 bg-[#050607] text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {field.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sender Section */}
          <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Sender</h2>
                <p className="text-sm text-gray-400">Who is sending the email?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Pretext identity name</label>
                <input 
                  value={sender.name}
                  onChange={(e) => handleSenderChange('name', e.target.value)}
                  placeholder="Enter sender name"
                  className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 mt-1 text-gray-400" 
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Job Title</label>
                <input 
                  value={sender.jobTitle}
                  onChange={(e) => handleSenderChange('jobTitle', e.target.value)}
                  placeholder="Enter job title"
                  className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 mt-1 text-gray-400" 
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Organization</label>
                <input 
                  value={sender.organization}
                  onChange={(e) => handleSenderChange('organization', e.target.value)}
                  placeholder="Enter organization"
                  className="w-full bg-[#050607] border border-gray-800 rounded-lg p-2 mt-1 text-gray-400" 
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <div className="flex items-center gap-2">
                  <input 
                    value={sender.emailPrefix}
                    onChange={(e) => handleSenderChange('emailPrefix', e.target.value)}
                    placeholder="Email prefix"
                    className="flex-1 bg-[#050607] border border-gray-800 rounded-lg p-2 mt-1 text-gray-400" 
                  />
                  <span className="text-gray-400">@</span>
                  <input 
                    value={sender.emailDomain}
                    onChange={(e) => handleSenderChange('emailDomain', e.target.value)}
                    placeholder="Domain"
                    className="flex-1 bg-[#050607] border border-gray-800 rounded-lg p-2 mt-1 text-gray-400" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Attack Type Section */}
          <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Attack Type</h2>
                <p className="text-sm text-gray-400">What's the purpose of the email?</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {attackTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleAttackTypeChange(type.id)}
                  className={`p-4 rounded-lg border ${
                    attackType === type.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-800 bg-[#050607] hover:border-gray-700'
                  }`}
                >
                  <h3 className="text-lg font-medium text-white mb-2">{type.label}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Pretext Section */}
          <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h2 className="text-lg font-medium text-white">Pretext</h2>
                <p className="text-sm text-gray-400">What's the message about?</p>
              </div>
            </div>

            <div className="space-y-6">
              {pretextCategories.map((category) => (
                <div key={category.title} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handlePretextChange(item)}
                        className={`px-4 py-2 rounded-lg border ${
                          pretext === item
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-800 bg-[#050607] hover:border-gray-700'
                        }`}
                      >
                        <span className="text-sm text-gray-400">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="bg-[#181b24] border border-transparent hover:border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-white">Message</h2>
            <p className="text-sm text-gray-400">Your generated message will appear here</p>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            disabled={!generatedMessage}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              generatedMessage 
                ? 'bg-blue-500/30 text-blue-400 hover:bg-blue-500/40' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Eye size={16} />
            {showPreview ? 'Show Raw' : 'Preview'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Selected Options Side */}
          <div className="space-y-4">
            {/* Selected Target Information */}
            {selectedTargetInfo.length > 0 && (
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Selected Target Information:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTargetInfo.map(id => (
                    <span key={id} className="px-2 py-1 bg-blue-500/10 border border-blue-500 rounded text-sm text-blue-400">
                      {targetFields.find(field => field.id === id)?.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Attack Type */}
            {attackType && (
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Attack Type:</h3>
                <div className="bg-blue-500/10 border border-blue-500 rounded p-2">
                  <p className="text-white font-medium">{attackTypes.find(type => type.id === attackType)?.label}</p>
                  <p className="text-sm text-gray-400">{attackTypes.find(type => type.id === attackType)?.description}</p>
                </div>
              </div>
            )}

            {/* Selected Pretext */}
            {pretext && (
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Pretext:</h3>
                <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500 rounded text-sm text-blue-400">
                  {pretext}
                </span>
              </div>
            )}

            {/* Sender Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Sender Information:</h3>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Name</span>
                  <span className="text-gray-400">{sender.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Job Title</span>
                  <span className="text-gray-400">{sender.jobTitle}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Organization</span>
                  <span className="text-gray-400">{sender.organization}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Email Address</span>
                  <span className="text-gray-400">{sender.emailPrefix}@{sender.emailDomain}</span>
                </div>
              </div>
            </div>

            {/* Generate and Continue Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button 
                className={`flex-1 ${
                  isGenerating 
                    ? 'bg-blue-500/50 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-medium rounded-lg py-3 px-4 transition-colors`}
                onClick={generateMessage}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Message'}
              </button>
              
              <button
                onClick={handleContinueToSchedule}
                disabled={!generatedMessage}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-3 px-4 ${
                  generatedMessage 
                    ? 'bg-blue-500/30 text-blue-400 hover:bg-blue-500/40' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Calendar size={16} />
                Continue to Schedule
              </button>
            </div>
          </div>

          {/* AI Generated Content Side */}
          <div className="border-l border-gray-800 pl-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;