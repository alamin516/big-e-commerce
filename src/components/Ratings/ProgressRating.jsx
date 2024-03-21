const RatingProgressBar = () => {
  const ratings = [15, 20, 30, 25, 10];
  const totalRatings = ratings.reduce((acc, curr) => acc + curr, 0);

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const ratingCount = ratings[index] || 0;
    const percentage = (ratingCount / totalRatings) * 100;

    return (
      <div key={index} className="flex items-center gap-2 mb-2">
        <div className="flex items-center w-[80px]">
          {[...Array(index + 1)].map((_, i) => (
            // <FaStar key={i} className="text-[#FFC700]" />
            <img
              key={i}
              className="w-4"
              src="https://laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
              alt=""
            />
          ))}
          {[...Array(5 - index - 1)].map((_, i) => (
            // <AiOutlineStar key={i} className="text-[#FFC700]" />
            <img
              key={i}
              className="w-4"
              src="https://laz-img-cdn.alicdn.com/tfs/TB18ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
              alt=""
            />
          ))}
        </div>
        <div className="w-[120px] bg-gray-200 rounded-full ">
          <div
            className={`h-[6px] bg-[#FFC700] rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="ml-2 text-[12px]">{ratingCount}</span>
      </div>
    );
  });

  return <div>{ratingStar.reverse()}</div>;
};

export default RatingProgressBar;


// const RatingProgressBar = () => {
//   const ratings = [0, 0, 0, 4, 57];
//   const totalRatings = ratings.reduce((acc, curr) => acc + curr, 0);

//   const ratingStar = Array.from({ length: 5 }, (_, index) => {
//     const ratingCount = ratings[index] || 0;
//     const percentage = (ratingCount / totalRatings) * 100;

//     return (
//       <div key={index} className="flex items-center gap-2 mb-2">
//         <div>
//           {index + 1}
//         </div>
//         <div className="">
//           <img
//             className="w-4"
//             src="https://laz-img-cdn.alicdn.com/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
//             alt=""
//           />
//         </div>
//         <div className="w-6/12 bg-gray-200 rounded-full ">
//           <div
//             className={`h-[6px] bg-[#FFC700] rounded-full`}
//             style={{ width: `${percentage}%` }}
//           ></div>
//         </div>
//         <span className="ml-2">{ratingCount}</span>
//       </div>
//     );
//   });

//   return <div>{ratingStar.reverse()}</div>;
// };

// export default RatingProgressBar;
