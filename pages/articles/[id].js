// /pages/articles/[id].js

import articlesData from '../../data/articles.json';

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

export async function getStaticPaths() {
  const paths = articlesData.map((article) => ({
    params: { id: article.id.toString() }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const article = articlesData.find((a) => a.id === parseInt(params.id));

  return {
    props: { article }
  };
}
