import { SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components/native";
import FocusedStatusBar from "./FocusedStatusBar";

const Page = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageWrapper>
        <ScrollView contentContainerStyle={{}}>{children}</ScrollView>
      </PageWrapper>
      <FocusedStatusBar background={"#ccc"} />
      <PageBackgroundWrapper>
        <PageBackgroundContent />
      </PageBackgroundWrapper>
    </SafeAreaView>
  );
};

const PageWrapper = styled.View`
  padding-top: 83px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PageBackgroundWrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const PageBackgroundContent = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

export default Page;
