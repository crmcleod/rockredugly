export const ReadOnButton = ({setArticleOpenID, id}) => {
    return(
        <button className='alt-font letter-space-1' onClick={(e) => {
            setArticleOpenID(id)
            const parent = e.target.parentNode.parentNode
            if (parent) {
              console.log('scroll parent block')
              document.querySelector('.regular-article' + id)
              .scrollIntoView({ behavior: 'instant', block: 'start' }, 100)            }
          }}>
            Read on
          </button>
    )
}