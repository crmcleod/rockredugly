export const ExternalLinksContainer = ({ article }) => {

    const articleFields = article?.fields

    return (
        <div className='external-links-wrapper'>
            {(articleFields?.linksV2 ?? articleFields?.links)?.map((link, i) => {
                return <a key={i + new Date().getTime()} className='external-links' href={link?.url ?? link}>{link?.summary ?? link}</a>
            })}
        </div>
    )
}