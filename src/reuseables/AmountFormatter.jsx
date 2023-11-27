import React from 'react';
import { FormattedNumber } from 'react-intl';

const AmountFormatter = ({ value, currency }) => {
  return (
    <FormattedNumber
      value={value}
      style="currency"
     currency={currency && currency}
      minimumFractionDigits={2}
      
    />
  );
};

export default AmountFormatter;
