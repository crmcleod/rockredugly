import { useEffect, useState } from 'react';
import './App.css';
import github from './github-mark.png'
import ln from './In-Blue-128.png'
import cio from './cragglio.png'
import axios from 'axios'
const parser = new DOMParser()


function App() {

  useEffect(() => {

    axios.get(`https://cdn.contentful.com/spaces/${process.env.REACT_APP_space_id}/environments/master/entries?access_token=${process.env.REACT_APP_access_token}`)
      .then(x => setArticles(x.data))

  }, [])

  const [read, setRead] = useState(null)
  const [articles, setArticles] = useState(null)
  return (
    <div className="App">
      <header>
        <h1 className='alt-font'>RockRedUgly Blog</h1>
        <div id='socials'>
          <a href='https://github.com/crmcleod'>
            <img src={github} alt="github logo" />
          </a>
          <a href='https://www.linkedin.com/in/craig-r-mcleod/'>
            <img src={ln} alt="linkedin logo" />
          </a>
          <a href='https://craggl.io'>
            <img src={cio} alt="craggl.io logo" />
          </a>
        </div>
      </header>
      <main>
        <section>
        {read !== null && <div id='fold-article-button' onClick={() => {setRead(null)}}>ⓧ</div>}
        {articles && articles?.items?.sort((a, b) => new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime()).map((x, i) => {
            return (

              <article id='most-recent' className={`article ${read === i ? 'open' : 'closed'} ${x?.metadata.tags.some(z => z.sys.id === 'featured') ? '' : 'other-articles'}`}>
                <div className='article-image-wrapper'>
                  <img alt="" className='article-image' src={`https:${articles.includes.Asset.find(y => y.sys.id === x.fields.image.sys.id).fields.file.url}`} />
                </div>
                <div className='text-blocks'>
                  <h2 className='alt-font'>
                    {x?.fields?.articleHeader}
                  </h2>
                  <p className='published-date'>
                    <b>Published</b> {new Date(x?.fields?.publishedDate).toLocaleDateString()}
                  </p>
                  {read === i ?
                    <>
                      {[...parser.parseFromString(x?.fields?.fullArticle, 'text/html').body.children].map(x => {
                        return <p>
                          {x.textContent}
                        </p>
                      })}
                      {
                        <div className='external-links-wrapper'>
                          {x?.fields?.links?.map(x => {
                            return <a className='external-links' href={x}>{x}</a>
                          })}
                        </div>
                      }
                    </>
                    :
                    <>
                      <p><i>
                        {x?.fields?.blurb}
                      </i>
                      </p>
                      <button className='alt-font letter-space-1' onClick={(e) => {
                        setRead(i)
                        const parent = e.target.parentNode.parentNode
                        if(parent) {
                          setTimeout(() => parent.scrollIntoView({behavior: 'instant', block: 'start'}), 50)
                        }
                        }}>
                        Read on
                      </button>
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
