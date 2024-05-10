import { FormatCorrect, FormatCorrect2 } from "../utils/format";

const AmountFormatter = ({ value, currency }) => {
  return currency ? FormatCorrect(value, currency) : FormatCorrect2(value);
};

export default AmountFormatter;
