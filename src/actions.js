const switchBtnPressed = (name) => {
  return {
    type: 'SWITCH_BTN_PRESSED',
    name,
  };
};

const actions = {
  switchBtnPressed,
};

export default actions;
