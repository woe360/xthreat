'use client'
import React, { useState, useRef } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Calendar, Filter, BarChart2, Shield, AlertTriangle, Clock, Award, BookOpen, Users, CheckCircle, Target, TrendingUp, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ProgressPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [riskLevel, setRiskLevel] = useState('all');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef(null);

  // Completion Rates and Compliance
  const completionData = [
    { name: 'Jan', completed: 78, target: 100 },
    { name: 'Feb', completed: 82, target: 100 },
    { name: 'Mar', completed: 86, target: 100 },
    { name: 'Apr', completed: 89, target: 100 },
    { name: 'May', completed: 92, target: 100 },
    { name: 'Jun', completed: 95, target: 100 },
  ];

  // Department Completion Rates
  const departmentData = [
    { name: 'IT', completed: 98 },
    { name: 'HR', completed: 92 },
    { name: 'Sales', completed: 85 },
    { name: 'Finance', completed: 94 },
    { name: 'Marketing', completed: 88 },
  ];

  // Performance Metrics
  const assessmentScores = [
    { name: 'Password Security', score: 87 },
    { name: 'Phishing Awareness', score: 76 },
    { name: 'Data Protection', score: 92 },
    { name: 'Device Security', score: 81 },
    { name: 'Remote Work', score: 79 },
  ];

  // Vulnerability Insights
  const phishingSimulationData = [
    { name: 'Jan', clickRate: 24 },
    { name: 'Feb', clickRate: 20 },
    { name: 'Mar', clickRate: 18 },
    { name: 'Apr', clickRate: 15 },
    { name: 'May', clickRate: 12 },
    { name: 'Jun', clickRate: 8 },
  ];

  // Engagement Metrics
  const timeSpentData = [
    { name: 'Week 1', hours: 2.5 },
    { name: 'Week 2', hours: 1.8 },
    { name: 'Week 3', hours: 3.2 },
    { name: 'Week 4', hours: 2.7 },
  ];

  // ROI and Business Impact
  const securityIncidentData = [
    { name: 'Q1', before: 12, after: 5 },
    { name: 'Q2', before: 10, after: 3 },
    { name: 'Q3', before: 8, after: 2 },
    { name: 'Q4', before: 7, after: 1 },
  ];

  // Risk Assessment
  const riskAssessmentData = [
    { subject: 'Password Practices', A: 65, B: 90 },
    { subject: 'Phishing Awareness', A: 70, B: 85 },
    { subject: 'Data Handling', A: 60, B: 88 },
    { subject: 'Device Security', A: 75, B: 95 },
    { subject: 'Access Management', A: 68, B: 82 },
  ];

  // High-Risk Employees
  const highRiskEmployees = [
    { name: 'John Doe', department: 'Sales', riskScore: 75, lastTraining: '2023-12-15' },
    { name: 'Jane Smith', department: 'Marketing', riskScore: 68, lastTraining: '2024-01-10' },
    { name: 'Bob Johnson', department: 'Finance', riskScore: 72, lastTraining: '2023-11-05' },
  ];

  // Course Completion Data
  const courseCompletionData = [
    { name: 'Cybersecurity Basics', value: 95 },
    { name: 'Phishing Prevention', value: 82 },
    { name: 'Data Protection', value: 78 },
    { name: 'Password Security', value: 90 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Create PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Add company logo/header
      pdf.setFillColor(24, 27, 36); // Dark background
      pdf.rect(0, 0, 210, 30, 'F');
      pdf.setTextColor(229, 231, 235); // Light text
      pdf.setFontSize(20);
      pdf.text('Cybersecurity Training Report', 15, 15);
      
      // Add report metadata
      pdf.setFillColor(18, 27, 36); // Slightly lighter background
      pdf.rect(0, 30, 210, 25, 'F');
      pdf.setFontSize(12);
      pdf.text(`Report Period: ${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}`, 15, 40);
      pdf.text(`Department: ${departmentFilter === 'all' ? 'All Departments' : departmentFilter}`, 15, 45);
      pdf.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 50);
      
      // Add executive summary
      pdf.setFillColor(24, 27, 36);
      pdf.rect(0, 55, 210, 40, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246); // Blue accent
      pdf.text('Executive Summary', 15, 65);
      
      pdf.setTextColor(229, 231, 235);
      pdf.setFontSize(11);
      const summaryPoints = [
        `Overall completion rate is at 95%, a 12% improvement from last period`,
        `Phishing awareness has improved by 16%, reducing click rates from 24% to 8%`,
        `Security incidents have been reduced by 67% since training implementation`,
        `3 employees require additional training based on risk assessment`,
        `Recommended focus areas: Phishing Prevention, Password Security`
      ];
      
      let summaryYOffset = 75;
      summaryPoints.forEach(point => {
        pdf.text(`• ${point}`, 20, summaryYOffset);
        summaryYOffset += 7;
      });
      
      // Add completion rates section
      pdf.addPage();
      pdf.setFillColor(24, 27, 36);
      pdf.rect(0, 0, 210, 20, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Training Completion Rates', 15, 15);
      
      // Create custom table for completion data
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(59, 130, 246);
      pdf.rect(15, 25, 180, 10, 'F');
      pdf.text('Month', 20, 32);
      pdf.text('Completion Rate', 70, 32);
      pdf.text('Target', 120, 32);
      pdf.text('Status', 160, 32);
      
      let yPos = 35;
      completionData.forEach((item, index) => {
        yPos += 10;
        pdf.setFillColor(index % 2 === 0 ? 24 : 36, index % 2 === 0 ? 27 : 40, index % 2 === 0 ? 36 : 50);
        pdf.rect(15, yPos, 180, 10, 'F');
        pdf.setTextColor(229, 231, 235);
        pdf.text(item.name, 20, yPos + 7);
        pdf.text(`${item.completed}%`, 70, yPos + 7);
        pdf.text(`${item.target}%`, 120, yPos + 7);
        pdf.text(item.completed >= item.target ? '✓' : '✗', 160, yPos + 7);
      });
      
      // Add department completion rates
      yPos += 20;
      pdf.setFillColor(24, 27, 36);
      pdf.rect(0, yPos, 210, 20, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Department Completion Rates', 15, yPos + 15);
      
      // Create custom table for department data
      yPos += 25;
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(59, 130, 246);
      pdf.rect(15, yPos, 180, 10, 'F');
      pdf.text('Department', 20, yPos + 7);
      pdf.text('Completion Rate', 100, yPos + 7);
      pdf.text('Status', 160, yPos + 7);
      
      departmentData.forEach((item, index) => {
        yPos += 10;
        pdf.setFillColor(index % 2 === 0 ? 24 : 36, index % 2 === 0 ? 27 : 40, index % 2 === 0 ? 36 : 50);
        pdf.rect(15, yPos, 180, 10, 'F');
        pdf.setTextColor(229, 231, 235);
        pdf.text(item.name, 20, yPos + 7);
        pdf.text(`${item.completed}%`, 100, yPos + 7);
        pdf.text(item.completed >= 90 ? 'Excellent' : item.completed >= 80 ? 'Good' : 'Needs Improvement', 160, yPos + 7);
      });
      
      // Add high-risk employees section
      pdf.addPage();
      pdf.setFillColor(24, 27, 36);
      pdf.rect(0, 0, 210, 20, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(239, 68, 68); // Red for risk
      pdf.text('Employees Requiring Additional Training', 15, 15);
      
      // Create custom table for high-risk employees
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(239, 68, 68);
      pdf.rect(15, 25, 180, 10, 'F');
      pdf.text('Employee', 20, 32);
      pdf.text('Department', 60, 32);
      pdf.text('Risk Score', 100, 32);
      pdf.text('Last Training', 140, 32);
      pdf.text('Priority', 170, 32);
      
      yPos = 35;
      highRiskEmployees.forEach((employee, index) => {
        yPos += 10;
        pdf.setFillColor(index % 2 === 0 ? 24 : 36, index % 2 === 0 ? 27 : 40, index % 2 === 0 ? 36 : 50);
        pdf.rect(15, yPos, 180, 10, 'F');
        pdf.setTextColor(229, 231, 235);
        pdf.text(employee.name, 20, yPos + 7);
        pdf.text(employee.department, 60, yPos + 7);
        pdf.text(employee.riskScore.toString(), 100, yPos + 7);
        pdf.text(employee.lastTraining, 140, yPos + 7);
        pdf.text(employee.riskScore >= 70 ? 'High' : 'Medium', 170, yPos + 7);
      });
      
      // Add recommendations page
      yPos += 20;
      pdf.setFillColor(24, 27, 36);
      pdf.rect(0, yPos, 210, 20, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(16, 185, 129); // Green for recommendations
      pdf.text('Recommended Actions', 15, yPos + 15);
      
      // Create recommendations
      const recommendations = [
        {
          title: 'Phishing Training for Sales Team',
          description: 'Schedule targeted phishing awareness training for the Sales department, which shows 24% higher click rates than average.',
          priority: 'High',
          impact: 'Reduce phishing vulnerability by an estimated 15%'
        },
        {
          title: 'Password Security Workshop',
          description: '15% of employees are using weak passwords. Implement password manager training and enforce stronger password policies.',
          priority: 'Medium',
          impact: 'Strengthen account security and reduce credential-based attacks'
        },
        {
          title: 'Data Protection Refresher',
          description: 'Finance team needs a refresher on data handling procedures, particularly for sensitive financial information.',
          priority: 'Medium',
          impact: 'Ensure compliance with data protection regulations'
        }
      ];
      
      // Add conclusion
      pdf.addPage();
      pdf.setFillColor(24, 27, 36);
      pdf.rect(0, 0, 210, 40, 'F');
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Conclusion', 15, 15);
      
      pdf.setTextColor(229, 231, 235);
      pdf.setFontSize(11);
      const conclusionText = 
        "The cybersecurity training program has shown significant improvements in overall security awareness " +
        "and reduced vulnerability to common threats. The completion rate of 95% demonstrates strong engagement " +
        "across the organization. Focus areas for the next quarter should include targeted training for high-risk " +
        "employees and continued phishing simulations to maintain awareness. With these measures in place, we " +
        "expect to see further reductions in security incidents and improved resilience against cyber threats.";
      
      const splitConclusion = pdf.splitTextToSize(conclusionText, 180);
      pdf.text(splitConclusion, 15, 25);
      
      // Add footer with page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFillColor(24, 27, 36);
        pdf.rect(0, 287, 210, 10, 'F');
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Cybersecurity Training Report - Page ${i} of ${pageCount}`, 15, 292);
        pdf.text(`Confidential - For internal use only`, 150, 292);
      }
      
      // Save the PDF
      pdf.save('cybersecurity_training_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const StatCard = ({ title, value, trend, data, color, percentageChange, icon: Icon }) => (
    <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-sm flex items-center">
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {title}
        </h3>
        <span className={`${percentageChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} text-xs px-2 py-1 rounded`}>
          {percentageChange >= 0 ? '+' : ''}{percentageChange}%
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-medium text-white">{value}</p>
          <p className="text-sm text-gray-400">{trend}</p>
        </div>
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={percentageChange >= 0 ? "#10b981" : "#ef4444"} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div>
        <div className="flex justify-between items-center mb-8 mt-1">
          <h1 className="text-xl font-base text-white">Cybersecurity Training Progress</h1>
          <button 
            className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-200 rounded-lg transition-colors flex items-center"
            onClick={generatePDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </>
            )}
          </button>
        </div>

        <div ref={reportRef}>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-[#181b24] border-gray-800">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Time Range" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#181b24] text-white">
                <SelectItem className="bg-[#181b24] text-white" value="week">This Week</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="month">This Month</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="quarter">This Quarter</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px] bg-[#181b24] border-gray-800">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#181b24] text-white">
                <SelectItem className="bg-[#181b24] text-white" value="all">All Departments</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="it">IT</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="hr">HR</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="sales">Sales</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="finance">Finance</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger className="w-[180px] bg-[#181b24] border-gray-800">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Risk Level" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#181b24] text-white">
                <SelectItem className="bg-[#181b24] text-white" value="all">All Risk Levels</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="high">High Risk</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="medium">Medium Risk</SelectItem>
                <SelectItem className="bg-[#181b24] text-white" value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pdf-section">
            <StatCard
              title="Completion Rate"
              value="95%"
              trend="5% increase from last month"
              data={[
                { value: 78 },
                { value: 82 },
                { value: 86 },
                { value: 89 },
                { value: 95 },
              ]}
              percentageChange={5}
              icon={CheckCircle}
            />
            
            <StatCard
              title="Phishing Awareness"
              value="92%"
              trend="8% increase from baseline"
              data={[
                { value: 70 },
                { value: 75 },
                { value: 82 },
                { value: 88 },
                { value: 92 },
              ]}
              percentageChange={8}
              icon={Shield}
            />
            
            <StatCard
              title="Risk Score"
              value="18"
              trend="Down from 32 last quarter"
              data={[
                { value: 32 },
                { value: 28 },
                { value: 24 },
                { value: 20 },
                { value: 18 },
              ]}
              percentageChange={-44}
              icon={AlertTriangle}
            />
            
            <StatCard
              title="Security Incidents"
              value="3"
              trend="Down from 12 last year"
              data={[
                { value: 12 },
                { value: 10 },
                { value: 7 },
                { value: 5 },
                { value: 3 },
              ]}
              percentageChange={-75}
              icon={Shield}
            />
          </div>

          {/* Training Completion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pdf-section">
            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-base mb-4">Training Completion Trend</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={completionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b24', borderColor: '#374151' }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                    <Legend />
                    <Bar dataKey="completed" name="Completed %" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="Target %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-base mb-4">Department Completion Rates</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b24', borderColor: '#374151' }}
                      labelStyle={{ color: '#e5e7eb' }}
                      formatter={(value) => [`${value}%`, 'Completion Rate']}
                    />
                    <Bar dataKey="completed" name="Completion %" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Performance and Vulnerability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pdf-section">
            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-base mb-4">Security Skills Assessment</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskAssessmentData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" />
                    <Radar name="Before Training" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                    <Radar name="After Training" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                    <Legend />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b24', borderColor: '#374151' }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-base mb-4">Phishing Simulation Click Rates</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={phishingSimulationData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b24', borderColor: '#374151' }}
                      labelStyle={{ color: '#e5e7eb' }}
                      formatter={(value) => [`${value}%`, 'Click Rate']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clickRate" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#ef4444' }}
                      activeDot={{ r: 6, fill: '#ef4444' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ROI and Business Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pdf-section">
            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-base mb-4">Security Incidents Reduction</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={securityIncidentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b24', borderColor: '#374151' }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                    <Legend />
                    <Bar dataKey="before" name="Before Training" fill="rgba(239, 68, 68, 0.7)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="after" name="After Training" fill="rgba(16, 185, 129, 0.7)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-base mb-4">Course Completion Breakdown</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseCompletionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {courseCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181b24', borderColor: '#374151' }}
                      formatter={(value) => [`${value}%`, 'Completion']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* High-Risk Employees */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg overflow-hidden mb-8 pdf-section">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-lg font-base">Employees Requiring Additional Training</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Training</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {highRiskEmployees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{employee.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-2.5 mr-2">
                          <div 
                            className="h-2.5 rounded-full bg-red-500" 
                            style={{ width: `${employee.riskScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">{employee.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{employee.lastTraining}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 px-3 py-1 rounded-lg text-xs">
                        Assign Training
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommendations */}
          <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6 mb-8 pdf-section">
            <h2 className="text-lg font-base mb-4">Recommended Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#050607] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="text-blue-400 mr-2 w-5 h-5" />
                  <h3 className="text-sm font-medium text-white">Phishing Training</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">Sales team shows 24% higher click rates on phishing simulations.</p>
                <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 px-3 py-1 rounded-lg text-xs w-full">
                  Schedule Training
                </button>
              </div>
              
              <div className="bg-[#050607] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="text-yellow-400 mr-2 w-5 h-5" />
                  <h3 className="text-sm font-medium text-white">Password Security</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">15% of employees using weak passwords. Recommend password manager training.</p>
                <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 px-3 py-1 rounded-lg text-xs w-full">
                  Schedule Training
                </button>
              </div>
              
              <div className="bg-[#050607] border border-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Target className="text-green-400 mr-2 w-5 h-5" />
                  <h3 className="text-sm font-medium text-white">Data Protection</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">Finance team needs refresher on data handling procedures.</p>
                <button className="bg-blue-500/30 text-blue-400 hover:bg-blue-500/50 hover:text-blue-200 px-3 py-1 rounded-lg text-xs w-full">
                  Schedule Training
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;

