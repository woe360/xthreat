// 'use client'
// import React, { useState } from 'react';
// import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';

// const AccountsPage = () => {
//   const [employees, setEmployees] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({ name: '', email: '', phone: '', department: '' });

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     employee.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
//       setEmployees([...employees, { ...newEmployee, id: employees.length + 1, joinDate: new Date().toISOString().split('T')[0], completedCourses: 0, activeCourses: 0 }]);
//       setNewEmployee({ name: '', email: '', phone: '', department: '' });
//       setShowAddModal(false);
//     }
//   };

//   const handleRemoveEmployee = (id) => {
//     setEmployees(employees.filter(employee => employee.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Accounts Overview</h1>

//       {/* Search and Add Employee */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search employees..."
//             className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
//           onClick={() => setShowAddModal(true)}
//         >
//           <UserPlus size={20} className="mr-2" />
//           Add Employee
//         </button>
//       </div>

//       {/* Employee List */}
//       <div className="bg-gray-800 rounded-lg overflow-hidden">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-700">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Join Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Courses</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {filteredEmployees.map((employee) => (
//               <tr key={employee.id}>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium">{employee.name}</div>
//                       <div className="text-sm text-gray-400">{employee.email}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm">{employee.department}</td>
//                 <td className="px-6 py-4 text-sm">{employee.joinDate}</td>
//                 <td className="px-6 py-4 text-sm">
//                   <div>Completed: {employee.completedCourses}</div>
//                   <div>Active: {employee.activeCourses}</div>
//                 </td>
//                 <td className="px-6 py-4 text-sm">
//                   <button
//                     className="text-red-400 hover:text-red-300 mr-2"
//                     onClick={() => handleRemoveEmployee(employee.id)}
//                   >
//                     <UserMinus size={20} />
//                   </button>
//                   <button className="text-blue-400 hover:text-blue-300">
//                     <BarChart2 size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Employee Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-gray-800 p-6 rounded-lg w-96">
//             <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.name}
//               onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.email}
//               onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
//             />
//             <input
//               type="tel"
//               placeholder="Phone"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
//               value={newEmployee.phone}
//               onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
//             />
//             <input
//               type="text"
//               placeholder="Department"
//               className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
//               value={newEmployee.department}
//               onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleAddEmployee}
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccountsPage;


'use client'
import React, { useState, ChangeEvent } from 'react';
import { Search, UserPlus, UserMinus, BarChart2 } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  joinDate: string;
  completedCourses: number;
  activeCourses: number;
}

interface NewEmployee {
  name: string;
  email: string;
  phone: string;
  department: string;
}

const AccountsPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', department: 'IT', joinDate: '2023-01-15', completedCourses: 15, activeCourses: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', department: 'HR', joinDate: '2023-03-01', completedCourses: 10, activeCourses: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 246-8135', department: 'Sales', joinDate: '2023-02-14', completedCourses: 8, activeCourses: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState<NewEmployee>({ 
    name: '', 
    email: '', 
    phone: '', 
    department: '' 
  });

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.phone && newEmployee.department) {
      const newEmployeeWithDetails: Employee = {
        ...newEmployee,
        id: employees.length + 1,
        joinDate: new Date().toISOString().split('T')[0],
        completedCourses: 0,
        activeCourses: 0
      };
      setEmployees([...employees, newEmployeeWithDetails]);
      setNewEmployee({ name: '', email: '', phone: '', department: '' });
      setShowAddModal(false);
    }
  };

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Accounts Overview</h1>

      {/* Search and Add Employee */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <UserPlus size={20} className="mr-2" />
          Add Employee
        </button>
      </div>

      {/* Employee List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Courses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium">{employee.name}</div>
                      <div className="text-sm text-gray-400">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{employee.department}</td>
                <td className="px-6 py-4 text-sm">{employee.joinDate}</td>
                <td className="px-6 py-4 text-sm">
                  <div>Completed: {employee.completedCourses}</div>
                  <div>Active: {employee.activeCourses}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="text-red-400 hover:text-red-300 mr-2"
                    onClick={() => handleRemoveEmployee(employee.id)}
                  >
                    <UserMinus size={20} />
                  </button>
                  <button className="text-blue-400 hover:text-blue-300">
                    <BarChart2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
              value={newEmployee.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
              value={newEmployee.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-2"
              value={newEmployee.phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
              value={newEmployee.department}
              onChange={handleInputChange}
            />
            <div className="flex justify-end">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddEmployee}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;