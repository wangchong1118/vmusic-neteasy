import py from "pinyin";

export function getFirstLetter(str) {
  return py(str.substring(0, 1))[0][0][0].toUpperCase();
}
