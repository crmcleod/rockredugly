import React from 'react';

const FoldArticleButton = ({ articleOpenID,  closeArticleAndSnapBackToTop}) => {
  return (
    articleOpenID !== null && (
      <div id='fold-article-button' onClick={() => closeArticleAndSnapBackToTop(articleOpenID)}>
        ⓧ
      </div>
    )
  );
};

export default FoldArticleButton;
