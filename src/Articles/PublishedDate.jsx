export const PublishedDate = ({ article }) => {
    return (
        <p className='published-date'>
            <b>Published</b> {new Date(article?.fields?.publishedDate).toLocaleDateString()}
        </p>
    )
}