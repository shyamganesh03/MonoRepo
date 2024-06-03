export const isValidEmail = (value: String) => {
  const emailRegex = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
  if (emailRegex.test(value.toLocaleLowerCase().trim())) {
    return true
  } else {
    return false
  }
}
