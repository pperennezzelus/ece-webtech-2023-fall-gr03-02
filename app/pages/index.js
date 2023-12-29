import React, { useEffect, useContext, useState } from "react";
import { DarkModeContext } from '../components/DarkModeContext';
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);
  const maxPokeId = 721;
  const featuredArticleID = [21, 23, 26, 27, 16];
  const [articles, setArticles] = useState([]);



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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles') // Replace 'your_articles_table' with your actual table name
          .select()
          .in('id', featuredArticleID); // Fetch articles with the specified IDs

        if (error) {
          throw error;
        }

        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={`flex min-h-screen bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-white to-slate-400'}`}>
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

      
      <p className={`absolute top-80 left-40 font-mono font-extrabold text-3xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Featured Articles 
        </p>
      <div className="flex flex-wrap mx-32 my-96">
        
        {articles.map((article) => (
          <div
            key={article.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 "
          >
            <a href={`/articles/${article.id}`}>
              <article className="group duration-200 relative text-left cursor-pointer transform transition-transform ease-in-out hover:scale-110 shadow-xl shadow-transparent hover:shadow-white/10">
                <div
                  style={{
                    position: "relative",
                    height: "180px", // Adjust this height as needed
                    width: "100%",   // Ensure the width is set to 100%
                  }}
                >
                  <img
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-xl "
                    src={
                      article.image_urls && article.image_urls.length > 0
                        ? article.image_urls[0]
                        : isDarkMode
                          ? "logo1.png" // default image for dark mode
                          : "logo1black.png" // default image for light mode
                    }
                    style={{ color: "transparent", display: "block" }}
                  />

                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"></div>
                </div>
                <h2 className="text-white truncate text-2xl absolute bottom-0 left-0 right-0 p-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {article.title}
                </h2>
              </article>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
