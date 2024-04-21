import { useCallback, useEffect, useState } from 'react';
import './App.css';
import waiting from './Assets/waiting.png'

import axios from 'axios'
import { LandingContainer } from './Landing/LandingContainer';
import FoldArticleButton from './Articles/FoldArticleButton';
import { ArticleContainer } from './Articles/ArticleContainer';
import { Notification } from './Notifications/Notification';
import ImgLoader from './Helpers/ImgLoader';


function App() {
  const [articleOpenID, setArticleOpenID] = useState(null)
  const [articles, setArticles] = useState(null)
  const [notification, setNotification] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setFade(true)
        setTimeout(() => {
          setNotification(false)
        }, 2000)
      }, 2000);
    }
  }, [notification])

  useEffect(() => {
    (!(process.env.NODE_ENV === 'development') && axios.post(`https://discord.com/api/webhooks/${process.env.REACT_APP_channel_id}/${process.env.REACT_APP_channel_key}`, { "content": `${new Date()}` }))
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
    console.log(window.navigator.userAgent)
  }, [])

  const scrollLinkedArticleIntoView = (article) => {
    setTimeout(() => {
      document.querySelector('.regular-article' + (article?.sys?.id ?? article))
        .scrollIntoView({ behavior: 'instant', block: 'start' }
          , 100)
    })
  }

  const closeArticleAndSnapBackToTop = (article) => {
    const element = document.querySelector('.regular-article' + article);
    if (element.getBoundingClientRect().bottom > 0) {
      scrollLinkedArticleIntoView(article)
    }
    setArticleOpenID(null)
  }

  const debounce = (func, delay) => {
    let timeoutId;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }


  const checkOpenArticles = useCallback(() => {
    const debouncedCheckOpenArticles = debounce(() => {
      if (articleOpenID) {
        const element = document.querySelector('.regular-article' + articleOpenID);
        if (element && element.getBoundingClientRect().bottom < 0) {
          setArticleOpenID(null);
          setTimeout(() => {
            const next = element.nextElementSibling;
            if (next) {
              next.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          }, 50);
        }
      }
    }, 300);

    debouncedCheckOpenArticles();
  }, [articleOpenID]);


  return (
    <div className="App" onScroll={checkOpenArticles}>
      <ImgLoader imageUrls={[waiting]} />
      {notification && <Notification fade={fade} />}
      <LandingContainer />
      <main>
        <section>
          <FoldArticleButton articleOpenID={articleOpenID} closeArticleAndSnapBackToTop={closeArticleAndSnapBackToTop} />
          {articles && articles?.items?.sort((a, b) => new Date(b.fields.publishedDate).getTime() - new Date(a.fields.publishedDate).getTime()).map((article, i) => {
            return (
              <ArticleContainer
                setNotification={setNotification}
                key={article.sys.id}
                articleOpenID={articleOpenID}
                setArticleOpenID={setArticleOpenID}
                i={i}
                article={article}
                articles={articles}
                setFade={setFade}
                placeHolderImg={waiting}
              />
            )
          })}
        </section>
      </main >
    </div >
  );
}

export default App;
