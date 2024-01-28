export const ReadOnButton = ({setArticleOpenIndex, i}) => {
    return(
        <button className='alt-font letter-space-1' onClick={(e) => {
            setArticleOpenIndex(i)
            const parent = e.target.parentNode.parentNode
            if (parent) {
              setTimeout(() => parent.scrollIntoView({ behavior: 'instant', block: 'start' }), 50)
            }
          }}>
            Read on
          </button>
    )
}