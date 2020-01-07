import py from "pinyin";

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

export function getFirstLetter(str) {
  return py(str.substring(0, 1))[0][0][0].toUpperCase();
}

// export function shuffle(arr) {
//   for (let i = 0; i < arr.length; i++){
//     let j = getRandomInt(0, i)
//     let t = arr[j]
//     arr[i] = arr[j]
//     arr[j] = t
//   }
//   return arr
// }

export function shuffle(arr) {
  var _arr = arr.slice()
  var len = _arr.length;
  for (var i = len - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemIndex = _arr[randomIndex];
    _arr[randomIndex] = _arr[i];
    _arr[i] = itemIndex;
  }
  return _arr
}