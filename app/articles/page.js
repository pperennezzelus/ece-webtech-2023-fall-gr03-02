import React from 'react'

export default function Articles() {
  return (
   

    <div className="container mx-auto mt-8">
    <h2 className="text-3xl font-semibold mb-4">Featured Articles</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <li>
            <a href="/articles/1" className="block bg-white p-4 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 hover:underline">Electric Model</h3>
                <p className="text-gray-600 mt-2">Explore the latest advancements in electric vehicle technology.</p>
            </a>
        </li>
        <li>
            <a href="/articles/2" className="block bg-white p-4 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 hover:underline">SUV Model</h3>
                <p className="text-gray-600 mt-2">Discover the top-rated SUVs for family adventures.</p>
            </a>
        </li>
        <li>
            <a href="/articles/3" className="block bg-white p-4 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 hover:underline">Autonomous Model</h3>
                <p className="text-gray-600 mt-2">Autonomous driving and its impact on the automotive industry.</p>
            </a>
        </li>
    </ul>
</div>
  )
} 