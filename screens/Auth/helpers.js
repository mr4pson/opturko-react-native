const handleBtnClick =
  (username, password, setUsernameError, setPasswordError, signIn) => () => {
    const isUsernameValid = validateUserName(username, setUsernameError);
    const isPasswordValid = validatePassword(password, setPasswordError);

    if (isUsernameValid && isPasswordValid) {
      signIn({ username, password });
    }
  };

const validateUserName = (value, setUsernameError) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (reg.test(value) === false) {
    setUsernameError("Неверный Email");

    return false;
  }

  setUsernameError("");

  return true;
};

const validatePassword = (value, setPasswordError) => {
  if (!value) {
    setPasswordError("Введите пароль");

    return false;
  }

  setPasswordError("");

  return true;
};

export { handleBtnClick, validateUserName, validatePassword };
