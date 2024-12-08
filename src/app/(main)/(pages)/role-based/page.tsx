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

import React, { useState } from 'react';
import { Search, BookOpen, CheckCircle2, Lock, ArrowRight, Users, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const RoleBasedTraining = () => {
  // All possible roles organized by category
  const roles = {
    production: {
      name: "Production & Manufacturing",
      roles: ["Machine Operator", "Production Supervisor", "Quality Inspector", "Maintenance Technician"]
    },
    operations: {
      name: "Operations",
      roles: ["Operations Manager", "Warehouse Manager", "Logistics Coordinator", "Supply Chain Specialist"]
    },
    engineering: {
      name: "Engineering",
      roles: ["Process Engineer", "Quality Engineer", "Manufacturing Engineer", "Automation Engineer"]
    },
    quality: {
      name: "Quality & Safety",
      roles: ["Quality Manager", "Safety Officer", "Quality Auditor", "Compliance Specialist"]
    },
    maintenance: {
      name: "Maintenance",
      roles: ["Maintenance Manager", "Reliability Engineer", "Maintenance Planner", "Equipment Technician"]
    }
  };

  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // If no role is selected, show the role selection screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-base text-white mb-2">Select Your Role</h1>
          <p className="text-gray-400 text-sm mb-8">Choose your role to view relevant training modules</p>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for your role..."
                className="bg-[#050607] border border-gray-800 text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-gray-700 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(roles)
              .filter(([key, category]) => 
                category.roles.some(role => 
                  role.toLowerCase().includes(searchTerm.toLowerCase())
                ) || 
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(([key, category]) => (
                <div key={key} className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="bg-gray-900/50 px-6 py-4 border-b border-gray-800">
                    <h2 className="text-lg font-medium text-white">{category.name}</h2>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.roles
                      .filter(role => 
                        role.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((role, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedRole(role)}
                          className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-left hover:border-gray-600 transition-colors flex justify-between items-center"
                        >
                          <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                            <span>{role}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </button>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Role is selected - show the learning path
  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setSelectedRole(null)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Roles
          </button>
          <h1 className="text-2xl font-base text-white">Training Path: {selectedRole}</h1>
        </div>

        {/* Here you would render the specific learning path for the selected role */}
        {/* This is where your existing learning path content would go */}
      </div>
    </div>
  );
};

export default RoleBasedTraining;