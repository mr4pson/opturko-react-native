import React from "react";
import styled from "styled-components";
import { Button } from "../components";
import { AuthContext } from "../context";

const Header = () => {
  const { signOut } = React.useContext(AuthContext);

  const handleLogoutPress = () => {
    signOut();
  };

  return (
    <HeaderWrapper>
      <Logo source={require("../assets/logo.png")} />
      <Button onPress={handleLogoutPress}>Выйти</Button>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  position: absolute;
  top: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 78px;
  background: #000;
  padding: 0 10px;
  z-index: 100;
`;

const Logo = styled.Image`
  width: 106px;
  height: 47px;
`;

export default Header;
