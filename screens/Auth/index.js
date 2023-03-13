import React, { useEffect } from "react";
import { Page, Button, LangSwitch } from "../../components";
import styled from "styled-components/native";
import { AuthContext } from "../../context";
import { handleBtnClick } from "./helpers";
import { translate } from "../../helpers/translation.helper";

const Auth = (props) => {
  const [curLang, setCurLang] = React.useState();
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const { languages, translation } = props.route.params;

  useEffect(() => {
    if (languages.length) {
      setCurLang(languages[0]);
    }
  }, [languages]);

  return (
    <Page>
      <AuthForm>
        <LangSwitch
          languages={languages}
          curLang={curLang}
          setCurLang={setCurLang}
        />
        <PageHeader>{translate(translation, curLang, "auth")}</PageHeader>
        <TextInput
          placeholder={translate(translation, curLang, "login")}
          value={username}
          onChangeText={setUsername}
          req
        />
        <InputError>{usernameError}</InputError>
        <TextInput
          placeholder={translate(translation, curLang, "password")}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <InputError>{passwordError}</InputError>
        <Button
          onPress={handleBtnClick(
            username,
            password,
            setUsernameError,
            setPasswordError,
            signIn,
            translation,
            curLang
          )}
        >
          {translate(translation, curLang, "signin")}
        </Button>
      </AuthForm>
    </Page>
  );
};

const AuthForm = styled.View`
  margin-top: 108px;
  z-index: 0;
  width: 320px;
`;

const PageHeader = styled.Text`
  /* font-family: "Inter"; */
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #000000;
  margin-bottom: 43px;
  text-align: center;
`;

const TextInput = styled.TextInput`
  height: 44px;
  font-size: 16px;
  background: #d9d9d9;
  border-radius: 12px;
  padding: 13px;
`;

const InputError = styled.Text`
  /* font-family: "Inter"; */
  font-weight: 600;
  font-size: 16px;
  line-height: 31px;
  color: red;
  margin-bottom: 29px;
`;

export default Auth;
