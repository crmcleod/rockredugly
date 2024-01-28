import React from 'react';

const FoldArticleButton = ({ articleOpenIndex, setArticleOpenIndex }) => {
  return (
    articleOpenIndex !== null && (
      <div id='fold-article-button' onClick={() => setArticleOpenIndex(null)}>
        ⓧ
      </div>
    )
  );
};

export default FoldArticleButton;
