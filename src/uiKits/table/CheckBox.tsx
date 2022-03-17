import React from 'react';

const CheckBox = ({ type, handleClick, isChecked }) => {
  return <input type={type} onChange={handleClick} checked={isChecked} />;
};

export default CheckBox;
