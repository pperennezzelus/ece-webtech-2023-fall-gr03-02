import React, { useEffect, useContext, useState } from "react";
import { DarkModeContext } from '../components/DarkModeContext';
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);
  const maxPokeId = 721;

  useEffect(() => {
    const randPokeID = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const fecthPoke = async (id) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const data = await response.json();

        const pokeName = data.names[4].name;

        const response2 = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data2 = await response2.json();

        const pokeUrl = data2.sprites.other.dream_world.front_default;

        if (pokeName && pokeUrl) {
          setPokemonData((pokeData) => [...pokeData, { pokeName, pokeUrl }]);
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    setPokemonData([]);
    fecthPoke(randPokeID(1, maxPokeId));
  }, []);

  return (
    <div className={`min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-white'}`}>
    <div className={`absolute top-16 right-32 font-mono font-extrabold text-8xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <p>PINGUIN ESPORT</p>
    </div>
    <div>
      <p className={`absolute top-40 right-32 font-mono font-extrabold text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Empower Your Voice, Elevate Your Game
      </p>
      <p className={`absolute top-48 right-32 font-mono font-extrabold text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Where Passionate Minds Unite to Share the Essence of Esports
      </p>
    </div>
  </div>

    /*
    <div className="bg-transparent">
        <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-semibold text-center">
        Welcome to Pinguin Motors
      </h1>
      <p className="text-lg text-gray-600 text-center mt-4">
        This is the website of group 2 in ING4 Gr3 <br></br> You can find us in
        the{" "}
        <Link href="/contact">
          <strong>contact</strong>
        </Link>{" "}
        page!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Link
          href="/articles"
          className="bg-white p-4 rounded-lg shadow-lg block hover:bg-gray-100 transition duration-300"
        >
          <h2 className="text-xl font-semibold">Explore Our Inventory</h2>
          <p className="mt-4">
            Discover a wide range of vehicles, from compact cars to luxury
            models.
          </p>
        </Link>

        <Link
          href="/contact"
          className="bg-white p-4 rounded-lg shadow-lg block hover:bg-gray-100 transition duration-300"
        >
          <h2 className="text-xl font-semibold">Discover Us</h2>
          <p className="mt-4">
            Meet the passionate and creative minds behind Penguin Motors,
            dedicated to redefining your car-buying experience.
          </p>
        </Link>

        <Link
          href="/about"
          className="bg-white p-4 rounded-lg shadow-lg block hover:bg-gray-100 transition duration-300"
        >
          <h2 className="text-xl font-semibold">Learn More</h2>
          <p className="mt-4">
            Curious to know more about the vision and values that drive Penguin
            Motors? Learn about us and our journey.
          </p>
        </Link>
      </div>
      <div className="container mx-auto mt-10">
        <div id="vitrina">
          {pokemonData.map(({ pokeName, pokeUrl }, index) => (
            <div key={index} className="tarjeta">
              <h1 className="text-xl font-bold mb-6">Your random pokemon is {pokeName}</h1>
              <img src={pokeUrl} alt={pokeName} style={{ height: '150px', width: '150px' }} />
            </div>
          ))}
        </div>

      </div>
    </div>
    </div>
    */
  );
};
export default Home;
