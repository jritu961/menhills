// import {
//   Dashboard,
//   SectionFive,
//   SectionFour,
//   ImageWrapper,
//   SectionHeading,
//   SectionOne,
//   SectionSeven,
//   SectionThree,
//   SectionTwo,
//   SectionSix,
// } from "../styles/dashboard";
// import React, { useState, useEffect } from "react";
// import men from "../assets/men.jpg"; // Add your men's wear images here
// import sitingmen from "../assets/sitingmen.jpg";
// import watch from "../assets/watch.jpg";
// import menpose from "../assets/menpose.jpg";
// import mensiting from "../assets/mensiting.jpg";
// import sidemen from "../assets/sidemen.jpg";
// import lookmen from "../assets/lookmen.jpg";
// import shoes from "../assets/shoes.jpg";
// import shoes2 from "../assets/shoes2.jpg";
// import shoes3 from "../assets/shoes.jpg";
// import shoespose from "../assets/shoespose.jpg";
// import tie from "../assets/tie.jpg";

// export const DashboardSections = () => {
//   const images = [sidemen, mensiting, menpose, men, watch]; // Add more images here
//   const [currentImage, setCurrentImage] = useState(0);
  
//   const sectionone = [
//     {
//       heading: "Explore Men's Wear",
//       images: [tie],
//     },
//     {
//       heading: "Latest Accessories",
//       images: [shoes, men],
//     },
//     {
//       heading: "Formal Attire",
//       images: [men, shoes],
//     },
//     {
//       heading: "Casual Outfits",
//       images: [men, watch],
//     },
//     {
//       heading: "Street Style",
//       images: [shoes2,sitingmen ],
//     },
//     {
//       heading: "Exclusive Deals",
//       images: [sidemen, men],
//     },
//     {
//       heading: "Trending Now",
//       images: [sidemen, men],
//     },
//   ];

//   const sectiontwo = [
//     {
//       images: [lookmen],
//     },
//     {
//       images: [shoes],
//     },
//     {
//       images: [shoes2],
//     },
//     {
//       images: [shoes3, shoes2],
//     },
//     {
//       images: [shoespose, tie],
//     },
//     {
//       images: [tie, shoes3],
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => (prevImage + 1) % images.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <Dashboard>
//       <SectionOne>
//         <img src={images[currentImage]} alt="Men's Wear" />
//         <button
//           style={{
//             position: "absolute",
//             top: "600px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             padding: "12px 30px",
//             backgroundColor: "#ff5733",
//             color: "white",
//             fontSize: "18px",
//             fontWeight: "bold",
//             border: "none",
//             borderRadius: "50px",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#c0392b"; // Darker shade on hover
//             e.target.style.transform = "translateX(-50%) scale(1.1)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "#ff5733"; // Original color
//             e.target.style.transform = "translateX(-50%) scale(1)";
//           }}
//           onMouseDown={(e) => {
//             e.target.style.transform = "translateX(-50%) scale(1)"; // Reset scale when clicked
//           }}
//           onMouseUp={(e) => {
//             e.target.style.transform = "translateX(-50%) scale(1.1)"; // Return to enlarged state after click
//           }}
//         >
//           Shop Now
//         </button>
//       </SectionOne>
      
//       <div>
//         {sectionone.map((section, index) => (
//           <DynamicSection key={`sectionone-${index}`} heading={section.heading} images={section.images} />
//         ))}
//       </div>

//       {/* SectionTwo Images */}
//       <div>
//         {sectiontwo.map((section, index) => (
//           <DynamicSection key={`sectiontwo-${index}`} images={section.images} />
//         ))}
//       </div>

//       <SectionTwo>{/* Add content here */}</SectionTwo>
//       <SectionThree>{/* Add content here */}</SectionThree>
//       <SectionFour>{/* Add content here */}</SectionFour>
//       <SectionFive>{/* Add content here */}</SectionFive>
//       <SectionSix>{/* Add content here */}</SectionSix>
//       <SectionSeven>{/* Add content here */}</SectionSeven>
//     </Dashboard>
//   );
// };

// const DynamicSection = ({ heading, images }) => {
//   const [currentImage, setCurrentImage] = useState(0);

//   useEffect(() => {
//     if (images.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImage((prevImage) => (prevImage + 1) % images.length);
//       }, 3000);

//       return () => clearInterval(interval);
//     }
//   }, [images]);

//   return (
//     <ImageWrapper>
//       {heading && (
//         <div>
//           <SectionHeading>{heading}</SectionHeading>
//         </div>
//       )}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "20px",
//         }}
//       >
//         {/* Display images dynamically */}
//         <img
//           src={images[currentImage]}
//           alt={heading || "Dynamic Section"}
//         />
//         {images.length > 1 && (
//           <img
//             src={images[(currentImage + 1) % images.length]} // Next image
//             alt={heading || "Dynamic Section"}
//           />
//         )}
//       </div>
//     </ImageWrapper>
//   );
// };

