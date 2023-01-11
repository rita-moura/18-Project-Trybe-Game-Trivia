const validateDisabledButton = (state) => {
  const { name, email } = state;
  const verifyName = name.length > 0;
  const verifyEmail = email.length > 0;
  return verifyEmail && verifyName;
};

export default validateDisabledButton;
