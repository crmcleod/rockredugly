export const ArticleImage = ({article, articles}) => {
    return(
        <div className='article-image-wrapper'>
        <img alt="" className='article-image' src={`https:${articles.includes.Asset.find(y => y.sys.id === article.fields.image.sys.id).fields.file.url}`} />
    </div>
    )
}