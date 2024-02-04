export const ExternalLinksContainer = ({ article }) => {
    return (
        <div className='external-links-wrapper'>
            {article?.fields?.links?.map((link, i) => {
                return <a key={i+new Date().getTime()} className='external-links' href={link}>{link}</a>
            })}
        </div>
    )
}