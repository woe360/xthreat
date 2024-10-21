// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const ModulePage = () => {
//   const router = useRouter();
//   const { slug } = router.query; // Get the slug from the URL

//   const [module, setModule] = useState(null);

//   useEffect(() => {
//     if (slug) {
//       const fetchModule = async () => {
//         try {
//           const response = await fetch(`http://localhost:5000/api/modules/${slug}`);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();
//           setModule(data);
//         } catch (error) {
//           console.error('Error fetching module:', error);
//         }
//       };

//       fetchModule();
//     }
//   }, [slug]);

//   if (!module) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-6 font-sans bg-black text-white min-h-screen">
//       <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
//       <p className="text-lg text-gray-400">{module.description}</p>
//       <div className="mt-4">
//         {module.tags.map((tag, index) => (
//           <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-2">
//             {tag}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ModulePage;
