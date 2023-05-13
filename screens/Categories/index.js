import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { Button, Header, Page, Product } from "../../components";
import { BASE_URL } from "../../constants/endpoint";
import {
  checkIfAnyItemSelected,
  getSections,
  getSorts,
  getTitle,
  handleBackBtnPress,
  handleCategoryPress,
  handleSectionPress,
  handleSend,
} from "./helpers";
import Toast from "react-native-toast-message";
import { translate } from "../../helpers/translation.helper";

const Categories = (props) => {
  const { languages, translation } = props.route.params;
  const [curLang, setCurLang] = React.useState();
  const sorts = getSorts(translation, curLang);
  const [curSection, setCurSection] = useState();
  const [curCategory, setCurCategory] = useState();
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState(sorts[0].value);

  useEffect(() => {
    if (languages.length) {
      setCurLang(languages[0]);
    }
  }, [languages]);

  useEffect(() => {
    (async () => {
      if (curSection) {
        try {
          const response = await axios.get(
            `${BASE_URL}/categories/bySection/${curSection}`
          );
          setCategories(response.data);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: translate(translation, curLang, "serverError"),
            text2: translate(translation, curLang, "contactAdministrator"),
          });
        }
      }
    })();
  }, [curSection]);

  useEffect(() => {
    (async () => {
      if (curCategory) {
        try {
          setProducts([]);
          setLoading(true);
          const response = await axios.get(
            `${BASE_URL}/products/byCategory/${curCategory.id}`
          );
          setProducts(response.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          Toast.show({
            type: "error",
            text1: translate(translation, curLang, "serverError"),
            text2: translate(translation, curLang, "contactAdministrator"),
          });
          setLoading(false);
        }
      }
    })();
    setSelectedSort(sorts[0].value);
  }, [curCategory]);

  useEffect(() => {
    (async () => {
      if (!selectedSort || selectedSort === "CHEAP_FIRST") {
        const sortedProducts = products.sort((a, b) => a.price - b.price);
        await setSortedProducts([]);
        setSortedProducts(sortedProducts);
      }

      if (selectedSort === "EXPENSIVE_FIRST") {
        const sortedProducts = products.sort((a, b) => b.price - a.price);
        await setSortedProducts([]);
        setSortedProducts(sortedProducts);
      }
    })();
  }, [selectedSort, products]);

  return (
    <>
      <Header
        translation={translation}
        languages={languages}
        curLang={curLang}
        setCurLang={setCurLang}
      />
      <Page>
        <PageHeader>
          {!!curSection && (
            <TouchableOpacity
              onPress={handleBackBtnPress(
                curSection,
                curCategory,
                setCurSection,
                setCurCategory
              )}
            >
              <BackBtnImage
                source={require("../../assets/left-arrow.png")}
              ></BackBtnImage>
            </TouchableOpacity>
          )}
          <PageTitle>
            {getTitle(curSection, curCategory, translation, curLang)}
          </PageTitle>
        </PageHeader>
        {!!curCategory && (
          <SortPicker
            selectedValue={selectedSort}
            onValueChange={(itemValue, itemIndex) => setSelectedSort(itemValue)}
          >
            {sorts.map((sort, index) => (
              <Picker.Item
                key={`sort-${index}`}
                label={sort.title}
                value={sort.value}
              />
            ))}
          </SortPicker>
        )}
        {!curSection &&
          getSections(translation, curLang).map(({ title, value }, index) => (
            <CategoryButton
              key={`category-btn-sec-${index}`}
              onPress={handleSectionPress(value, setCurSection)}
            >
              {title}
            </CategoryButton>
          ))}
        {curSection &&
          !curCategory &&
          categories.map((subCategory, index) => (
            <CategoryButton
              key={`caregory-btn-${index}`}
              onPress={handleCategoryPress(subCategory, setCurCategory)}
            >
              {JSON.parse(subCategory.title)[curLang?.code]}
            </CategoryButton>
          ))}
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          !!curCategory &&
          (!!sortedProducts.length ? (
            <ProductGrid>
              {sortedProducts.map((product, index) => (
                <Product
                  key={`product-${index}`}
                  product={product}
                  selected={selected}
                  setSelected={setSelected}
                  translation={translation}
                  curLang={curLang}
                />
              ))}
            </ProductGrid>
          ) : (
            <Text>{translate(translation, curLang, "noProducts")}</Text>
          ))
        )}
      </Page>
      {checkIfAnyItemSelected(selected) && (
        <SendBtn onPress={handleSend(selected, translation, curLang)}>
          {translate(translation, curLang, "send")}
        </SendBtn>
      )}
    </>
  );
};

const PageHeader = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const PageTitle = styled.Text`
  /* font-family: "Inter"; */
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  color: #000000;
  text-align: center;
  max-width: 300px;
`;

const SortPicker = styled(Picker)`
  margin-top: -30px;
`;

const CategoryButton = styled(Button)`
  width: 300px;
  height: 50px;
  margin-bottom: 15px;
`;

const ProductGrid = styled.View`
  max-width: 380px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 15px;
  justify-content: space-between;
`;

const SendBtn = styled(Button)`
  background: #2db53b;
  /* position: fixed; */
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
