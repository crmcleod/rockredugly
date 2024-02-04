import { Article } from "./Article"
import { ArticleImage } from "./ArticleImage"
import { ArticleParagraphs } from "./ArticleParagraphs"
import { ArticleTextBlocks } from "./ArticleTextBlocks"
import { ExternalLinksContainer } from "./ExternalLinksContainer"
import { PublishedDate } from "./PublishedDate"
import { ReadOnButton } from "./ReadOnButton"

export const ArticleContainer = ({ articleOpenID, setArticleOpenID, i, article, articles }) => {
    return (
        <Article articleOpenID={articleOpenID} i={i} article={article} >
            <ArticleImage article={article} articles={articles} />
            <ArticleTextBlocks>
                <h2 className='alt-font'>
                    {article?.fields?.articleHeader}
                </h2>
                <PublishedDate article={article} />
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