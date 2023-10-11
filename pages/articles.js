import React from 'react'
import Link from 'next/link'
import Header from 'database/header'

export default function Articles() {
    return (
      <div> 
        <Header></Header>
      <h1> Articles </h1>
      
      <ul>
                <li> <Link href="/articles/1">Article 1</Link></li>
                <li> <Link href="/articles/2">Article 2</Link></li>
                <li> <Link href="/articles/3">Article 3</Link></li>
            </ul>

      </div>
    )
  }
