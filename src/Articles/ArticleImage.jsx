import { useEffect, useState } from "react"

export const ArticleImage = ({ article, articles, placeHolderImg }) => {

    const [imgLoaded, setImgLoaded] = useState(false)

    let imgSrc = `https:${articles.includes.Asset.find(y => y.sys.id === article.fields.image.sys.id).fields.file.url}`

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImgLoaded(true);
        };
        img.src = imgSrc;
    }, [imgSrc]);

    return (
        <div className='article-image-wrapper'>
            {!imgLoaded && <img alt="" className='article-image' src={placeHolderImg} />}
            <img
            alt=""
                src={imgSrc}
                style={{ display: imgLoaded ? 'block' : 'none' }}
            />
        </div>
    )
}