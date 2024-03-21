import React, { useState, useEffect } from 'react';

const FlashSaleTimer = () => {
  const calculateTimeLeft = () => {
    const difference = new Date("2024-04-01T00:00:00Z") - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]); // Include timeLeft in the dependency array to ensure useEffect runs on timeLeft changes

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const { hours, minutes, seconds } = timeLeft; // Destructure hours, minutes, and seconds from timeLeft

  return (
    <div className="flex items-center">
      <div className="ml-5">
        <div className="text-sm font-medium text-[#f85606]">
          On Sale Now
        </div>
      </div>
      <div className="flex items-center ml-[65px]">
        <div className="text-sm text-[#202020] mr-[10px]">
          Ending in
        </div>
        <div className="text-base text-white w-10 h-[35px] leading-[35px] text-center font-medium bg-[#ff6801] rounded-[2px] my-3 mx-[6px]">
          {addLeadingZero(hours)}
        </div>
        <div className="text-[#ff6801]">:</div> {/* Removed extra space */}
        <div className="text-base text-white w-10 h-[35px] leading-[35px] text-center font-medium bg-[#ff6801] rounded-[2px] my-3 mx-[6px]">
          {addLeadingZero(minutes)}
        </div>
        <div className="text-[#ff6801]">:</div> {/* Removed extra space */}
        <div className="text-base text-white w-10 h-[35px] leading-[35px] text-center font-medium bg-[#ff6801] rounded-[2px] my-3 mx-[6px]">
          {addLeadingZero(seconds)}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleTimer;
