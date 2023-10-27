import articlesData from '../../data/articles.json';

export default function Articles({ articles }) {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">Featured Articles</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <li key={article.id}>
            <a
              href={`/articles/${article.id}`}
              className="block bg-white p-4 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-md hover:bg-gray-100"
            >
              <h3 className="text-xl font-semibold">
                {article.title}
              </h3>
              <p className="text-gray-600 mt-2">{article.content}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { articles: articlesData }
  };
}
