import Link from 'next/link'
import React from 'react'



export default function Contact() {
    return (

    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">Contact</h1>
      <p className="text-lg text-gray-600">You can contact us on LinkedIn :</p>
      <ul className="mt-2">
            <li className="mb-2">
                <Link href="https://www.linkedin.com/in/paul-perennez-zelus-103b9a220" className="text-blue-600 hover:underline">Paul PERENNEZ-ZELUS</Link>
            </li>
            <li className="mb-2">
                <Link href="https://www.linkedin.com/in/hugo-benedit-228911256" className="text-blue-600 hover:underline">Hugo BENEDIT</Link>
            </li>
            <li className="mb-2">
                <Link href="https://www.linkedin.com/in/sebtrnn" className="text-blue-600 hover:underline">Sébastien TRAN</Link>
            </li>
        </ul>
    </div>
    )
}