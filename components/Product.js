import { memo, useEffect, useState } from "react";
import styled from "styled-components/native";
import { BASE_URL } from "../constants/endpoint";
import { translate } from "../helpers/translation.helper";
import Button from "./Button";
import Counter from "./Counter";

const Product = ({ product, setSelected, selected, curLang, translation }) => {
  const curProduct = selected.find(
    (selectedItem) => selectedItem.id === product.id && selectedItem.count > 0
  );
  const { price, code, numberInPack, sizes, image } = product;
  const [count, setCount] = useState(curProduct?.count ?? 0);
  const url = `${BASE_URL}/attachments/${image}`;

  const handleBuyPress = (setCount) => () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (curProduct?.count !== count) {
      setSelected((prev) => {
        const products = [...prev];
        const curProduct = prev?.find(
          (curProduct) => curProduct.id == product.id
        );

        if (!curProduct) {
          products.push({
            ...product,
            count,
          });
        } else {
          curProduct.count = count;
        }

        return products;
      });
    }
  }, [count]);

  useEffect(() => {
    if (curProduct) {
      setCount(curProduct.count);
    }
  }, [selected, product]);

  return (
    <ProductWrapper>
      <ProductImage source={{ uri: `${BASE_URL}/attachments/${image}` }} />
      <ProductInfo>
        ${price}
        {!!count &&
          ` / ${count} ${translate(translation, curLang, "productNumber")}($${price * count
          })`}
        . {translate(translation, curLang, "code")} {code}
      </ProductInfo>
      <ProductInfo style={{ color: "#949494" }}>
        {numberInPack} {translate(translation, curLang, "productNumber")}{" "}
        {translate(translation, curLang, "inPackage")} {sizes}
      </ProductInfo>
      {!count ? (
        <BuyBtn onPress={handleBuyPress(setCount)}>
          {translate(translation, curLang, "addToCart")}
        </BuyBtn>
      ) : (
        <Counter
          value={count}
          setValue={setCount}
          translation={translation}
          curLang={curLang}
        />
      )}
    </ProductWrapper>
  );
};

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: column;
  max-width: 170px;
  width: 100%;
  margin-bottom: 15px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: 12px;
  background: #ccc;
  margin-bottom: 12px;
`;

const ProductInfo = styled.Text`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000;
`;

const BuyBtn = styled(Button)`
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  margin: 12px auto 0;
`;

export default memo(Product);
