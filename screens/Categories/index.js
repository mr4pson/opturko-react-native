import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Button, Header, Page, Product } from "../../components";
import { CATEGORIES, PRODUCTS, SUB_CATEGORIES } from "./constants";
import {
  checkIfAnyItemSelected,
  getTitle,
  handleBackBtnPress,
  handleCategoryPress,
  handleSend,
  handleSubCategoryPress,
} from "./helpers";

const Categories = () => {
  const [curCategory, setCurCategory] = useState();
  const [curSubCategory, setCurSubCategory] = useState();
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Header />
      <Page>
        <PageHeader>
          {!!curCategory && (
            <TouchableOpacity
              onPress={handleBackBtnPress(
                curCategory,
                curSubCategory,
                setCurCategory,
                setCurSubCategory
              )}
            >
              <BackBtnImage
                source={require("../../assets/left-arrow.png")}
              ></BackBtnImage>
            </TouchableOpacity>
          )}
          <PageTitle>{getTitle(curCategory, curSubCategory)}</PageTitle>
        </PageHeader>
        {!curCategory &&
          CATEGORIES.map(({ title, value }) => (
            <CategoryButton
              onPress={handleCategoryPress(value, setCurCategory)}
            >
              {title}
            </CategoryButton>
          ))}
        {curCategory &&
          !curSubCategory &&
          SUB_CATEGORIES.map((subCategory) => (
            <CategoryButton
              onPress={handleSubCategoryPress(subCategory, setCurSubCategory)}
            >
              {subCategory.title}
            </CategoryButton>
          ))}
        {!!curSubCategory && (
          <ProductGrid>
            {PRODUCTS.map((product) => (
              <Product product={product} setSelected={setSelected} />
            ))}
          </ProductGrid>
        )}
      </Page>
      {checkIfAnyItemSelected(selected) && (
        <SendBtn onPress={handleSend(selected)}>Отправить</SendBtn>
      )}
    </>
  );
};

const PageHeader = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 43px;
`;

const PageTitle = styled.Text`
  font-family: "Inter";
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #000000;
  text-align: center;
`;

const CategoryButton = styled(Button)`
  width: 300px;
  height: 50px;
  margin-bottom: 15px;
`;

const ProductGrid = styled.View`
  width: 380px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 35px;
  justify-content: space-between;
`;

const SendBtn = styled(Button)`
  background: #2db53b;
  position: fixed;
  bottom: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  padding: 0;
`;

const BackBtnImage = styled.Image`
  display: flex;
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

export default Categories;
