import React from "react";
import Image from "next/image"; // Import Image component

export default function About() {
  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
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
          src="/about-car.png"
          alt="Penguin Motors Image"
          width={192}
          height={192}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
