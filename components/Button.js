import React from "react";
import styled from "styled-components/native";

const Button = ({ children, style, onPress }) => {
  return (
    <ButtonWrapper style={style} onPress={onPress}>
      <ButtonTitle style={{ color: "#fff" }}>{children}</ButtonTitle>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity`
  height: 44px;
  font-size: 16px;
  background: #000;
  border-radius: 12px;
  padding: 13px;
`;

const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export default Button;
