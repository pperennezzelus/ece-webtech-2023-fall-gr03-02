import React from 'react'
import Header from 'database/header'
import Link from 'next/link'


export default function Contact() {
    return (
        <div>
            <Header></Header>
            <h1> Contact </h1>
            <p>  You can contact us on LinkedIn : </p>
            <ul>
                <li> <Link href="https://www.linkedin.com/in/paul-perennez-zelus-103b9a220/">Paul PERENNEZ-ZELUS</Link></li>
                <li> <Link href="https://www.linkedin.com/in/hugo-benedit-228911256/">Hugo BENEDIT</Link></li>
                <li> <Link href="https://www.linkedin.com/in/sebtrnn/">Sébastien TRAN</Link></li>    
            </ul>
        </div>
    )
}
