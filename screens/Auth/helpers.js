import { translate } from "../../helpers";

const handleBtnClick =
  (
    username,
    password,
    setUsernameError,
    setPasswordError,
    signIn,
    translation,
    curLang
  ) =>
  () => {
    const isUsernameValid = validateUserName(
      username,
      setUsernameError,
      translation,
      curLang
    );
    const isPasswordValid = validatePassword(
      password,
      setPasswordError,
      translation,
      curLang
    );

    if (isUsernameValid && isPasswordValid) {
      signIn({ login: username, password });
    }
  };

const validateUserName = (value, setUsernameError, translation, curLang) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (reg.test(value) === false) {
    setUsernameError(translate(translation, curLang, "invalidEmail"));

    return false;
  }

  setUsernameError("");

  return true;
};

const validatePassword = (value, setPasswordError, translation, curLang) => {
  if (!value) {
    setPasswordError(translate(translation, curLang, "invalidPassword"));

    return false;
  }

  setPasswordError("");

  return true;
};

export { handleBtnClick, validateUserName, validatePassword };
