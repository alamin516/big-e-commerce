import React from 'react';

const SizeButton = ({ size, isSelected, onClick }) => {
  return (
    <button
      className={`size-option ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      {size}
    </button>
  );
};

export default SizeButton;