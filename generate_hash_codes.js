function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function generateHashCodes() {
  // hash code elements
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  // add elements into an array
  const collection = [].concat([...lowerCaseLetters]).concat([...upperCaseLetters]).concat([...numbers])
  // create a 5 digit hash codes
  let hashCodes = ''
  for (let i = 1; i <= 5; i++) {
    hashCodes += getRandomItem(collection)
  }
  return hashCodes
}

module.exports = generateHashCodes
