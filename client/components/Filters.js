import React from 'react'

export default function Filters({
  handleHeatChange,
  handleCountryChange,
  heat,
  country,
  productList
}) {
  console.log('productList', productList)

  const heatLevels = [
    {
      name: 'mild',
      text: '🔥'
    },
    {
      name: 'hot',
      text: '🔥🔥'
    },
    {
      name: 'insane',
      text: '🔥🔥🔥'
    }
  ]

  const countries = productList.reduce((uniqueCountries, product) => {
    if (!uniqueCountries.includes(product.country)) {
      uniqueCountries.push(product.country)
      return uniqueCountries
    } else {
      return uniqueCountries
    }
  }, [])

  return (
    <div className="row" id="filters">
      <div id="heat-filter" className="col s12">
        <span className="filter-cat">
          <strong>HEAT</strong>
        </span>
        <a
          className="waves-effect waves-light btn-small"
          name="all"
          onClick={handleHeatChange}
        >
          All Levels
        </a>
        {heatLevels.map(level => (
          <a
            key={level.name}
            className={
              heat === level.name
                ? 'waves-effect waves-light btn #424242 grey darken-3'
                : 'waves-effect waves-light btn #f5f5f5 grey lighten-4'
            }
            name={level.name}
            onClick={handleHeatChange}
          >
            {level.text}
          </a>
        ))}
      </div>
      <div id="country-filter" className="col s6">
        <span className="filter-cat">
          <strong>ORIGIN</strong>
        </span>
        <select onChange={handleCountryChange} className="browser-default">
          <option selected value="all">
            All Destinations
          </option>
          {countries.map(countryUnique => (
            <option key={countryUnique} value={countryUnique}>
              {countryUnique}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
