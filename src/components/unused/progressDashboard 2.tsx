// import React from "react";

// const ProgressChart = () => {
//   const data = {
//     labels: [
//       "Completion Rate",
//       "Average Score",
//       "Phishing Success Rate",
//       "Engagement",
//       "Incident Reduction"
//     ],
//     datasets: [
//       {
//         label: "KPI Progress",
//         data: [85, 78, 92, 80, 45], // Sample data for KPIs
//         backgroundColor: [
//           "#737373", // green for completion rate
//           "#737373", // blue for average score
//           "#737373", // orange for phishing success rate
//           "#737373", // purple for engagement
//           "#737373"  // red for incident reduction
//         ],
//         borderColor: "#333333",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="p-0 rounded-lg">
//       {data.labels.map((label, index) => (
//         <div key={index} className="mb-4">
//           <div className="text-gray-400 mb-1">{label}: {data.datasets[0].data[index]}%</div>
//           <div className="w-full bg-gray-800 rounded-full h-4">
//             <div
//               className="h-4 rounded-full"
//               style={{
//                 width: `${data.datasets[0].data[index]}%`,
//                 backgroundColor: data.datasets[0].backgroundColor[index],
//               }}
//             ></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProgressChart;
