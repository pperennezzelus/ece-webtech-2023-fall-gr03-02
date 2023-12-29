import React, { useContext } from "react"
import Image from "next/image"
import { DarkModeContext } from '../components/DarkModeContext' 

export default function About() {
  const { isDarkMode } = useContext(DarkModeContext)

  return (
    <div className={`min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-white to-slate-400'}`}>
    
      <div className={`py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">About Pinguin Esport</h2>
          <p className={`text-gray-500 sm:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>A dynamic online hub where the pulse of esports beats in harmony with the passionate voices of our diverse community.</p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <h3 className="mb-2 text-xl font-bold">Our Vision</h3>
            <p className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>At Pinguin Esport, we envision a digital space that transcends traditional boundaries, fostering a global community where esports enthusiasts converge, collaborate, and celebrate the spirit of competitive gaming. </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Our mission</h3>
            <p className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Our mission is to provide a welcoming platform for esports enthusiasts, gamers, and industry professionals alike. Pinguin Esport is more than just a forum; it is a virtual arena where ideas clash, insights flourish, and the love for esports thrives.</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Our Commitment</h3>
            <p className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pinguin Esport is committed to fostering an environment where individuality is championed and every gamer feels seen and heard. We stand firm in our dedication to promoting positive gaming experiences, free from toxicity and discrimination. </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
         src="/pinguin_squad.png"
         alt="Penguin Motors Image"
         width={250}
         height={250}
         className="rounded-lg"
        />
      </div>
    </div>
  );
}
