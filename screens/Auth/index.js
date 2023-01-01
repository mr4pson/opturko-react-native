import React from "react";
import { Page, Button } from "../../components";
import styled from "styled-components/native";
import { AuthContext } from "../../context";
import { handleBtnClick } from "./helpers";

const Auth = () => {
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

  return (
    <Page>
      <AuthForm>
        <PageHeader>Авторизация</PageHeader>
        <TextInput
          placeholder="Логин"
          value={username}
          onChangeText={setUsername}
          req
        />
        <InputError>{usernameError}</InputError>
        <TextInput
          placeholder="Пароль"
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
            signIn
          )}
        >
          Войти
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
  font-family: "Inter";
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
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  line-height: 31px;
  color: red;
  margin-bottom: 29px;
`;

export default Auth;
