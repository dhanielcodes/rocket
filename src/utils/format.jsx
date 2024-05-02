export function NumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function Gsh(n) {
  return (n + "").split(".")[1];
}
export function FormatCorrect(value) {
  return Gsh(value)?.length > 3
    ? value
    : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
