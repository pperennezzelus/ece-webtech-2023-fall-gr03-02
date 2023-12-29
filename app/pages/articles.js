import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../utils/supabaseClient"
import { useUser } from "../components/UserContext"
import { DarkModeContext } from "../components/DarkModeContext"

const ArticlesPage = () => {
  const [articles, setArticles] = useState([])
  const [filterGame, setFilterGame] = useState("")
  const [filterRegion, setFilterRegion] = useState("")
  const [orderDescending, setOrderDescending] = useState(true)
  const { user, isLoggedIn } = useUser()
  const router = useRouter()
  const { isDarkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const fetchArticles = async () => {
      let query = supabase.from("articles").select("*")

      if (filterGame) {
        query = query.eq("game", filterGame)
      }

      if (filterRegion) {
        query = query.eq("region", filterRegion)
      }

      query = query.order("created_at", { ascending: !orderDescending })

      const { data, error } = await query

      if (error) {
        console.error("Error fetching articles:", error)
      } else {
        setArticles(data)
      }
    }

    fetchArticles()
  }, [filterGame, filterRegion, orderDescending])

  const handleOrderToggle = () => {
    setOrderDescending(!orderDescending)
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode
        ? "bg-gradient-to-b from-indigo-950 to-slate-950"
        : "bg-gradient-to-b from-white to-slate-400"
        }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Create Article Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <select
              onChange={(e) => setFilterGame(e.target.value)}
              className={`px-4 py-2 rounded-md ${isDarkMode ? "text-black" : "text-black"}`}
            >
              <option value="">Filter by Game</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Valorant">Valorant</option>
              <option value="Rocket League">Rocket League</option>
            </select>
            <select
              onChange={(e) => setFilterRegion(e.target.value)}
              className={`px-4 py-2 rounded-md ${isDarkMode ? "text-black" : "text-black"} w-44`}
            >
              <option value="">Filter by Region</option>
              <option value="China">China</option>
              <option value="Europe">Europe</option>
              <option value="Korea">Korea</option>
              <option value="North America">North America</option>
            </select>
            <button
              onClick={handleOrderToggle}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {orderDescending ? "Descending" : "Ascending"} Order
            </button>
          </div>

          {isLoggedIn && (
            <button
              onClick={() => router.push("/create-article")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Article
            </button>
          )}
        </div>

        {/* Articles List */}
        <div className="flex flex-wrap -mx-2">
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
                      height: "180px", 
                      width: "100%",  
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
    </div>
  )
}

export default ArticlesPage
