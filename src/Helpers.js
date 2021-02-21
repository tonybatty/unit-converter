export function titleCase(camelCase) {
  return camelCase
    // insert spaces between uppercase letters
    .replace(/([A-Z])/g, ' $1')
    // uppercase first character
    .replace(/^./, function (str) { return str.toUpperCase() })
}