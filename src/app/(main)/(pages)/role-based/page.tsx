'use client'

// import React, { useState } from 'react';
// import { Search, BookOpen, CheckCircle2, Lock, Trophy, BarChart2, Users, ArrowRight, Building2, Filter } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// const RoleTrainingPage = () => {
//   const sectors = {
//     healthcare: "Healthcare",
//     finance: "Finance & Banking",
//     education: "Education",
//     manufacturing: "Manufacturing",
//     technology: "Technology",
//     retail: "Retail & Sales"
//   };

//   // Mock data for training paths organized by sectors
//   const [trainingPaths] = useState([
//     {
//       id: 1,
//       sector: "healthcare",
//       role: "Clinical Nurse Specialist",
//       description: "Advanced nursing practice with focus on patient care, clinical procedures, and healthcare protocols",
//       totalModules: 15,
//       completedModules: 6,
//       requiredSkills: ["Patient Care", "Clinical Procedures", "Medical Documentation"],
//       difficulty: "Advanced",
//       estimatedTime: "30 hours",
//       modules: [
//         {
//           id: 1,
//           title: "Advanced Patient Assessment",
//           status: "completed",
//           type: "Core",
//           duration: "4 hours",
//           points: 200
//         },
//         {
//           id: 2,
//           title: "Healthcare Documentation Systems",
//           status: "in_progress",
//           type: "Core",
//           duration: "3 hours",
//           points: 150
//         }
//       ]
//     },
//     {
//       id: 2,
//       sector: "finance",
//       role: "Investment Analyst",
//       description: "Master financial analysis, market research, and investment strategies",
//       totalModules: 12,
//       completedModules: 4,
//       requiredSkills: ["Financial Analysis", "Risk Assessment", "Market Research"],
//       difficulty: "Intermediate",
//       estimatedTime: "25 hours",
//       modules: [
//         {
//           id: 1,
//           title: "Financial Markets Fundamentals",
//           status: "completed",
//           type: "Core",
//           duration: "3 hours",
//           points: 150
//         },
//         {
//           id: 2,
//           title: "Investment Risk Analysis",
//           status: "in_progress",
//           type: "Advanced",
//           duration: "4 hours",
//           points: 200
//         }
//       ]
//     },
//     {
//       id: 3,
//       sector: "manufacturing",
//       role: "Production Supervisor",
//       description: "Learn production management, quality control, and team leadership in manufacturing",
//       totalModules: 10,
//       completedModules: 3,
//       requiredSkills: ["Process Optimization", "Quality Control", "Team Management"],
//       difficulty: "Intermediate",
//       estimatedTime: "20 hours",
//       modules: [
//         {
//           id: 1,
//           title: "Lean Manufacturing Principles",
//           status: "in_progress",
//           type: "Core",
//           duration: "3 hours",
//           points: 150
//         }
//       ]
//     },
//     {
//       id: 4,
//       sector: "education",
//       role: "Instructional Designer",
//       description: "Create effective learning experiences through curriculum development and educational technology",
//       totalModules: 8,
//       completedModules: 2,
//       requiredSkills: ["Curriculum Development", "Educational Technology", "Learning Assessment"],
//       difficulty: "Intermediate",
//       estimatedTime: "18 hours",
//       modules: [
//         {
//           id: 1,
//           title: "Learning Theory Fundamentals",
//           status: "completed",
//           type: "Core",
//           duration: "2 hours",
//           points: 100
//         }
//       ]
//     },
//     {
//       id: 5,
//       sector: "technology",
//       role: "Cloud Solutions Architect",
//       description: "Design and implement scalable cloud infrastructure and solutions",
//       totalModules: 14,
//       completedModules: 5,
//       requiredSkills: ["Cloud Architecture", "System Design", "Security"],
//       difficulty: "Advanced",
//       estimatedTime: "28 hours",
//       modules: [
//         {
//           id: 1,
//           title: "Cloud Infrastructure Basics",
//           status: "completed",
//           type: "Core",
//           duration: "4 hours",
//           points: 200
//         }
//       ]
//     },
//     {
//       id: 6,
//       sector: "retail",
//       role: "Retail Operations Manager",
//       description: "Master retail operations, inventory management, and team leadership",
//       totalModules: 10,
//       completedModules: 4,
//       requiredSkills: ["Operations Management", "Inventory Control", "Staff Leadership"],
//       difficulty: "Intermediate",
//       estimatedTime: "22 hours",
//       modules: [
//         {
//           id: 1,
//           title: "Retail Operations Fundamentals",
//           status: "completed",
//           type: "Core",
//           duration: "3 hours",
//           points: 150
//         }
//       ]
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSector, setSelectedSector] = useState('all');

//   const StatCard = ({ title, value, icon: Icon, color }) => (
//     <Card className="bg-[#050607] border-gray-800">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
//         <Icon className={`text-${color}-400 h-5 w-5`} />
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold text-white">{value}</div>
//       </CardContent>
//     </Card>
//   );

//   const getStatusBadge = (status) => {
//     const styles = {
//       completed: 'bg-green-500/20 text-green-400',
//       in_progress: 'bg-yellow-500/20 text-yellow-400',
//       locked: 'bg-gray-500/20 text-gray-400'
//     };
//     const labels = {
//       completed: 'Completed',
//       in_progress: 'In Progress',
//       locked: 'Locked'
//     };
//     return <span className={`${styles[status]} text-xs px-2 py-1 rounded`}>{labels[status]}</span>;
//   };

//   const filteredPaths = trainingPaths.filter(path => {
//     const matchesSearch = path.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          path.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSector = selectedSector === 'all' || path.sector === selectedSector;
//     return matchesSearch && matchesSector;
//   });

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-xl font-base text-white">Sector-Based Training Paths</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           title="Industry Sectors"
//           value={Object.keys(sectors).length}
//           icon={Building2}
//           color="blue"
//         />
//         <StatCard
//           title="Available Roles"
//           value={trainingPaths.length}
//           icon={Users}
//           color="green"
//         />
//         <StatCard
//           title="Total Programs"
//           value={trainingPaths.reduce((acc, curr) => acc + curr.totalModules, 0)}
//           icon={BookOpen}
//           color="purple"
//         />
//         <StatCard
//           title="Points Available"
//           value="2,500"
//           icon={Trophy}
//           color="yellow"
//         />
//       </div>

//       <div className="flex gap-4 mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search training paths..."
//             className="bg-[#050607] border border-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-64"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
//         </div>
        
//         <select
//           className="bg-[#050607] border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gray-700"
//           value={selectedSector}
//           onChange={(e) => setSelectedSector(e.target.value)}
//         >
//           <option value="all">All Sectors</option>
//           {Object.entries(sectors).map(([key, value]) => (
//             <option key={key} value={key}>{value}</option>
//           ))}
//         </select>
//       </div>

//       <div className="space-y-6">
//         {filteredPaths.map((path) => (
//           <div key={path.id} className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <span className="text-sm text-purple-400 mb-2 block">{sectors[path.sector]}</span>
//                 <h2 className="text-lg font-medium text-white mb-2">{path.role}</h2>
//                 <p className="text-gray-400 text-sm max-w-2xl mb-4">{path.description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {path.requiredSkills.map((skill) => (
//                     <span key={skill} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-4 text-sm text-gray-400">
//                   <span className="flex items-center gap-1">
//                     <BookOpen className="h-4 w-4" />
//                     {path.completedModules}/{path.totalModules} Modules
//                   </span>
//                   <span>{path.estimatedTime}</span>
//                   <span>{path.difficulty}</span>
//                 </div>
//               </div>
//               <button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
//                 View Path
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="space-y-3 mt-6">
//               {path.modules.map((module) => (
//                 <div key={module.id} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     {module.status === 'locked' ? (
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     ) : module.status === 'completed' ? (
//                       <CheckCircle2 className="h-5 w-5 text-green-400" />
//                     ) : (
//                       <BookOpen className="h-5 w-5 text-blue-400" />
//                     )}
//                     <div>
//                       <h3 className="font-medium">{module.title}</h3>
//                       <p className="text-sm text-gray-400">{module.duration} • {module.points} points</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">
//                       {module.type}
//                     </span>
//                     {getStatusBadge(module.status)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RoleTrainingPage;



// import React, { useState } from 'react';
// import { Search, BookOpen, CheckCircle2, Lock, ArrowRight, Users, Briefcase } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// const RoleBasedTraining = () => {
//   // All possible roles organized by category
//   const roles = {
//     production: {
//       name: "Production & Manufacturing",
//       roles: ["Machine Operator", "Production Supervisor", "Quality Inspector", "Maintenance Technician"]
//     },
//     operations: {
//       name: "Operations",
//       roles: ["Operations Manager", "Warehouse Manager", "Logistics Coordinator", "Supply Chain Specialist"]
//     },
//     engineering: {
//       name: "Engineering",
//       roles: ["Process Engineer", "Quality Engineer", "Manufacturing Engineer", "Automation Engineer"]
//     },
//     quality: {
//       name: "Quality & Safety",
//       roles: ["Quality Manager", "Safety Officer", "Quality Auditor", "Compliance Specialist"]
//     },
//     maintenance: {
//       name: "Maintenance",
//       roles: ["Maintenance Manager", "Reliability Engineer", "Maintenance Planner", "Equipment Technician"]
//     }
//   };

//   const [selectedRole, setSelectedRole] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // If no role is selected, show the role selection screen
//   if (!selectedRole) {
//     return (
//       <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-2xl font-base text-white mb-2">Select Your Role</h1>
//           <p className="text-gray-400 text-sm mb-8">Choose your role to view relevant training modules</p>

//           <div className="mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search for your role..."
//                 className="bg-[#050607] border border-gray-800 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-full"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
//             </div>
//           </div>

//           <div className="space-y-6">
//             {Object.entries(roles)
//               .filter(([key, category]) => 
//                 category.roles.some(role => 
//                   role.toLowerCase().includes(searchTerm.toLowerCase())
//                 ) || 
//                 category.name.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map(([key, category]) => (
//                 <div key={key} className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
//                   <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800">
//                     <h2 className="text-lg font-medium text-white">{category.name}</h2>
//                   </div>
//                   <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {category.roles
//                       .filter(role => 
//                         role.toLowerCase().includes(searchTerm.toLowerCase())
//                       )
//                       .map((role, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setSelectedRole(role)}
//                           className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-left hover:border-gray-600 transition-colors flex justify-between items-center"
//                         >
//                           <div className="flex items-center gap-3">
//                             <Briefcase className="h-5 w-5 text-gray-400" />
//                             <span>{role}</span>
//                           </div>
//                           <ArrowRight className="h-4 w-4 text-gray-400" />
//                         </button>
//                     ))}
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Role is selected - show the learning path
//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <button 
//             onClick={() => setSelectedRole(null)}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             ← Back to Roles
//           </button>
//           <h1 className="text-2xl font-base text-white">Training Path: {selectedRole}</h1>
//         </div>

//         {/* Here you would render the specific learning path for the selected role */}
//         {/* This is where your existing learning path content would go */}
//       </div>
//     </div>
//   );
// };

// export default RoleBasedTraining;




// import React, { useState } from 'react';
// import { Search, BookOpen, CheckCircle2, Lock, ArrowRight, Users, Briefcase, Receipt, UserCircle } from 'lucide-react';

// const RoleBasedTraining = () => {
//   const roles = {
//     financial: {
//       name: "Financial Department",
//       roles: ["Financial Analyst", "Accountant", "Financial Controller", "Treasury Specialist"]
//     },
//     hr: {
//       name: "Human Resources",
//       roles: ["HR Manager", "Recruitment Specialist", "Training Coordinator", "HR Administrator"]
//     },
//     general: {
//       name: "General Employees",
//       roles: ["Administrative Assistant", "Office Manager", "Executive Assistant", "Project Coordinator"]
//     }
//   };

//   const [selectedRole, setSelectedRole] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case 'financial':
//         return <Receipt className="h-5 w-5 text-green-400" />;
//       case 'hr':
//         return <Users className="h-5 w-5 text-blue-400" />;
//       case 'general':
//         return <UserCircle className="h-5 w-5 text-purple-400" />;
//       default:
//         return <Briefcase className="h-5 w-5 text-gray-400" />;
//     }
//   };

//   if (!selectedRole) {
//     return (
//       <main className="bg-[#050607] font-sans text-gray-100 min-h-screen">
//         {/* Header Section */}
//         <div className="mx-10">
//           <div className="border-b border-gray-800">
//             <div className="py-4">
//               <h1 className="text-xl font-medium mb-4 mt-3">Select Your Role</h1>
//               <p className="text-gray-400 w-3/5 text-base mb-8">
//                 Choose your role to access personalized training modules designed specifically for your position.
//                 Our role-based learning paths ensure you receive the most relevant and effective training content.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="sticky top-0 bg-[#050607] z-[50]">
//           <div className="border-b border-gray-800 shadow-lg mx-10">
//             <div className="py-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search for your role..."
//                   className="bg-[#181b24] border border-gray-800 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-full"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Roles Grid */}
//         <div className="px-10 pt-4">
//           <div className="space-y-6">
//             {Object.entries(roles)
//               .filter(([key, category]) => 
//                 category.roles.some(role => 
//                   role.toLowerCase().includes(searchTerm.toLowerCase())
//                 ) || 
//                 category.name.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map(([key, category]) => (
//                 <div key={key} className="bg-[#181b24] border border-gray-800 rounded-lg overflow-hidden">
//                   <div className="bg-[#181b24] px-6 py-4 border-b border-gray-800 flex items-center gap-3">
//                     {getCategoryIcon(key)}
//                     <h2 className="text-lg font-medium text-white">{category.name}</h2>
//                   </div>
//                   <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {category.roles
//                       .filter(role => 
//                         role.toLowerCase().includes(searchTerm.toLowerCase())
//                       )
//                       .map((role, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setSelectedRole(role)}
//                           className="bg-[#181b24] border border-gray-700 rounded-lg p-4 text-left hover:border-gray-600 transition-colors flex justify-between items-center"
//                         >
//                           <div className="flex items-center gap-3">
//                             <Briefcase className="h-5 w-5 text-gray-400" />
//                             <span>{role}</span>
//                           </div>
//                           <ArrowRight className="h-4 w-4 text-gray-400" />
//                         </button>
//                     ))}
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // Role is selected - show the learning path
//   return (
//     <main className="bg-[#050607] font-sans text-gray-100 min-h-screen">
//       <div className="mx-10">
//         <div className="border-b border-gray-800">
//           <div className="py-4">
//             <div className="flex items-center gap-4 mb-4 mt-3">
//               <button 
//                 onClick={() => setSelectedRole(null)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 ← Back to Roles
//               </button>
//               <h1 className="text-xl font-medium">Training Path: {selectedRole}</h1>
//             </div>
//             <p className="text-gray-400 w-3/5 text-base mb-8">
//               Follow your personalized learning path designed specifically for {selectedRole}s.
//               Complete these modules to enhance your skills and knowledge in your role.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Training Modules Section */}
//       <div className="px-10 pt-4">
//         <div className="space-y-4">
//           <div className="bg-[#181b24] border border-gray-800 rounded-lg p-6">
//             <h2 className="text-lg font-medium text-white mb-4">Your Learning Journey</h2>
//             {/* Add your training content here */}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default RoleBasedTraining;



// 'use client'

// import React from 'react';
// import Link from 'next/link';

// const DepartmentTraining = () => {
//   const departments = [
//     {
//       id: 'finance',
//       title: 'Finance & Accounting',
//       description: 'Security training for handling financial data, preventing fraud, and securing financial transactions.',
//       riskLevel: 'High',
//       estimatedTime: 4,
//       gradient: 'from-green-500/20 to-emerald-500/5'
//     },
//     {
//       id: 'hr',
//       title: 'Human Resources',
//       description: 'Training focused on protecting employee data, preventing social engineering attacks, and maintaining personnel information security.',
//       riskLevel: 'High',
//       estimatedTime: 3,
//       gradient: 'from-blue-500/20 to-cyan-500/5'
//     },
//     {
//       id: 'it',
//       title: 'IT & Technology',
//       description: 'Advanced security protocols, system protection, and infrastructure security best practices.',
//       riskLevel: 'High',
//       estimatedTime: 6,
//       gradient: 'from-purple-500/20 to-violet-500/5'
//     },
//     {
//       id: 'sales',
//       title: 'Sales & Business Development',
//       description: 'Security practices for CRM data, mobile device protection, and defense against targeted phishing.',
//       riskLevel: 'Medium',
//       estimatedTime: 2.5,
//       gradient: 'from-orange-500/20 to-amber-500/5'
//     },
//     {
//       id: 'operations',
//       title: 'Operations & Administration',
//       description: 'Essential security practices for document handling, vendor management, and daily operations.',
//       riskLevel: 'Medium',
//       estimatedTime: 2,
//       gradient: 'from-yellow-500/20 to-amber-500/5'
//     },
//     {
//       id: 'executive',
//       title: 'Executive & Management',
//       description: 'Critical security awareness for leadership, focusing on high-level threats and strategic security decisions.',
//       riskLevel: 'High',
//       estimatedTime: 3,
//       gradient: 'from-red-500/20 to-rose-500/5'
//     }
//   ];

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
//       <div className="border-b border-gray-800/40 pb-6 mb-8">
//         <h1 className="text-2xl font-medium text-white mb-4">Security Awareness Training</h1>
//         <p className="text-gray-400 text-sm max-w-3xl">
//           Select your department to access specialized cybersecurity training modules tailored to your role's specific security requirements and risk factors.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {departments.map((dept) => (
//           <Link 
//             href={`/training/${dept.id}`} 
//             key={dept.id}
//           >
//             <div className={`group bg-gradient-to-br ${dept.gradient} hover:bg-[#181b24]/80 border border-gray-800/50 hover:border-gray-700 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden relative`}>
//               <div className="absolute inset-0 bg-[#181b24] opacity-95 group-hover:opacity-90 transition-opacity"></div>
//               <div className="relative p-6">
//                 <div className="flex flex-col">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="text-lg font-medium text-white group-hover:text-white/95 transition-colors">
//                       {dept.title}
//                     </h3>
//                     <div className="flex items-center gap-2 ml-4">
//                       <span className={`bg-${dept.riskLevel === 'High' ? 'red' : 'orange'}-500/10 
//                         ${dept.riskLevel === 'High' ? 'text-red-400' : 'text-orange-400'} 
//                         px-3 py-1 rounded-lg text-sm`}>
//                         {dept.riskLevel} Risk
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
//                     {dept.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-500 group-hover:text-gray-400">
//                       Estimated completion: {dept.estimatedTime} hours
//                     </span>
//                     <span className="text-gray-400 group-hover:translate-x-1 transition-transform duration-200">
//                       →
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DepartmentTraining;


'use client'

import React, { useState } from 'react';
import Link from 'next/link';

const DepartmentTraining = () => {
  const [selectedDept, setSelectedDept] = useState(null);

  const departments = [
    {
      id: 'finance',
      title: 'Finance & Accounting',
      description: 'Security training for handling financial data, preventing fraud, and securing financial transactions.',
      riskLevel: 'High',
      estimatedTime: 4,
      preview: 'Learn to protect financial assets, secure transactions, and prevent cyber fraud. This training covers secure banking protocols, financial data protection, and identifying financial fraud attempts.',
      keyTopics: [
        'Secure financial transaction handling',
        'Protection of banking credentials',
        'Financial data encryption',
        'Fraud prevention protocols'
      ]
    },
    {
      id: 'hr',
      title: 'Human Resources',
      description: 'Training focused on protecting employee data, preventing social engineering attacks, and maintaining personnel information security.',
      riskLevel: 'High',
      estimatedTime: 3,
      preview: 'Master the protection of sensitive employee information and prevent social engineering attacks. Learn about secure data handling and privacy compliance.',
      keyTopics: [
        'Employee data protection',
        'Social engineering defense',
        'Privacy compliance',
        'Secure document handling'
      ]
    },
    {
      id: 'it',
      title: 'IT & Technology',
      description: 'Advanced security protocols, system protection, and infrastructure security best practices.',
      riskLevel: 'High',
      estimatedTime: 6,
      preview: 'Advanced security training covering system protection, infrastructure security, and technical safeguards. Designed for IT professionals managing company systems.',
      keyTopics: [
        'System security protocols',
        'Infrastructure protection',
        'Access control management',
        'Security incident response'
      ]
    },
    {
      id: 'sales',
      title: 'Sales & Business Development',
      description: 'Security practices for CRM data, mobile device protection, and defense against targeted phishing.',
      riskLevel: 'Medium',
      estimatedTime: 2.5,
      preview: 'Learn to protect customer data and secure mobile devices while working remotely. Focus on preventing phishing attacks and securing customer information.',
      keyTopics: [
        'CRM data protection',
        'Mobile security',
        'Anti-phishing techniques',
        'Customer data privacy'
      ]
    },
    {
      id: 'operations',
      title: 'Operations & Administration',
      description: 'Essential security practices for document handling, vendor management, and daily operations.',
      riskLevel: 'Medium',
      estimatedTime: 2,
      preview: 'Essential security training for daily operations, including document handling, vendor management, and operational security practices.',
      keyTopics: [
        'Document security',
        'Vendor access management',
        'Operational security',
        'Communication security'
      ]
    },
    {
      id: 'executive',
      title: 'Executive & Management',
      description: 'Critical security awareness for leadership, focusing on high-level threats and strategic security decisions.',
      riskLevel: 'High',
      estimatedTime: 3,
      preview: 'Executive-focused security training covering strategic security decisions, leadership responsibilities, and high-level threat awareness.',
      keyTopics: [
        'Strategic security planning',
        'Executive-level threats',
        'Security leadership',
        'Risk management'
      ]
    }
  ];

  if (selectedDept) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
        <div className="border-b border-gray-800/40 pb-6 mb-8">
          <button 
            onClick={() => setSelectedDept(null)}
            className="text-gray-400 hover:text-white mb-6 transition-colors"
          >
            ← Back to Departments
          </button>
          
          <h1 className="text-2xl font-medium text-white mb-4">{selectedDept.title}</h1>
          <p className="text-gray-400 text-sm max-w-3xl mb-6">
            {selectedDept.preview}
          </p>
          
          <div className="flex gap-3">
            <span className={`${selectedDept.riskLevel === 'High' ? 'text-red-400' : 'text-orange-400'} px-3 py-1 rounded-lg text-sm`}>
              {selectedDept.riskLevel} Risk Level
            </span>
            <span className="text-gray-400 text-sm">
              {selectedDept.estimatedTime} hours estimated
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">Key Topics Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDept.keyTopics.map((topic, index) => (
              <div key={index} className="bg-[#181b24] p-4 rounded-lg">
                <p className="text-gray-300">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        <Link 
          href={`/training/${selectedDept.id}/start`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Start Training
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
      <div className="border-b border-gray-800/40 pb-6 mb-8">
        <h1 className="text-2xl font-medium text-white mb-4">Security Awareness Training</h1>
        <p className="text-gray-400 text-sm max-w-3xl">
          Select your department to access specialized cybersecurity training modules tailored to your role's specific security requirements and risk factors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <button 
            key={dept.id}
            onClick={() => setSelectedDept(dept)}
            className="text-left"
          >
            <div className="bg-[#181b24] border border-gray-800/50 hover:border-gray-700 rounded-lg cursor-pointer transition-all duration-200">
              <div className="p-6">
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-white">
                      {dept.title}
                    </h3>
                    <span className={`${dept.riskLevel === 'High' ? 'text-red-400' : 'text-orange-400'} 
                      px-3 py-1 rounded-lg text-sm ml-4`}>
                      {dept.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {dept.description}
                  </p>
                  <span className="text-sm text-gray-500">
                    Estimated completion: {dept.estimatedTime} hours
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTraining;