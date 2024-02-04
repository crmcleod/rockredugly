const parser = new DOMParser()

export const ArticleParagraphs = ({ article }) => {
    return (
        // using dom parser to pull p tags textContent from contentful
        [...parser.parseFromString(article?.fields?.fullArticle, 'text/html').body.children].map((x, i) => {
            return (
                <p key={i + new Date().getTime()}>
                    {x.textContent}
                </p>
            )
        })
    )
}