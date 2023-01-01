import { memo, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Button, Counter } from "./";

const Product = ({ product, setSelected }) => {
  const { price, number, code, numberInPack, sizes, image } = product;
  const [count, setCount] = useState(0);

  const handleBuyPress = (setCount) => () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (product.count !== count) {
      setSelected((prev) => {
        const products = [...prev];
        const curProduct = prev.find(
          (curProduct) => curProduct.code === product.code
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

  return (
    <ProductWrapper>
      <ProductImage source={image} />
      <ProductInfo>
        {price} / {number} шт. Код: {code}
      </ProductInfo>
      <ProductInfo style={{ color: "#949494" }}>
        {numberInPack} шт. в упк. {sizes}
      </ProductInfo>
      {!count ? (
        <BuyBtn onPress={handleBuyPress(setCount)}>В корзину</BuyBtn>
      ) : (
        <Counter value={count} setValue={setCount} />
      )}
    </ProductWrapper>
  );
};

const ProductWrapper = styled.View`
  display: flex;
  flex-direction: column;
  max-width: 180px;
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
