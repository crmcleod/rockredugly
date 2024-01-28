export const ExternalLinksContainer = ({ article }) => {
    return (
        <div className='external-links-wrapper'>
            {article?.fields?.links?.map(link => {
                return <a className='external-links' href={link}>{link}</a>
            })}
        </div>
    )
}