import { memo } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import Button from "./Button";
import { translate } from "../helpers/translation.helper";

const Counter = ({ value, setValue, translation, curLang }) => {
  const handleReduce = () => {
    setValue((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <CounterWrapper>
      <ActionButton onPress={handleReduce}>-</ActionButton>
      <CounterBody>
        <Text>
          {value} {translate(translation, curLang, "package")}
        </Text>
      </CounterBody>
      <ActionButton onPress={handleIncrease}>+</ActionButton>
    </CounterWrapper>
  );
};

const CounterWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 12px;
`;

const CounterBody = styled.View`
  width: 65px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d9d9d9;
  font-size: 16px;
  border-radius: 12px;
`;

const ActionButton = styled(Button)`
  height: 40px;
  width: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default memo(Counter);
