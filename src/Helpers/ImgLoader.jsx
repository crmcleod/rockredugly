import { useEffect } from 'react';

const ImgLoader = ({ imageUrls }) => {
  useEffect(() => {
    const preloadImages = () => {
      imageUrls.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
      });
    };

    preloadImages();
  }, [imageUrls]);

  return null; // Since this component doesn't render anything, return null
};

export default ImgLoader;
