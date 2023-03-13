export const translate = (translation, lang, key) => {
  if (!lang || !translation[lang.code]) {
    return "";
  }

  return translation[lang.code][key];
};
