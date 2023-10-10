import React from 'react';
import Header from 'pages/header.js'

const About = () => {
  return (
    <div>
     <Header></Header>
      <main>
        <h1>About this website</h1>
        <p>Cette page contient des informations sur l'auteur de ce blog.</p>
        <p> Date of creation : 10/10/2023</p>
        <p> Written by : </p>
          <ul>
            <li>BENEDIT Hugo</li>
            <li>PERENNEZ-ZELUS Paul</li>
            <li>TRAN Sébastien</li>
          </ul>
        
      </main>
    </div>
  )
}

export default About;
