import React from "react";
import styled from "styled-components/native";
import Button from "./Button";

const LangSwitch = ({ style, languages, curLang, setCurLang }) => {
  const onLangChange = (lang) => () => {
    setCurLang(lang);
  };

  return (
    <LangSwitchWrapper style={style}>
      {languages.map((lang, index) => (
        <Button
          key={`lang-${index}`}
          style={{
            backgroundColor:
              lang.code === curLang?.code ? "#000" : "transparent",
          }}
          buttonStyle={{
            color: lang.code === curLang?.code ? "#fff" : "#000",
          }}
          onPress={onLangChange(lang)}
        >
          {lang.code}
        </Button>
      ))}
    </LangSwitchWrapper>
  );
};

const LangSwitchWrapper = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: -100px;
  right: 0;
`;

export default LangSwitch;
