import React from 'react';
import SwitchButton from '../switch-button';

const Switch = () => {
  return (
    <div>
      <SwitchButton text="Самый дешевый" name="cheapest" orientation="left" />
      <SwitchButton text="Самый быстрый" name="fastest" orientation="right" />
    </div>
  );
};

export default Switch;
