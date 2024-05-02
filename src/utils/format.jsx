export function NumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function FormatCorrect(value) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
