import { Linking } from "react-native";
import { translate } from "../../helpers/translation.helper";

const handleSectionPress = (section, setCurSection) => () => {
  setCurSection(section);
};

const handleCategoryPress = (category, setCurCategory) => () => {
  setCurCategory(category);
};

const getSections = (translation, curLang) => {
  return [
    {
      title: translate(translation, curLang, "women"),
      value: "WOMEN",
    },
    {
      title: translate(translation, curLang, "men"),
      value: "MEN",
    },
    {
      title: translate(translation, curLang, "children"),
      value: "CHILDREN",
    },
  ];
};

const getTitle = (section, category, translation, lang) => {
  if (category && lang) {
    const title = JSON.parse(category.title);

    return title[lang?.code];
  }

  switch (section) {
    case "WOMEN":
      return translate(translation, lang, "women");

    case "MEN":
      return translate(translation, lang, "men");

    case "CHILDREN":
      return translate(translation, lang, "children");

    default:
      return translate(translation, lang, "categories");
  }
};

const handleBackBtnPress =
  (curSection, curCategory, setCurSection, setCurCategory) => () => {
    if (curCategory) {
      setCurCategory();

      return;
    }
    if (curSection) {
      setCurSection();

      return;
    }
  };

const checkIfAnyItemSelected = (products) => {
  return products.reduce((accum, product) => {
    return accum || !!product.count;
  }, false);
};

const handleSend = (products, translation, curLang) => () => {
  const phone = "+905326819979";
  const message = products
    .filter((product) => product.count > 0)
    .reduce((accum, product) => {
      const newChunck = `${product.code} - ${product.count} ${translate(
        translation,
        curLang,
        "productNumber"
      )} x $${product.price} = $${product.price * product.count}`;

      if (accum) {
        return `${accum}, ${newChunck}`;
      }

      return newChunck;
    }, "");

  Linking.openURL(`whatsapp://send?text=${message}&phone=${phone}`);
};

export {
  handleSectionPress,
  handleCategoryPress,
  getTitle,
  handleBackBtnPress,
  checkIfAnyItemSelected,
  handleSend,
  getSections,
};
