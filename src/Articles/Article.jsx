export const Article = ({children, articleOpenID, i, article }) => {
    return (
        <article id='regular-article' className={`regular-article${article.sys.id} article ${articleOpenID === article.sys.id ? 'open' : 'closed'} ${article?.metadata.tags.some(z => z.sys.id === 'featured') ? '' : 'other-articles'}`}>
            {children}
        </article>
    )
}