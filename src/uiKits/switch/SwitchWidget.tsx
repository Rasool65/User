import React, { useState, FC } from 'react';
import { Switch } from './Switch';
import { ToggleBtn, Circle } from './style';

const SwitchWidget: FC<Switch.IProps> = ({ onChageStatus, userInfo }) => {
  const [toggle, setToggle] = useState(userInfo.userStatus);

  const toggleBtn = () => {
    setToggle(!toggle);
    onChageStatus!(userInfo);
  };

  return (
    <ToggleBtn onClick={toggleBtn} status={toggle}>
      <Circle status={toggle} />
    </ToggleBtn>
  );
};

export default SwitchWidget;
