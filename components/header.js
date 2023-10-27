import React from 'react'
import '../app/styles/global.css'

const Header = () => {
    return (

        <header>
            <nav className="bg-indigo-400 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center text-2xl text-white font-semibold">
                        <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
                        Pinguin Motors
                    </a>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="text-white hover:text-gray-300 transition duration-300">Home</a>
                        </li>
                        <li>
                            <a href="/articles" className="text-white hover:text-gray-300 transition duration-300">Articles</a>
                        </li>
                        <li>
                            <a href="/contact" className="text-white hover:text-gray-300 transition duration-300">Contact</a>
                        </li>
                        <li>
                            <a href="/about" className="text-white hover:text-gray-300 transition duration-300">About</a>
                        </li>
                    </ul>
                </div>
            </nav>


        </header>
    )
}

export default Header;