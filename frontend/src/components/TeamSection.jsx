// import Aryan from '../assets/AryanGupta.png';
// import Girl1 from '../assets/girl1.jpg';
// import Boy1 from '../assets/Boy1.jpg';
// import Boy2 from '../assets/Boy2.jpg';
// import Girl2 from '../assets/girl2.jpg';
// import Gaurav from '../assets/Gaurav_Bind.jpeg';

// const teamMembers = [
//   { src: Aryan, name: "Aryan Gupta", title: "Founder and CEO" },
//   { src: Gaurav, name: "Gaurav Bind", title: "Tech Team Lead" },
//   { src: Boy1, name: "Pranay Agarwal", title: "Tech Team Lead" },
//   { src: Boy2, name: "Pradyumna Deshpande", title: "Designer" },
//   { src: Girl1, name: "Nihi Srivastava", title: "Social Media Manager" },
//   { src: Girl2, name: "Sneha Sharma", title: "On Ground Lead" },
// ];

// const TeamSection = () => {
//   return (
//     <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
//           <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
//             We're a global team of laundry, tech, and logistics experts on a mission to free people
//             from laundry so that they can spend more time doing what they <span className="text-yellow-400">💛</span>
//           </p>
//           <p className="mt-4 font-semibold text-xl text-yellow-400">TEAM ANDES</p>
//         </div>

//         {/* Founder Section */}
//         <div className="flex justify-center mb-16">
//           <div className="relative group">
//             <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-2xl shadow-2xl 
//                           transform transition-all duration-500 group-hover:scale-105">
//               <img
//                 src={teamMembers[0].src}
//                 alt={teamMembers[0].name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent 
//                             opacity-0 group-hover:opacity-90 transition-opacity duration-300 
//                             flex flex-col justify-end p-6">
//                 <h3 className="text-2xl font-bold">{teamMembers[0].name}</h3>
//                 <p className="text-blue-200">{teamMembers[0].title}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Other Team Members */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
//           {teamMembers.slice(1).map((member, index) => (
//             <div key={index} className="relative group">
//               <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-xl 
//                             transform transition-all duration-500 group-hover:scale-105">
//                 <img
//                   src={member.src}
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent 
//                               opacity-0 group-hover:opacity-90 transition-opacity duration-300 
//                               flex flex-col justify-end p-4">
//                   <h3 className="text-lg font-bold">{member.name}</h3>
//                   <p className="text-blue-200 text-sm">{member.title}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamSection;


// import Aryan from '../assets/AryanGupta.png';
// import Sandeep from '../assets/Sandeep.png'; // Add mentor image to assets and import
// import { FaLinkedin } from 'react-icons/fa';
// import Gaurav from '../assets/Gaurav_Bind.jpeg';
// import Aryan1 from '../assets/Aryan1.png';
// import Pavanraje from '../assets/Pavanraje.png'
// import Aanchal from '../assets/Aanchal.png'
// import Rameshwar from '../assets/Rameshwar.png'



// const teamMembers = [
//   {
//     src: Sandeep,
//     name: "Sandeep dandekar",
//     title: "Investor & Mentor in Andes",
//     description: "Senior Director NTT Global Data Centers and Cloud Infrastructure, India",
//     linkedin: "saandeep-v-dandekarr"
//   },
//   {
//     src: Aryan,
//     name: "Aryan Gupta",
//     title: "FOUNDER & CEO, Andes",
//     description: "JourneyStory, podcast | Author of Stand Out from the Crowd.",
//     linkedin: "aryangupta164"
//   },
//   {
//     src: Gaurav,
//     name: "Gaurav Bind",
//     title: "CTO, Andes",
//     description: "",
//     linkedin: "bind-gaurav-69785a248"
//   },
//   {
//     src: Aryan1,
//     name: "Aryan Sharma",
//     title: "TM, Andes",
//     description: "",
//     linkedin: "aryansharma3876"
//   },
//   {
//     src: Pavanraje ,
//     name: "Pavanraje Hande",
//     title: "COO, Andes",
//     description: "",
//     linkedin: "pavanraje-ganesh-hande-a4b721332"
//   },
//   {
//     src: Aanchal ,
//     name: "Aanchal Sharma ",
//     title: "CHRO, Andes",
//     description: "",
//     linkedin: "simplyaanch26"
//   },
//   {
//     src: Rameshwar ,
//     name: "Rameshwar Swami",
//     title: "Operations Manager, Andes",
//     description: "",
//     linkedin: "rameshwar-swami-8469672b1"
//   },

  
// ];

// const TeamSection = () => {
//   return (
//     <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Team Members & Mentors:</h2>
//         </div>
//         <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
//           {teamMembers.map((member, idx) => (
//             <div key={idx}               className="bg-white rounded-2xl shadow-xl w-full md:w-[340px] flex flex-col items-center py-8 px-6 text-gray-900 transition-transform duration-300 hover:scale-105 border border-blue-100"
//             >
//               <div className="w-40 h-40 overflow-hidden rounded-xl mb-4 flex items-center justify-center bg-gray-100">
//                 <img
//                   src={member.src}
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className="text-xl font-bold mb-1">{member.name}</h3>
//               <p className="text-gray-700 font-medium mb-1">{member.title}</p>
//               <p className="text-gray-500 mb-3">{member.description}</p>
//               <div className="flex items-center gap-2 mt-2">
//   <a
//     href={`https://www.linkedin.com/in/${member.linkedin}`}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="flex items-center gap-1 text-blue-700 font-medium hover:underline"
//   >
//     <FaLinkedin className="text-blue-700" />
//     @{member.linkedin}
//   </a>
// </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamSection;


// import Aryan from '../assets/AryanGupta.png';
// import Sandeep from '../assets/Sandeep.png';
// import { FaLinkedin } from 'react-icons/fa';
// import Gaurav from '../assets/Gaurav_Bind.jpeg';
// import Aryan1 from '../assets/Aryan1.png';
// import Pavanraje from '../assets/Pavanraje.png';
// import Aanchal from '../assets/Aanchal.png';
// import Rameshwar from '../assets/Rameshwar.png';

// const teamMembers = [
//   {
//     src: Sandeep,
//     name: "Sandeep Dandekar",
//     title: "Investor & Mentor in Andes",
//     description: "Senior Director NTT Global Data Centers and Cloud Infrastructure, India. Sandeep brings strategic vision and mentorship to Andes.",
//     linkedin: "saandeep-v-dandekarr"
//   },
//   {
//     src: Aryan,
//     name: "Aryan Gupta",
//     title: "FOUNDER & CEO, Andes",
//     description: "Visionary entrepreneur, host of JourneyStory podcast, and author of 'Stand Out from the Crowd'. Aryan leads Andes with innovation and customer focus.",
//     linkedin: "aryangupta164"
//   },
//   {
//     src: Gaurav,
//     name: "Gaurav Bind",
//     title: "CTO, Andes",
//     description: "Tech leader driving Andes' platform development and security.",
//     linkedin: "bind-gaurav-69785a248"
//   },
//   {
//     src: Aryan1,
//     name: "Aryan Sharma",
//     title: "Team Manager, Andes",
//     description: "Aryan develops and manages the Andes website, ensuring a seamless and modern user experience for all customers",
//     linkedin: "aryansharma3876"
//   },
//   {
//     src: Pavanraje,
//     name: "Pavanraje Hande",
//     title: "COO, Andes",
//     description: "Operations expert overseeing logistics, delivery, and customer satisfaction. Pavanraje ensures Andes runs efficiently every day.",
//     linkedin: "pavanraje-ganesh-hande-a4b721332"
//   },
//   {
//     src: Aanchal,
//     name: "Aanchal Sharma",
//     title: "CHRO, Andes",
//     description: "Aanchal manages human resources, talent acquisition, and team well-being, building a strong and motivated workforce.",
//     linkedin: "simplyaanch26"
//   },
//   {
//     src: Rameshwar,
//     name: "Rameshwar Swami",
//     title: "Operations Manager, Andes",
//     description: "Rameshwar leads ground operations, ensuring timely pickups and deliveries, and upholding Andes' service standards.",
//     linkedin: "rameshwar-swami-8469672b1"
//   },
// ];

// const TeamSection = () => {
//   return (
//     <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Team Members & Mentors</h2>
//           <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
//             Meet the passionate Andes team—experts in laundry, tech, and operations, united to deliver the best customer experience.
//           </p>
//           <p className="mt-4 font-semibold text-xl text-yellow-400">TEAM ANDES</p>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
//           {teamMembers.map((member, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-2xl shadow-xl w-full max-w-xs flex flex-col items-center py-8 px-6 text-gray-900 transition-transform duration-300 hover:scale-105 border border-blue-100"
//             >
//               <div className="w-32 h-32 overflow-hidden rounded-xl mb-4 flex items-center justify-center bg-gray-100 shadow-md">
//                 <img
//                   src={member.src}
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <h3 className="text-xl font-bold mb-1 text-blue-700">{member.name}</h3>
//               <p className="text-blue-500 font-medium mb-1">{member.title}</p>
//               <p className="text-gray-600 mb-3 text-center">{member.description}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <a
//                   href={`https://www.linkedin.com/in/${member.linkedin}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-blue-700 font-medium hover:underline"
//                 >
//                   <FaLinkedin className="text-blue-700" />
//                   @{member.linkedin}
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamSection;


import Aryan from '../assets/AryanGupta.png';
import Sandeep from '../assets/Sandeep.png';
import { FaLinkedin } from 'react-icons/fa';
import Gaurav from '../assets/Gaurav_Bind.jpeg';
import Aryan1 from '../assets/Aryan1.png';
import Pavanraje from '../assets/Pavanraje.png';
import Aanchal from '../assets/Aanchal.png';
import Rameshwar from '../assets/Rameshwar.png';

const teamMembers = [
  {
    src: Sandeep,
    name: "Sandeep Dandekar",
    title: "Investor & Mentor in Andes",
    description: "Senior Director NTT Global Data Centers and Cloud Infrastructure, India. Sandeep brings strategic vision and mentorship to Andes.",
    linkedin: "saandeep-v-dandekarr"
  },
  {
    src: Aryan,
    name: "Aryan Gupta",
    title: "FOUNDER & CEO, Andes",
    description: "Visionary entrepreneur, host of JourneyStory podcast, and author of 'Stand Out from the Crowd'. Aryan leads Andes with innovation and customer focus.",
    linkedin: "aryangupta164"
  },
  {
    src: Gaurav,
    name: "Gaurav Bind",
    title: "CTO, Andes",
    description: "Tech leader driving Andes' platform development and security. Gaurav specializes in scalable cloud solutions and robust backend systems.",
    linkedin: "bind-gaurav-69785a248"
  },
  {
    src: Pavanraje,
    name: "Pavanraje Hande",
    title: "COO, Andes",
    description: "Operations expert overseeing logistics, delivery, and customer satisfaction. Pavanraje ensures Andes runs efficiently every day.",
    linkedin: "pavanraje-ganesh-hande-a4b721332"
  },
  {
    src: Aryan1,
    name: "Aryan Sharma",
    title: "Technical Manager, Andes",
    description: "Aryan develops and manages the Andes website, ensuring a seamless and modern user experience for all customers.",
    linkedin: "aryansharma3876"
  },
  
  {
    src: Aanchal,
    name: "Aanchal Sharma",
    title: "CHRO, Andes",
    description: "Aanchal manages human resources, talent acquisition, and team well-being, building a strong and motivated workforce.",
    linkedin: "simplyaanch26"
  },
  {
    src: Rameshwar,
    name: "Rameshwar Swami",
    title: "Operations Manager, Andes",
    description: "Rameshwar leads ground operations, ensuring timely pickups and deliveries, and upholding Andes' service standards.",
    linkedin: "rameshwar-swami-8469672b1"
  },
];

const TeamSection = () => {
  // Split team members for custom layout: 2, 3, 2
  const rows = [
    teamMembers.slice(0, 2),
    teamMembers.slice(2, 5),
    teamMembers.slice(5, 7),
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Team Members & Mentors</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Meet the passionate Andes team—experts in laundry, tech, and operations, united to deliver the best customer experience.
          </p>
          <p className="mt-4 font-semibold text-xl text-yellow-400">TEAM ANDES</p>
        </div>
        <div className="flex flex-col gap-10 items-center">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`flex justify-center gap-8 flex-wrap`}
            >
              {row.map((member, idx) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl shadow-xl w-[280px] h-[360px] flex flex-col items-center py-6 px-4 text-gray-900 transition-transform duration-300 hover:scale-105 border border-blue-100"
                >
                  <div className="w-40 h-40 overflow-hidden rounded-xl mb-3 flex items-center justify-center bg-gray-100 shadow-md">
                    <img
                      src={member.src}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold mb-1 text-blue-700 text-center">{member.name}</h3>
                  <p className="text-blue-500 font-medium mb-1 text-center text-sm">{member.title}</p>
                  <p className="text-gray-600 mb-2 text-xs text-center">{member.description}</p>
                  <div className="flex items-center gap-1 ">
                    <a
                      href={`https://www.linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-700 font-medium hover:underline text-xs"
                    >
                      <FaLinkedin className="text-blue-700 text-base" />
                      @{member.linkedin}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;