import { Article } from "./Article"
import { ArticleImage } from "./ArticleImage"
import { ArticleParagraphs } from "./ArticleParagraphs"
import { ArticleTextBlocks } from "./ArticleTextBlocks"
import { ExternalLinksContainer } from "./ExternalLinksContainer"
import { PublishedDate } from "./PublishedDate"
import { ReadOnButton } from "./ReadOnButton"

export const ArticleContainer = ({ articleOpenIndex, setArticleOpenIndex, i, article, articles }) => {
    return (
        <Article articleOpenIndex={articleOpenIndex} i={i} article={article} >
            <ArticleImage article={article} articles={articles} />
            <ArticleTextBlocks>
                <h2 className='alt-font'>
                    {article?.fields?.articleHeader}
                </h2>
                <PublishedDate article={article} />
                {articleOpenIndex === i ?
                    <>
                        <ArticleParagraphs article={article} />
                        <ExternalLinksContainer article={article} />
                    </>
                    :
                    <>
                        <p><i> {article?.fields?.blurb} </i></p>
                        <ReadOnButton setArticleOpenIndex={setArticleOpenIndex} i={i} />
                    </>
                }
            </ArticleTextBlocks>
        </Article>
    )
}