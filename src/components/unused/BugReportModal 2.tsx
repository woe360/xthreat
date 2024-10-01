// import React from "react";

// export default function BugReportModal({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Report a Bug</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700">Screenshot</label>
//             <input type="file" accept="image/*" className="w-full mt-2" />
//           </div>
//           <div className="mb-4 no-outline">
//             <label className="block text-gray-700">Category</label>
//             <select className="w-full mt-2 border border-gray-300 rounded-md">
//               <option value="ui">UI Issue</option>
//               <option value="performance">Performance Issue</option>
//               <option value="functional">Functional Issue</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Page</label>
//             <input
//               type="text"
//               placeholder="Enter page or URL"
//               className="w-full mt-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="mr-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
