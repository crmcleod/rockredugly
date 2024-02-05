import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios'
import { LandingContainer } from './Landing/LandingContainer';
import FoldArticleButton from './Articles/FoldArticleButton';
import { ArticleContainer } from './Articles/ArticleContainer';


function App() {
  const [articleOpenID, setArticleOpenID] = useState(null)
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    axios.post(`https://discord.com/api/webhooks/${process.env.REACT_APP_channel_id}/${process.env.REACT_APP_channel_key}`, {"content": `${new Date()}`})
    axios.get(`https://cdn.contentful.com/spaces/${process.env.REACT_APP_space_id}/environments/master/entries?access_token=${process.env.REACT_APP_access_token}&metadata.tags.sys.id[all]=${process.env.REACT_APP_content_tag}`)
      .then(x => {
        const incomingArticles = x.data
        const currentUrl = window.location.href.split('article=').pop()

        if (currentUrl) {
          incomingArticles.items.sort((a, b) => new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime()).forEach((curr) => {
            if (curr.sys.id === currentUrl) {
              setArticleOpenID(curr.sys.id)
              scrollLinkedArticleIntoView(curr)
            }
          })
        }
        setArticles(incomingArticles)
      })
  }, [])

  const scrollLinkedArticleIntoView = (article) => {
    setTimeout(() => {
      document.querySelector('.regular-article' + article.sys.id)
        .scrollIntoView({ behavior: 'instant', block: 'start' }, 100)
    })
  }



  return (
    <div className="App">
      <LandingContainer />
      <main>
        <section>
          <FoldArticleButton articleOpenID={articleOpenID} setArticleOpenID={setArticleOpenID} />
          {articles && articles?.items?.sort((a, b) => new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime()).map((article, i) => {
            return (
              <ArticleContainer
                key={article.sys.id + articleOpenID}
                articleOpenID={articleOpenID}
                setArticleOpenID={setArticleOpenID}
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
