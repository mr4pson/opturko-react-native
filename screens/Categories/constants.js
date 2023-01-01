const CATEGORIES = [
  {
    title: "Женщинам",
    value: "WOMEN",
  },
  {
    title: "Мужчинам",
    value: "MEN",
  },
  {
    title: "Детям",
    value: "CHILDREN",
  },
];

const SUB_CATEGORIES = [
  {
    id: 1,
    title: "Пижамы",
  },
  {
    id: 2,
    title: "Туники",
  },
  {
    id: 3,
    title: "Шорты",
  },
];

const PRODUCTS = [
  {
    price: 999,
    number: 2,
    code: 145234,
    numberInPack: 4,
    sizes: "S-XXL",
    image: require("../../assets/product-1.jpg"),
  },
  {
    price: 654,
    number: 1,
    code: 653135,
    numberInPack: 3,
    sizes: "S-XXL",
    image: require("../../assets/product-2.png"),
  },
  {
    price: 999,
    number: 1,
    code: 221123,
    numberInPack: 4,
    sizes: "S-XXL",
    image: require("../../assets/product-1.jpg"),
  },
  {
    price: 999,
    number: 1,
    code: 574545,
    numberInPack: 4,
    sizes: "S-XXL",
    image: require("../../assets/product-2.png"),
  },
];

export { CATEGORIES, SUB_CATEGORIES, PRODUCTS };
