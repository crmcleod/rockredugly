import React from 'react';

const FoldArticleButton = ({ articleOpenID, setArticleOpenID }) => {
  return (
    articleOpenID !== null && (
      <div id='fold-article-button' onClick={() => setArticleOpenID(null)}>
        ⓧ
      </div>
    )
  );
};

export default FoldArticleButton;
