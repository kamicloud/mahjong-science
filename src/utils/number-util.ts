import round from 'lodash/round'

export const roundPercent = (number, i) => {
  return round(number * 100, i) + '%'
}
