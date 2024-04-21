import { Article } from "./Article"
import { ArticleImage } from "./ArticleImage"
import { ArticleParagraphs } from "./ArticleParagraphs"
import { ArticleTextBlocks } from "./ArticleTextBlocks"
import { ExternalLinksContainer } from "./ExternalLinksContainer"
import { PublishedDate } from "./PublishedDate"
import { ReadOnButton } from "./ReadOnButton"
import share from '../Assets/share.png'

export const ArticleContainer = ({ articleOpenID, setArticleOpenID, i, article, articles, setNotification, setFade, placeHolderImg }) => {

    const handleReadOnClick = () => {
        setFade(false)
        setNotification(true)
        navigator.clipboard.writeText(`https://rockredugly.com?article=${article.sys.id}`)
    }
    
    return (
        <Article articleOpenID={articleOpenID} i={i} article={article} >
            <ArticleImage article={article} articles={articles} placeHolderImg={placeHolderImg}/>
            <ArticleTextBlocks>
                <h2 className='alt-font'>
                    {article?.fields?.articleHeader}
                </h2>
                <div style={{display: 'grid', gridTemplateColumns: '15fr 1fr'}}>
                    <PublishedDate article={article} />
                {
                    articleOpenID === article.sys.id && 
                    <img onClick={handleReadOnClick} loading='lazy' className={`share-icon`} src={share} alt="share article button"/>
                }
                </div>
                {articleOpenID === article.sys.id ?
                    <>
                        <ArticleParagraphs article={article} />
                        <ExternalLinksContainer article={article} />
                    </>
                    :
                    <>
                        <p><i> {article?.fields?.blurb} </i></p>
                        <ReadOnButton setArticleOpenID={setArticleOpenID} id={article.sys.id} />
                    </>
                }
            </ArticleTextBlocks>
        </Article>
    )
}