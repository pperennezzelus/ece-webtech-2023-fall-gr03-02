import { useRouter } from 'next/router'
import articlesData from '../../database/articles.json'
import Header from 'Header/header.js'

const DynamicArticle = () => {
  const router = useRouter()
  const { id } = router.query

  const article = articlesData.find((article) => article.id === parseInt(id));

  if (article) {
    return (
      <div>
        <Header></Header>
         <ul>
        
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}  </p>
            <p>date : {article.date}  </p>
          </li>
        
      </ul>
        
      </div>
    )
  }
  return (
    <div>
      <Header></Header>
      <h1>Articles not found</h1>
    </div>
  )
}

export default DynamicArticle
