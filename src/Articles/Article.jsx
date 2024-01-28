export const Article = ({children, articleOpenIndex, i, article }) => {
    return (
        <article id='regular-article' className={`article ${articleOpenIndex === i ? 'open' : 'closed'} ${article?.metadata.tags.some(z => z.sys.id === 'featured') ? '' : 'other-articles'}`}>
            {children}
        </article>
    )
}