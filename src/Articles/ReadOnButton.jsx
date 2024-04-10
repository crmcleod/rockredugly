export const ReadOnButton = ({ setArticleOpenID, id }) => {
  return (
    <button className='alt-font letter-space-1' onClick={(e) => {
      setArticleOpenID(id)
      const parent = e.target.parentNode.parentNode
      if (parent) {
        setTimeout(() => {
          document.querySelector('.regular-article' + id)
            .scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
    }
    }>
      Read on
    </button>
  )
}