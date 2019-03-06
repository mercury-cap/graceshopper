const countries = productList.reduce((uniqueCountries, product) => {
  if (!uniqueCountries.includes(product.country)) {
    return uniqueCountries.push(product.country)
  }
}, [])

console.log('WENDY')
