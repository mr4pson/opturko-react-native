import { Linking } from "react-native";

const handleCategoryPress = (category, setCurCategory) => () => {
  setCurCategory(category);
};

const handleSubCategoryPress = (subCategory, setCurSubCategory) => () => {
  setCurSubCategory(subCategory);
};

const getTitle = (category, subCategory) => {
  if (subCategory) {
    return subCategory.title;
  }

  switch (category) {
    case "WOMEN":
      return "Женщинам";

    case "MEN":
      return "Мужчинам";

    case "CHILDREN":
      return "Детям";

    default:
      return "Категории";
  }
};

const handleBackBtnPress =
  (curCategory, curSubCategory, setCurCategory, setCurSubCategory) => () => {
    if (curSubCategory) {
      setCurSubCategory();

      return;
    }
    if (curCategory) {
      setCurCategory();

      return;
    }
  };

const checkIfAnyItemSelected = (products) => {
  return products.reduce((accum, product) => {
    return accum || !!product.count;
  }, false);
};

const handleSend = (products) => () => {
  const phone = "+79254494211";
  const message = products
    .filter((product) => product.count > 0)
    .reduce((accum, product) => {
      const newChunck = `${product.code} - ${product.count} шт.`;

      if (accum) {
        return `${accum}, ${newChunck}`;
      }

      return newChunck;
    }, "");

  Linking.openURL(`whatsapp://send?text=${message}&phone=${phone}`);
};

export {
  handleCategoryPress,
  handleSubCategoryPress,
  getTitle,
  handleBackBtnPress,
  checkIfAnyItemSelected,
  handleSend,
};
