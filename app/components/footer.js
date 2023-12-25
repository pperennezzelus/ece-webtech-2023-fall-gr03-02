import React, { useContext } from "react";
import { DarkModeContext } from '../components/DarkModeContext';

const Footer = () => {
  const {isDarkMode} = useContext(DarkModeContext); 

  return (
    <footer className={`shadow-md py-2 text-center fixed bottom-0 w-full ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-gray-800'}`}>
      <div className="container mx-auto">
        <p>&copy; 2023 Pinguin Motors. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;