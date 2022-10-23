export const getTitleTickets = (number: number) :string => {
  if ((number % 10) === 1 && number !== 11) {
    return 'билет'
  } else if ((number % 10 < 5) && (number % 10 > 0) && (number !== 12) && (number !== 13) && (number !== 14)) {
    return 'билета'
  } return 'билетов'
}

export const getTitleHours = (number: number) :string => {
  if ((number % 10) === 1 && number !== 11) {
    return 'час'
  } else if ((number % 10 < 5) && (number % 10 > 0) && (number !== 12) && (number !== 13) && (number !== 14)) {
    return 'часа'
  } return 'часов'
}
