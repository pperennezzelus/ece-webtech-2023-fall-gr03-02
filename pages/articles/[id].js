import articlesData from '../../data/articles.json';

// Your component
export default function Page({ article }) {
  return (
    <div className="container mx-auto mt-8">
      {article ? (
        <div>
          <h2 className="text-3xl font-semibold text-blue-600">{article.title}</h2>
          <p className="text-gray-600 mt-2">{article.content}</p>
          <p className="text-gray-500 mt-2">Date: {article.date}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold text-red-500">Article not found</h1>
        </div>
      )}
    </div>
  );
}

// Data fetching method
export async function getServerSideProps(context) {
  const id = context.params.id;
  const article = articlesData.find((article) => article.id === parseInt(id));

  if (!article) {
    return { notFound: true }; // This will show a 404 page if the article is not found
  }

  return {
    props: { article }
  };
}
