import React from 'react'

const Header = () => {
    const redirectToIndex = () => {
        window.location.href = "/"
      }
      const redirectToArticles = () => {
        window.location.href = "/articles"
      }
      const redirectToAbout = () => {
        window.location.href = "/about "
      }
      const redirectToContact = () => {
        window.location.href = "/contact "  
      }

  return (
    <header>
        <button onClick={redirectToIndex}> Accueil </button>
        <button onClick={redirectToArticles}> Articles </button>
        <button onClick={redirectToAbout}> About </button>
        <button onClick={redirectToContact}> Contact </button>
    </header>
  )
}

export default Header;