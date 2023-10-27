import React from 'react';
import RootLayout from '../app/layout';

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
    <h1 className="text-4xl font-semibold text-center">Welcome to Pinguin Motors</h1>
    <p className="text-lg text-gray-600 text-center mt-4">This is the website of group 2 in ING4 Gr3 <br></br> You can find us in the <a href='/contact'><strong>contact</strong></a> page!</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <a href="/articles" className="bg-white p-4 rounded-lg shadow-lg block hover:bg-gray-100 transition duration-300">
            <h2 className="text-xl font-semibold">Explore Our Inventory</h2>
            <p className="mt-4">Discover a wide range of vehicles, from compact cars to luxury models.</p>
        </a>

        <a href="/contact" className="bg-white p-4 rounded-lg shadow-lg block hover:bg-gray-100 transition duration-300">
            <h2 className="text-xl font-semibold">Discover Us</h2>
            <p className="mt-4">Meet the passionate and creative minds behind Penguin Motors, dedicated to redefining your car-buying experience.</p>
        </a>

        <a href="/about" className="bg-white p-4 rounded-lg shadow-lg block hover:bg-gray-100 transition duration-300">
            <h2 className="text-xl font-semibold">Learn More</h2>
            <p className="mt-4">Curious to know more about the vision and values that drive Penguin Motors? Learn about us and our journey.</p>
        </a>
      
    </div>
</div>

  )
}
export default Home;