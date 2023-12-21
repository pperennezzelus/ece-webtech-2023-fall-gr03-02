import React from "react";
import Image from "next/image"; // Import Image component

export default function About() {
  return (
    <div className="min-h-screen bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950">
    
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">About Pinguin Esport</h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">A dynamic online hub where the pulse of esports beats in harmony with the passionate voices of our diverse community.</p>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <h3 class="mb-2 text-xl font-bold dark:text-white">Our Vision</h3>
            <p class="text-gray-500 dark:text-gray-400">At Pinguin Esport, we envision a digital space that transcends traditional boundaries, fostering a global community where esports enthusiasts converge, collaborate, and celebrate the spirit of competitive gaming. </p>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-bold dark:text-white">Our mission</h3>
            <p class="text-gray-500 dark:text-gray-400">Our mission is to provide a welcoming platform for esports enthusiasts, gamers, and industry professionals alike. Pinguin Esport is more than just a forum; it is a virtual arena where ideas clash, insights flourish, and the love for esports thrives.</p>
          </div>
          <div>
            <h3 class="mb-2 text-xl font-bold dark:text-white">Our Commitment</h3>
            <p class="text-gray-500 dark:text-gray-400">Pinguin Esport is committed to fostering an environment where individuality is championed and every gamer feels seen and heard. We stand firm in our dedication to promoting positive gaming experiences, free from toxicity and discrimination. </p>
          </div>
*        </div>
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
    /*
    <div className="min-h-screen bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950">
    <div className="container absolute top-32 right-28  p-4 bg-black bg-opacity-30 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">About Pinguin Motors</h1>
      <p className="text-gray-700 leading-relaxed">
        Welcome to Penguin Motors, your trusted source for high-quality
        vehicles. With years of experience in the automotive industry, we are
        dedicated to providing our customers with the finest selection of cars.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        Our mission is to make your car buying experience as enjoyable as
        possible. We offer a wide range of vehicles, from compact cars to luxury
        models, and our team is committed to helping you find the perfect
        vehicle to meet your needs.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        At Penguin Motors, we take pride in our exceptional customer service,
        and we are here to assist you every step of the way. Whether you&apos;re
        looking for a new or used car, we&apos;ve got you covered.
      </p>
      <p className="text-gray-700 leading-relaxed mt-4">
        PS: This website should not be taken seriously, it&apos;s just a student
        project used to train ourselves creating websites.
      </p>

      <div className="flex items-center justify-center">
        <Image
          src="/pinguin_squad.png"
          alt="Penguin Motors Image"
          width={192}
          height={192}
          className="rounded-lg"
        />
      </div>
    </div>
    </div>*/
  );
}
