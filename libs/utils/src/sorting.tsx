export const sort = (data, field) => {
  return data?.sort((a, b) => {
    return new Date(b?.[field]) - new Date(a?.[field])
  })
}
