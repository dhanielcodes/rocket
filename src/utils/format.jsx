import getSymbolFromCurrency from "currency-symbol-map";

export function NumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function Gsh(n) {
  return (n + "").split(".")[1];
}

export function Gsh2(n) {
  return (n + "").split(".")[0];
}
export function FormatCorrect(value, currency) {
  console.log(Gsh2(4000.7)?.length > 3, "jllllhkdlsll");
  return Gsh(value)?.length > 3
    ? getSymbolFromCurrency(currency) +
        Gsh2(`${value}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "." +
        Gsh(value)
    : getSymbolFromCurrency(currency) +
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function FormatCorrect2(value) {
  console.log(Gsh2(4000.7)?.length > 3, "jllllhkdlsll");
  return Gsh(value)?.length > 3
    ? Gsh2(`${value}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + Gsh(value)
    : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
