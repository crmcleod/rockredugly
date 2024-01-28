import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios'
import { LandingContainer } from './Landing/LandingContainer';
import FoldArticleButton from './Articles/FoldArticleButton';
import { ArticleContainer } from './Articles/ArticleContainer';


function App() {

  useEffect(() => {
    axios.get(`https://cdn.contentful.com/spaces/${process.env.REACT_APP_space_id}/environments/master/entries?access_token=${process.env.REACT_APP_access_token}`)
      .then(x => setArticles(x.data))
  }, [])

  const [articleOpenIndex, setArticleOpenIndex] = useState(null)
  const [articles, setArticles] = useState(null)

  return (
    <div className="App">
      <LandingContainer />
      <main>
        <section>
          <FoldArticleButton articleOpenIndex={articleOpenIndex} setArticleOpenIndex={setArticleOpenIndex} />
          {articles && articles?.items?.sort((a, b) => new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime()).map((article, i) => {
            return (
              <ArticleContainer
                articleOpenIndex={articleOpenIndex}
                setArticleOpenIndex={setArticleOpenIndex}
                i={i}
                article={article}
                articles={articles}
              />
            )
          })}
        </section>
      </main >
    </div >
  );
}

export default App;
