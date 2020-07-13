const switchBtnPressed = (name) => {
  return {
    type: 'SWITCH_BTN_PRESSED',
    name,
  };
};

const transfersCheckboxChecked = (name) => {
  return {
    type: 'TRANSFERS_CHECKBOX_CHECKED',
    name,
  };
};

const actions = {
  switchBtnPressed,
  transfersCheckboxChecked,
};

export default actions;
