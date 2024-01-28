export const SocialLinks = ({ariaLabel, href, imgSrc, altText}) => {
    return(
        <a aria-label={ariaLabel} href={href}>
        <img src={imgSrc} alt={altText} />
      </a>
    )
}