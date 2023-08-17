import React from 'react';
import {ReactComponent as ShareIcon} from '../assets/utility/share.svg';

function ShareButton() {
  const shareContent = {
    title: 'Upsun Demo Project',
    text: 'Check out this demo project running on Upsun!',
    url: window.location.href,
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share(shareContent)
        .then(() => console.log('Content shared successfully!'))
        .catch((error) => console.log('Share failed:', error));
    } else {
      // If Web Share API is not supported, copy the URL to clipboard
      navigator.clipboard.writeText(shareContent.url)
        .then(() => {
          alert('URL copied to clipboard.');
        })
        .catch((err) => {
          console.error('Failed to copy URL:', err);
        });
    }
  };

  return (
    <button 
        onClick={handleShare}
        className="">
        <ShareIcon className="h-[51px] w-[92px]" />
  </button>
  );
}

export default ShareButton;
