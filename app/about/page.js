import React from 'react'


export default function About() {
    return (

        <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4">About Penguin Motors</h1>
            <p className="text-gray-700 leading-relaxed">
                Welcome to Penguin Motors, your trusted source for high-quality vehicles. With years of experience in the automotive industry, we are dedicated to providing our customers with the finest selection of cars.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
                Our mission is to make your car buying experience as enjoyable as possible. We offer a wide range of vehicles, from compact cars to luxury models, and our team is committed to helping you find the perfect vehicle to meet your needs.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
                At Penguin Motors, we take pride in our exceptional customer service, and we are here to assist you every step of the way. Whether you're looking for a new or used car, we've got you covered.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
                PS: This website should not be taken seriously, it is just a student project used to train ourselves creating websites.
            </p>

            <div class="flex items-center justify-center">
                <img src="about-car.png" alt="Penguin Motors Image" class="mt-8 h-48 w-48 rounded-lg"></img>
            </div>
        </div>


    )
}