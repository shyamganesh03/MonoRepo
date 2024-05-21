const appUtil = {
  capitalizeString: (string) => {
    if (!string) return string
    if (string.includes(' ')) {
      return string
        .split(' ')
        .map((token) => token.charAt(0).toUpperCase() + token.substr(1))
        .join(' ')
    }
    if (string.includes('_')) {
      return string
        .split('_')
        .map((token) => token.charAt(0).toUpperCase() + token.substr(1))
        .join(' ')
    }
    return string.charAt(0).toUpperCase() + string.substr(1)
  },
  parseDetailsFromParams: (item) => {
    if (item && typeof item === 'string') {
      try {
         
        item = JSON.parse(item)
      } catch (err) {
        //
      }
    }
    return item
  },
  prefillArticle: (word) => {
    if (!word || word === '') return ''
    const vowels = 'aeiouAEIOU'
    if (vowels.indexOf(word[0]) !== -1) return 'an '
    return 'a '
  },

  getPlurals: (word) => {
    if (!word || word === '') return ''
    const lastChar = word[word.length - 1]
    console.log(lastChar)
    switch (lastChar) {
      case 's':
        return word
      case 'y':
        return `${word.substring(0, word.length - 1)}ies`
      default:
        return `${word}s`
    }
  },
}

export default appUtil
