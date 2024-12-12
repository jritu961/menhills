import { Dashboard,SectionFive,SectionFour,SectionOne,SectionSeven,SectionThree,SectionTwo ,SectionSix} from "../styles/dashboard";
import React, { useState, useEffect } from "react";
import men from "../assets/men.jpg"; // Add your men's wear images here
import sitingmen from "../assets/sitingmen.jpg";
import watch from "../assets/watch.jpg";
import menpose from "../assets/menpose.jpg"
import mensiting from "../assets/mensiting.jpg"
import sidemen from "../assets/sidemen.jpg"
export const DashboardSections = () => {
  const images = [sidemen,mensiting,menpose , men, watch]; // Add more images here
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Dashboard>
      <SectionOne>
        <img src={images[currentImage]} alt="Men's Wear" />
      </SectionOne>
      <SectionTwo>{/* Add content here */}</SectionTwo>
      <SectionThree>{/* Add content here */}</SectionThree>
      <SectionFour>{/* Add content here */}</SectionFour>
      <SectionFive>{/* Add content here */}</SectionFive>
      <SectionSix>{/* Add content here */}</SectionSix>
      <SectionSeven>{/* Add content here */}</SectionSeven>
    </Dashboard>
  );
};
