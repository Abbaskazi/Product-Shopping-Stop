// StarRating.js

import React from 'react';

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Unicode character for a solid star
    }
    if (hasHalfStar) {
      stars.push(<span key={fullStars + 1}>&#9734;</span>); // Unicode character for an outlined star
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
