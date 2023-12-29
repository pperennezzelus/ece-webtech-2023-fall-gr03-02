import React, { useContext, useState, useEffect } from "react"
import { DarkModeContext } from '../components/DarkModeContext'

export default function PokeApi() {
    const [pokemonData, setPokemonData] = useState([])
    const { isDarkMode } = useContext(DarkModeContext)
    const maxPokeId = 721

    useEffect(() => {
        const randPokeID = (min, max) =>
            Math.floor(Math.random() * (max - min + 1) + min)

        const fetchPoke = async (id) => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${id}`
                )
                const data = await response.json()
                const pokeName = data.names[4].name
                const response2 = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                )
                const data2 = await response2.json()
                const pokeUrl = data2.sprites.other.dream_world.front_default

                if (pokeName && pokeUrl) {
                    setPokemonData([{ pokeName, pokeUrl }])
                }
            } catch (error) {
                console.error("Error fetching Pokemon data:", error)
            }
        }

        setPokemonData([])
        fetchPoke(randPokeID(1, maxPokeId))
    }, [])

    return (
        <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-white to-slate-400'}`}>
            <div className="container mx-auto text-center">
                {pokemonData.map(({ pokeName, pokeUrl }, index) => (
                    <div key={index} className="tarjeta">
                        <h1 className="text-xl font-bold mb-6">Your Pokémon Of the Day is: {pokeName}</h1>
                        <img src={pokeUrl} alt={pokeName} style={{ height: '300px', width: '300px', margin: 'auto' }} />
                    </div>
                ))}
            </div>
        </div>
    )
}
