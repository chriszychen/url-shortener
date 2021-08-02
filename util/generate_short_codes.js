function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function generateShortCodes() {
  // hash code elements
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  // add elements into an array
  const collection = [].concat([...lowerCaseLetters]).concat([...upperCaseLetters]).concat([...numbers])
  // create a 5 digit short codes
  let shortCodes = ''
  for (let i = 1; i <= 5; i++) {
    shortCodes += getRandomItem(collection)
  }
  return shortCodes
}

module.exports = generateShortCodes
