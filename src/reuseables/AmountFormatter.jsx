import getSymbolFromCurrency from "currency-symbol-map";
import { FormatCorrect } from "../utils/format";

const AmountFormatter = ({ value, currency }) => {
  return (
    <>
      {getSymbolFromCurrency(currency)}
      {FormatCorrect(value)}
    </>
  );
};

export default AmountFormatter;
