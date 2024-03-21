const StarRating = ({ stars = 0, size }) => {
  const fullStars = Math.floor(stars); // Get the integer part of stars
  const hasHalfStar = stars % 1 >= 0.5; // Check if there's a half star
  
  const ratingStar = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) {
      return (
        <img
          key={i}
          className={`w-[${size}] h-[${size}]`}
          src="https://laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
          alt=""
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      return (
        <img
          key={i}
          className={`w-[${size}] h-[${size}]`}
          src="https://laz-img-cdn.alicdn.com/tfs/TB16gwRdOqAXuNjy1XdXXaYcVXa-64-64.png"
          alt=""
        />
      );
    } else {
      return (
        <img
          key={i}
          className={`w-[${size}] h-[${size}]`}
          src="https://laz-img-cdn.alicdn.com/tfs/TB1Nx3Lz3mTBuNjy1XbXXaMrVXa-30-30.png"
          alt=""
        />
      );
    }
  });

  return <div className="flex items-center">{ratingStar}</div>;
};

export default StarRating;
