import React from "react";
import styled from "styled-components/native";

const Button = ({ children, style, buttonStyle, onPress }) => {
  return (
    <ButtonWrapper style={style} onPress={onPress}>
      <ButtonTitle style={{ color: "#fff", ...buttonStyle }}>
        {children}
      </ButtonTitle>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity`
  height: 44px;
  font-size: 16px;
  background: #000;
  border-radius: 12px;
  padding: 0 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

export default Button;
