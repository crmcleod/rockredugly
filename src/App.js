import { useEffect, useState } from 'react';
import './App.css';

import axios from 'axios'
import { LandingContainer } from './Landing/LandingContainer';
import FoldArticleButton from './Articles/FoldArticleButton';
import { ExternalLinksContainer } from './Articles/ExternalLinksContainer';
import { ReadOnButton } from './Articles/ReadOnButton';
const parser = new DOMParser()


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

              <article id='regular-article' className={`article ${articleOpenIndex === i ? 'open' : 'closed'} ${article?.metadata.tags.some(z => z.sys.id === 'featured') ? '' : 'other-articles'}`}>
                <div className='article-image-wrapper'>
                  <img alt="" className='article-image' src={`https:${articles.includes.Asset.find(y => y.sys.id === article.fields.image.sys.id).fields.file.url}`} />
                </div>
                <div className='text-blocks'>
                  <h2 className='alt-font'>
                    {article?.fields?.articleHeader}
                  </h2>
                  <p className='published-date'>
                    <b>Published</b> {new Date(article?.fields?.publishedDate).toLocaleDateString()}
                  </p>
                  {articleOpenIndex === i ?
                    <>
                      {[...parser.parseFromString(article?.fields?.fullArticle, 'text/html').body.children].map(x => {
                        return <p>
                          {x.textContent}
                        </p>
                      })}
                      {<ExternalLinksContainer article={article} />}
                    </>
                    :
                    <>
                      <p>
                        <i> {article?.fields?.blurb} </i>
                      </p>
                      <ReadOnButton setArticleOpenIndex={setArticleOpenIndex} i={i} />
                    </>
                  }
                </div>
              </article>
            )
          })}

        </section>
      </main >
    </div >
  );
}

export default App;
